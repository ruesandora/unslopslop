#!/usr/bin/env node
// Side-by-side before/after PNG.
//   node compare.mjs <before> <after> --out compare.png [--viewport desktop|mobile] [--max-height 4000] [--wait ms]
// --wait: ms to wait after load (let a one-shot demo reach its final frame). Consent banners are hidden.
// <before>/<after> are HTML files or URLs. Both are rendered at the same size (desktop 1440, mobile 390).
import { resolve } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { launch, hideConsent } from './lib/browser.mjs';
import { toUrl, VIEWPORTS } from './lib/analyze.mjs';

const args = process.argv.slice(2);
const o = { out: 'compare.png', viewport: 'desktop', maxHeight: 4000, wait: 800, labels: ['Before', 'After'] };
const pos = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--out') o.out = args[++i];
  else if (args[i] === '--viewport') o.viewport = args[++i];
  else if (args[i] === '--max-height') o.maxHeight = +args[++i];
  else if (args[i] === '--wait') o.wait = +args[++i];
  else if (args[i] === '--labels') o.labels = args[++i].split(',').map((x) => x.trim());
  else pos.push(args[i]);
}
if (pos.length !== 2 || !VIEWPORTS[o.viewport]) {
  console.error('Usage: node compare.mjs <before> <after> --out compare.png [--viewport desktop|mobile] [--max-height 4000] [--wait ms] [--labels "Before,After"]');
  process.exit(2);
}
const vp = VIEWPORTS[o.viewport];
const browser = await launch();
async function shoot(target) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
  const page = await ctx.newPage();
  await page.goto(toUrl(target), { waitUntil: 'load', timeout: 20000 });
  await hideConsent(page);
  await page.waitForTimeout(o.wait);
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  // full page, cut at --max-height (a clip beyond the viewport needs fullPage: true)
  const buf = await page.screenshot({ fullPage: true, ...(h > o.maxHeight ? { clip: { x: 0, y: 0, width: vp.w, height: o.maxHeight } } : {}) });
  await ctx.close();
  return buf.toString('base64');
}
const [a, b] = [await shoot(pos[0]), await shoot(pos[1])];
const out = resolve(o.out);
await mkdir(dirname(out), { recursive: true });
const ctx = await browser.newContext({ viewport: { width: vp.w * 2 + 72, height: 600 } });
const page = await ctx.newPage();
const esc = (t) => t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const col = (label, data) => `<figure><figcaption>${label}</figcaption><img src="data:image/png;base64,${data}" width="${vp.w}"></figure>`;
await page.setContent(`<!doctype html><style>body{margin:0;padding:24px;background:#d9d9d9;font:600 22px system-ui;display:flex;gap:24px;align-items:flex-start}
figure{margin:0}figcaption{padding:0 0 12px;color:#222}img{display:block;box-shadow:0 0 0 1px #999;background:#fff}</style>${col(esc(o.labels[0] || 'Before'), a)}${col(esc(o.labels[1] || 'After'), b)}`);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log(out);
