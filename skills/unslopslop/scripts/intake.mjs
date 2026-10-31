#!/usr/bin/env node
// Capture one reference into the inspiration library: a small study thumbnail, the palette by area,
// the fonts in use, and declared motion timings. Observations only; no assets are copied.
//
//   node intake.mjs <url|file> --tags "domain:web, style:editorial-serif, mood:calm" [--why "..."] [--learn "..."]
//                   [--licence "unknown"] [--root inspiration] [--no-shot] [--date YYYY-MM-DD]
//
// Writes <root>/<date>-<slug>/notes.md (+ thumb.jpg unless --no-shot) and appends a row to <root>/catalog.md.
import { mkdir, writeFile, readFile, appendFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { launch, hideConsent } from './lib/browser.mjs';
import { toUrl } from './lib/analyze.mjs';

const args = process.argv.slice(2);
const o = { tags: '', why: '', learn: '', licence: 'unknown (study thumbnail only, not for reuse)', root: 'inspiration', shot: true, date: new Date().toISOString().slice(0, 10) };
let target = null;
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--tags') o.tags = args[++i];
  else if (a === '--why') o.why = args[++i];
  else if (a === '--learn') o.learn = args[++i];
  else if (a === '--licence' || a === '--license') o.licence = args[++i];
  else if (a === '--root') o.root = args[++i];
  else if (a === '--no-shot') o.shot = false;
  else if (a === '--date') o.date = args[++i];
  else target = a;
}
if (!target) { console.error('Usage: node intake.mjs <url|file> --tags "domain:web, style:..., mood:..." [--why ...] [--learn ...] [--no-shot]'); process.exit(2); }

export const slugOf = (u) => u.replace(/^[a-z]+:\/\//, '').replace(/[?#].*$/, '').replace(/\/index\.html?$/, '').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase().slice(-48) || 'ref';

const url = toUrl(target);
const browser = await launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
let data;
try {
  await page.goto(url, { waitUntil: 'load', timeout: 30000 });
  await hideConsent(page);
  await page.waitForTimeout(1500);
  data = await page.evaluate(() => {
    const px = (v) => parseFloat(v) || 0;
    const area = new Map();
    const els = [document.body, ...document.body.querySelectorAll('*')];
    for (const e of els) {
      const r = e.getBoundingClientRect();
      if (!r.width || !r.height || r.top > innerHeight) continue;
      const s = getComputedStyle(e);
      if (s.visibility === 'hidden' || s.display === 'none') continue;
      const a = Math.min(r.width, innerWidth) * Math.min(r.height, innerHeight);
      const add = (c, w) => { if (!c || /rgba\(.*,\s*0\)$/.test(c) || c === 'transparent') return; area.set(c, (area.get(c) || 0) + w); };
      add(s.backgroundColor, a);
      if ([...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) add(s.color, px(s.fontSize) * (e.textContent || '').trim().length * 8);
    }
    const total = [...area.values()].reduce((x, y) => x + y, 0) || 1;
    const palette = [...area].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([c, w]) => ({ color: c, share: +(w / total * 100).toFixed(1) }));
    const style = (sel) => { const e = document.querySelector(sel); if (!e) return null; const s = getComputedStyle(e); return { family: s.fontFamily, size: s.fontSize, weight: s.fontWeight, tracking: s.letterSpacing }; };
    const loaded = [...new Set([...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replace(/["']/g, '')))];
    const motion = new Map();
    for (const e of els) {
      const s = getComputedStyle(e);
      const durs = s.transitionDuration.split(',').map((d) => px(d) * (d.includes('ms') ? 1 : 1000));
      if (durs.some((d) => d > 0)) { const k = `transition ${Math.max(...durs)}ms ${s.transitionTimingFunction.split(/,(?![^(]*\))/)[0].trim()}`; motion.set(k, (motion.get(k) || 0) + 1); }
      if (s.animationName !== 'none') { const k = `animation ${s.animationName} ${s.animationDuration} ${s.animationTimingFunction} x${s.animationIterationCount}`; motion.set(k, (motion.get(k) || 0) + 1); }
    }
    return { title: document.title, h1: style('h1'), body: style('p') || style('body'), loaded, palette, motion: [...motion].sort((a, b) => b[1] - a[1]).slice(0, 10) };
  });
  const dir = resolve(o.root, `${o.date}-${slugOf(url)}`);
  await mkdir(dir, { recursive: true });
  if (o.shot) await page.screenshot({ path: join(dir, 'thumb.jpg'), type: 'jpeg', quality: 60, clip: { x: 0, y: 0, width: 1440, height: 900 }, scale: 'css' }).then(async () => {
    // keep it a study thumbnail: re-render at 480 px wide
    const thumb = await ctx.newPage();
    const b64 = (await readFile(join(dir, 'thumb.jpg'))).toString('base64');
    await thumb.setViewportSize({ width: 480, height: 300 });
    await thumb.setContent(`<body style="margin:0"><img src="data:image/jpeg;base64,${b64}" width="480" height="300">`);
    await thumb.screenshot({ path: join(dir, 'thumb.jpg'), type: 'jpeg', quality: 60 });
    await thumb.close();
  });
  const tags = o.tags.split(',').map((t) => t.trim()).filter(Boolean);
  const L = [
    `# ${data.title || slugOf(url)}`, '',
    `- Link: ${/^https?:/.test(url) ? url : '(local file)'}`,
    `- Captured: ${o.date}, 1440 x 900, first screen`,
    `- Tags: ${tags.map((t) => '`' + t + '`').join(' ') || '(add domain:, style:, mood:, palette:, motion:)'}`,
    `- Licence: ${o.licence}`,
    o.shot ? '- Thumbnail: `thumb.jpg`, 480 px, kept for study only; do not reuse it in any design.' : '- Thumbnail: none (link only).',
    '', '## Why it is good', '', o.why || '(write one or two sentences)', '',
    '## What to learn', '', o.learn || '(the technique to take: timing, proportion, a structure; never the look itself)', '',
    '## Measured', '',
    `- Headline: ${data.h1 ? `${data.h1.family.split(',')[0]} ${data.h1.weight}, ${data.h1.size}, tracking ${data.h1.tracking}` : 'no h1'}`,
    `- Body: ${data.body ? `${data.body.family.split(',')[0]} ${data.body.weight}, ${data.body.size}` : 'n/a'}`,
    `- Web fonts loaded: ${data.loaded.join(', ') || 'none'}`,
    '- Palette by area (first screen):',
    ...data.palette.map((p) => `  - ${p.color}: ${p.share}%`),
    '- Motion declared:',
    ...(data.motion.length ? data.motion.map(([k, n]) => `  - ${k} (${n} elements)`) : ['  - none']),
    '',
  ];
  await writeFile(join(dir, 'notes.md'), L.join('\n'));
  const cat = resolve(o.root, 'catalog.md');
  if (!existsSync(cat)) await writeFile(cat, '# Inspiration catalogue\n\n| Date | Reference | Tags | Notes |\n|---|---|---|---|\n');
  await appendFile(cat, `| ${o.date} | ${(data.title || slugOf(url)).replace(/\|/g, '/')} | ${tags.join(', ')} | [notes](${o.date}-${slugOf(url)}/notes.md) |\n`);
  console.log(join(dir, 'notes.md'));
} finally {
  await browser.close();
}
