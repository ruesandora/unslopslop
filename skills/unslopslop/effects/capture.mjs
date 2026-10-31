#!/usr/bin/env node
// Renders each effect demo and writes effects/<name>/screenshot.jpg (960 x 640, controls hidden).
// With --ui <dir> it also saves the full demo page at 1440 and 390 wide for review.
// Fails (exit 1) when a shader does not compile or the page logs an error.
// Usage: node effects/capture.mjs [name ...] [--ui <dir>]
import { readdirSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadChromium } from '../scripts/lib/browser.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const uiAt = args.indexOf('--ui');
const uiDir = uiAt >= 0 ? args[uiAt + 1] : null;
const names = args.filter((a, i) => !a.startsWith('--') && (uiAt < 0 || i !== uiAt + 1));
const all = readdirSync(root).filter((n) => !n.startsWith('_') && statSync(join(root, n)).isDirectory() && existsSync(join(root, n, 'demo.html')));
const list = names.length ? all.filter((n) => names.includes(n)) : all;

const chromium = await loadChromium();
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
let bad = 0;
for (const name of list) {
  const url = pathToFileURL(join(root, name, 'demo.html')).href;
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 960, height: 640 } });
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(url + '?shot=1');
  await page.waitForFunction(() => window.__fxReady === true, null, { timeout: 15000 }).catch(() => errors.push('never ready'));
  await page.waitForTimeout(400);
  const glErr = await page.evaluate(() => window.__fxError || null);
  if (glErr) errors.push(glErr.split('\n')[0]);
  await page.screenshot({ path: join(root, name, 'screenshot.jpg'), type: 'jpeg', quality: 88 });
  await page.close();
  if (uiDir) {
    mkdirSync(uiDir, { recursive: true });
    for (const [w, h] of [[1440, 900], [390, 844]]) {
      const p = await browser.newPage({ viewport: { width: w, height: h } });
      await p.goto(url);
      await p.waitForFunction(() => window.__fxReady === true, null, { timeout: 15000 }).catch(() => {});
      await p.waitForTimeout(300);
      await p.screenshot({ path: join(uiDir, `${name}-${w}.png`), fullPage: w < 500 });
      await p.close();
    }
  }
  console.log(`${errors.length ? 'FAIL' : 'ok  '} ${name}${errors.length ? '  ' + errors.join(' | ').slice(0, 300) : ''}`);
  if (errors.length) bad++;
}
await browser.close();
process.exit(bad ? 1 : 0);
