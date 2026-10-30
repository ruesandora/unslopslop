import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { RULES } from './rules.mjs';
import { makeHelpers } from './helpers.mjs';
import { score, verdict, rulePoints } from './score.mjs';

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
function pageScript(rules, vp) {
  const defs = rules.map((r) => `{id:${JSON.stringify(r.id)},check:${r.check.toString()}}`).join(',');
  return `(() => {
    const h = (${makeHelpers.toString()})(${JSON.stringify(vp)});
    const out = {};
    for (const r of [${defs}]) {
      try { out[r.id] = r.check(h); } catch (e) { out[r.id] = { error: String(e && e.message || e) }; }
    }
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
export async function analyze(browser, target, { disable = [], only = null, fast = false, screenshotDir = null } = {}) {
  const url = toUrl(target);
  const off = disabledSet(disable);
  const rules = RULES.filter((r) => !off.has(r.id) && (!only || only.includes(r.id)));
  const merged = new Map();
  const errors = [];
  let css = '';
  const shots = {};

  for (const [name, vp] of Object.entries(PASSES_VP)) {
    const needed = (screenshotDir && name !== 'reduced') || rules.some((r) => (r.scope === 'page' && r.viewports.includes(name)) || (name === 'desktop' && r.scope === 'css'));
    if (!needed) continue;
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, reducedMotion: vp.reducedMotion || 'no-preference', deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 20000 });
      await settle(page, fast);
      if (name === 'desktop') css = await collectCss(page, url);
      const pageRules = rules.filter((r) => r.scope === 'page' && r.viewports.includes(name));
      const res = await page.evaluate(pageScript(pageRules, vp));
      for (const r of pageRules) {
        const v = res[r.id];
        if (v && v.error) { errors.push(`${r.id}: ${v.error}`); continue; }
        record(merged, r, v || [], name);
      }
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
  const points = score(findings);
  return { target, score: points, verdict: verdict(points, findings), findings, errors, screenshots: shots };
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
