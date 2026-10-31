#!/usr/bin/env node
// Renders each recipes/<name>/demo.html and writes recipes/<name>/screenshot.jpg (960 x 640, controls hidden).
// With --ui <dir> it also saves the demo page at 1440 and 390 wide for review. Fails on page errors.
// Usage: node recipes/capture.mjs [name ...] [--ui <dir>]
import { readdirSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadChromium } from '../scripts/lib/browser.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const uiAt = args.indexOf('--ui');
const uiDir = uiAt >= 0 ? args[uiAt + 1] : null;
const wanted = args.filter((a, i) => !a.startsWith('--') && (uiAt < 0 || i !== uiAt + 1));
const all = readdirSync(root).filter((n) => statSync(join(root, n)).isDirectory() && existsSync(join(root, n, 'demo.html')));
const list = wanted.length ? all.filter((n) => wanted.includes(n)) : all;

const browser = await (await loadChromium()).launch();
let failed = 0;
for (const name of list) {
  const url = pathToFileURL(join(root, name, 'demo.html')).href;
  const problems = [];
  const shoot = async (w, h, query, path, full) => {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    page.on('pageerror', (e) => problems.push(String(e)));
    await page.goto(url + query);
    await page.waitForFunction(() => window.__fxReady === true, null, { timeout: 15000 }).catch(() => problems.push('never ready'));
    await page.waitForTimeout(500);
    await page.screenshot({ path, type: path.endsWith('.jpg') ? 'jpeg' : 'png', ...(path.endsWith('.jpg') ? { quality: 88 } : {}), fullPage: !!full });
    await page.close();
  };
  await shoot(960, 640, '?shot=1', join(root, name, 'screenshot.jpg'));
  if (uiDir) {
    mkdirSync(uiDir, { recursive: true });
    await shoot(1440, 900, '', join(uiDir, `${name}-1440.png`));
    await shoot(390, 844, '', join(uiDir, `${name}-390.png`), true);
  }
  console.log(`${problems.length ? 'FAIL' : 'ok  '} ${name}${problems.length ? '  ' + problems.join(' | ').slice(0, 300) : ''}`);
  if (problems.length) failed++;
}
await browser.close();
process.exit(failed ? 1 : 0);
