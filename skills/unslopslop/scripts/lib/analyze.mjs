import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { RULES } from './rules.mjs';
import { hideConsent } from './browser.mjs';
import { makeHelpers } from './helpers.mjs';
import { score, verdict, rulePoints } from './score.mjs';
import { BLAND } from './rules-bland.mjs';
import { craftProbe, craftScore, MOTION_INIT } from './craft.mjs';
import { tasteProbe, tasteScore, tasteDisabled, ownerSlop, pixelProbe, TELLS } from './taste.mjs';

export const VIEWPORTS = { desktop: { w: 1440, h: 900 }, mobile: { w: 390, h: 844 } };
// Extra pass: desktop size with the reduced-motion preference on (screenshots are never taken here).
const PASSES_VP = { ...VIEWPORTS, reduced: { w: 1440, h: 900, reducedMotion: 'reduce' } };

export function toUrl(target) {
  if (/^https?:\/\//.test(target) || target.startsWith('file://')) return target;
  const p = resolve(target);
  if (!existsSync(p)) throw new Error(`File not found: ${p}`);
  return pathToFileURL(p).href;
}

export function disabledSet(extra = []) {
  const env = (process.env.UNSLOP_DISABLE || '').split(',').map((s) => s.trim()).filter(Boolean);
  return new Set([...env, ...extra]);
}

// Build the in-page script as one expression string (works even under a page CSP).
function pageScript(rules, vp, withCraft = false) {
  const defs = rules.map((r) => `{id:${JSON.stringify(r.id)},check:${r.check.toString()}}`).join(',');
  return `(() => {
    const h = (${makeHelpers.toString()})(${JSON.stringify(vp)});
    const out = {};
    for (const r of [${defs}]) {
      try { out[r.id] = r.check(h); } catch (e) { out[r.id] = { error: String(e && e.message || e) }; }
    }
    if (${withCraft}) { try { out.__taste = (${tasteProbe.toString()})(h, ${JSON.stringify([...tasteDisabled()])}); } catch (e) { out.__taste = { error: String(e && e.message || e) }; } try { out.__craft = (${craftProbe.toString()})(h); } catch (e) { out.__craft = { error: String(e && e.message || e) }; } }
    return out;
  })()`;
}

async function settle(page, fast) {
  if (fast) { await page.waitForTimeout(60); return; }
  await page.waitForTimeout(700);
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 600) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(60);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
}

async function collectCss(page, url) {
  const parts = await page.evaluate(() => {
    const inline = [...document.querySelectorAll('style')].map((s) => s.textContent || '');
    const links = [...document.querySelectorAll('link[rel~=stylesheet]')].map((l) => l.href);
    return { inline, links };
  });
  let css = parts.inline.join('\n');
  for (const href of parts.links) {
    try {
      if (href.startsWith('file://')) css += '\n' + (await readFile(fileURLToPath(href), 'utf8'));
      else css += '\n' + (await (await fetch(href)).text());
    } catch {}
  }
  return css;
}

/**
 * Render `target` at 1440 and 390 and run every enabled rule.
 * Returns {target, score, verdict, findings, errors, screenshots?}.
 */
export async function analyze(browser, target, { disable = [], only = null, fast = false, screenshotDir = null, craft = !only, keepConsent = false, compared = false } = {}) {
  const url = toUrl(target);
  const off = disabledSet(disable);
  const pick = (r) => !off.has(r.id) && (!only || only.includes(r.id));
  const slopRules = RULES.filter(pick);
  const blandRules = BLAND.filter(pick);
  const rules = [...slopRules, ...blandRules];
  const blandIds = new Set(blandRules.map((r) => r.id));
  const merged = new Map();
  const blandMerged = new Map();
  let signals = null, tasteSignals = null;
  const errors = [];
  let css = '';
  const shots = {};

  for (const [name, vp] of Object.entries(PASSES_VP)) {
    const needed = (screenshotDir && name !== 'reduced') || (craft && name === 'desktop') || rules.some((r) => (r.scope === 'page' && r.viewports.includes(name)) || (name === 'desktop' && r.scope === 'css'));
    if (!needed) continue;
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, reducedMotion: vp.reducedMotion || 'no-preference', deviceScaleFactor: 1 });
    await ctx.addInitScript(MOTION_INIT);
    const page = await ctx.newPage();
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 20000 });
      if (!keepConsent) await hideConsent(page);
      await settle(page, fast);
      if (name === 'desktop') css = await collectCss(page, url);
      const pageRules = rules.filter((r) => r.scope === 'page' && r.viewports.includes(name));
      const res = await page.evaluate(pageScript(pageRules, vp, craft && name === 'desktop'));
      for (const r of pageRules) {
        const v = res[r.id];
        if (v && v.error) { errors.push(`${r.id}: ${v.error}`); continue; }
        record(blandIds.has(r.id) ? blandMerged : merged, r, v || [], name);
      }
      if (res.__taste) {
        if (res.__taste.error) errors.push(`taste: ${res.__taste.error}`);
        else {
          tasteSignals = res.__taste;
          try { Object.assign(tasteSignals, await page.evaluate(`(${pixelProbe.toString()})(${JSON.stringify((await page.screenshot()).toString('base64'))}, ${JSON.stringify(tasteSignals.subjectRect)}, ${vp.w}, ${vp.h})`)); } catch (e) { errors.push(`taste pixels: ${e.message}`); }
        }
      }
      if (res.__craft) { if (res.__craft.error) errors.push(`craft: ${res.__craft.error}`); else signals = res.__craft; }
      if (screenshotDir && name !== 'reduced') {
        const file = `${screenshotDir}/${name}.png`;
        await page.screenshot({ path: file, fullPage: true });
        shots[name] = file;
      }
    } finally {
      await ctx.close();
    }
  }
  for (const r of rules.filter((r) => r.scope === 'css')) {
    let v = [];
    try { v = r.check(css, ''); } catch (e) { errors.push(`${r.id}: ${e.message}`); }
    record(merged, r, v, 'desktop');
  }
  const findings = [...merged.values()].map((f) => ({ ...f, points: +rulePoints(f.severity, f.count).toFixed(1) })).sort((a, b) => b.points - a.points);
  const patternScore = score(findings);
  const bland = [...blandMerged.values()].map((f) => ({ ...f, points: 0 }));
  const craftRes = signals ? { ...craftScore(signals, css), signals, findings: bland } : { score: null, pass: null, components: {}, findings: bland };
  const taste = signals && tasteSignals ? tasteScore(tasteSignals, craftRes.score, { compared }) : null;
  // Owner reading: pattern slop and "not proven good" both count. Without craft data it stays the pattern score.
  const tells = findings.filter((f) => TELLS.has(f.rule)).reduce((a, f) => a + f.points, 0);
  const points = taste ? ownerSlop(tells, taste.proof) : patternScore;
  const v = verdict(points, findings, taste ? 20 : 10);
  let overall = null;
  if (craftRes.score !== null) {
    const earned = v !== 'heavy' && craftRes.pass && (!taste || taste.pass);
    overall = !earned ? 'fail' : taste && !taste.compared ? 'unproven' : 'pass';
  }
  return { target, score: points, patternScore, tells: Math.round(tells), verdict: v, findings, errors, screenshots: shots, craft: craftRes, taste, overall };
}

function record(map, rule, hits, vpName) {
  if (!hits.length) return;
  const prev = map.get(rule.id);
  const entry = prev || {
    rule: rule.id, pass: rule.pass, severity: rule.severity, title: rule.title, why: rule.why, fix: rule.fix,
    count: 0, viewports: [], examples: [],
  };
  entry.count = Math.max(entry.count, hits.length);
  entry.viewports.push(vpName);
  for (const e of hits.slice(0, 4)) if (entry.examples.length < 4) entry.examples.push({ ...e, viewport: vpName });
  map.set(rule.id, entry);
}
