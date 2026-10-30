#!/usr/bin/env node
// unslopslop detector. Renders a URL or local HTML file at 1440 and 390 px, runs the rule catalogue,
// prints a scored report with a clean / light / heavy verdict.
//
//   node detect.mjs <file.html | url> [--out dir] [--json] [--disable rule,rule] [--fail-on light|heavy]
//
//   --out dir        write report.json, report.md, desktop.png, mobile.png into dir
//   --json           print JSON instead of markdown
//   --disable ids    skip rules (comma separated); UNSLOP_DISABLE does the same
//   --fail-on level  exit 1 when the slop verdict is at least that bad (default: always exit 0)
//   --min-craft n    exit 1 when the craft score is below n (70 is the pass mark)
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { launch } from './lib/browser.mjs';
import { analyze } from './lib/analyze.mjs';
import { toJson, toMarkdown } from './lib/report.mjs';
import { RULE_IDS } from './lib/rules.mjs';
import { BLAND_IDS } from './lib/rules-bland.mjs';

const args = process.argv.slice(2);
const o = { out: null, json: false, disable: [], failOn: null, minCraft: null };
let target = null;
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--out') o.out = args[++i];
  else if (a === '--json') o.json = true;
  else if (a === '--disable') o.disable = (args[++i] || '').split(',').map((s) => s.trim()).filter(Boolean);
  else if (a === '--fail-on') o.failOn = args[++i];
  else if (a === '--min-craft') o.minCraft = +args[++i];
  else if (a === '-h' || a === '--help') { console.log(readFileHelp()); process.exit(0); }
  else target = a;
}
function readFileHelp() {
  return 'Usage: node detect.mjs <file.html | url> [--out dir] [--json] [--disable rule,rule] [--fail-on light|heavy] [--min-craft 70]';
}
if (!target) { console.error(readFileHelp()); process.exit(2); }
for (const d of o.disable) if (!RULE_IDS.includes(d) && !BLAND_IDS.includes(d)) { console.error(`Unknown rule: ${d}`); process.exit(2); }

let outDir = null;
if (o.out) { outDir = resolve(o.out); await mkdir(outDir, { recursive: true }); }
const browser = await launch();
let result;
try {
  result = await analyze(browser, target, { disable: o.disable, screenshotDir: outDir });
} catch (e) {
  console.error(`detect failed: ${e.message}`);
  await browser.close();
  process.exit(2);
}
await browser.close();
result.disabled = o.disable.length;
const json = toJson(result);
const md = toMarkdown(result);
if (outDir) {
  await writeFile(`${outDir}/report.json`, JSON.stringify(json, null, 2) + '\n');
  await writeFile(`${outDir}/report.md`, md + '\n');
}
console.log(o.json ? JSON.stringify(json, null, 2) : md);
const order = { clean: 0, light: 1, heavy: 2 };
if (o.failOn && order[result.verdict] >= order[o.failOn]) process.exit(1);
if (o.minCraft !== null && !(result.craft.score >= o.minCraft)) process.exit(1);
