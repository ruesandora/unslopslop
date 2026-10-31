#!/usr/bin/env node
// Screenshots the type library. Needs network for Google Fonts (without it the shots show fallbacks).
//   type/<id>/screenshot.jpg   first screen at 1440 x 900 (used by the gallery)
//   --review <dir>             also <dir>/<id>-390.jpg (390 x 844) and gallery shots at 1440 and 390
// Fails (exit 1) when a page logs an error or a recipe font did not load.
// Usage: node type/capture.mjs [id ...] [--review <dir>] [--gallery]
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadChromium } from '../scripts/lib/browser.mjs';
import { loadRecipes } from './build.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const at = args.indexOf('--review');
const review = at >= 0 ? args[at + 1] : null;
const ids = args.filter((a, i) => !a.startsWith('--') && (at < 0 || i !== at + 1));
const recipes = (await loadRecipes()).filter((r) => !ids.length || ids.includes(r.id));
if (review) mkdirSync(review, { recursive: true });

const browser = await (await loadChromium()).launch();
let bad = 0;
async function shot(url, w, h, path, check, full = false) {
  const p = await browser.newPage({ viewport: { width: w, height: h } });
  const errors = [];
  p.on('pageerror', (e) => errors.push(String(e)));
  p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(2600); // one-shot motion settles
  if (check) {
    const missing = await p.evaluate((fams) => fams.filter((f) => !document.fonts.check(`16px "${f}"`) || ![...document.fonts].some((x) => x.family.replace(/"/g, '') === f && x.status === 'loaded')), check);
    if (missing.length) errors.push('fonts not loaded: ' + missing.join(', '));
  }
  await p.screenshot({ path, type: 'jpeg', quality: 82, fullPage: full });
  await p.close();
  return errors;
}
for (const r of recipes) {
  const url = pathToFileURL(join(root, r.id, 'specimen.html')).href;
  const fams = [...new Set(['display', 'text', 'mono', 'accent'].map((k) => r.fonts[k]?.family).filter(Boolean))];
  const errs = await shot(url, 1440, 900, join(root, r.id, 'screenshot.jpg'), fams);
  if (review) errs.push(...await shot(url, 390, 844, join(review, `${r.id}-390.jpg`)));
  if (errs.length) { bad++; console.error(`${r.id}: ${errs.join(' | ')}`); } else console.log(`ok ${r.id}`);
}
if (args.includes('--gallery') && review) {
  const url = pathToFileURL(join(root, 'index.html')).href;
  await shot(url, 1440, 900, join(root, 'gallery-1440.jpg'));
  await shot(url, 390, 844, join(root, 'gallery-390.jpg'));
  await shot(url, 1440, 900, join(review, 'gallery-full-1440.jpg'), null, true);
}
await browser.close();
process.exit(bad ? 1 : 0);
