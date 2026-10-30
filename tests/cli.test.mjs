import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, writeFile, readFile, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { page } from './fixtures.mjs';

const S = (n) => fileURLToPath(new URL(`../skills/unslopslop/scripts/${n}`, import.meta.url));
const env = { ...process.env };
delete env.NODE_TEST_CONTEXT;
let dir, slop, clean, anim;

before(async () => {
  dir = await mkdtemp(join(tmpdir(), 'unslop-cli-'));
  slop = join(dir, 'slop.html');
  clean = join(dir, 'clean.html');
  anim = join(dir, 'anim.html');
  await writeFile(slop, page({ body: '<h2>Unleash seamless power</h2><p>Lorem ipsum dolor sit amet</p><h2 style="background:linear-gradient(90deg,#6d28d9,#2563eb);-webkit-background-clip:text;background-clip:text;color:transparent">Go</h2><div style="width:2000px;height:10px"></div>' }));
  await writeFile(clean, page({ body: '' }));
  await writeFile(anim, page({
    css: '#b{width:100px;height:40px;background:#999;opacity:1}#b.go{opacity:.2;transition:opacity 400ms ease-out}',
    body: '<button id="t" onclick="document.getElementById(\'b\').classList.add(\'go\')" style="padding:12px 20px">go</button><div id="b"></div>',
  }));
});
after(() => rm(dir, { recursive: true, force: true }));

const run = (script, args) => spawnSync(process.execPath, [S(script), ...args], { encoding: 'utf8', env });

test('detect --json: shape, verdict heavy on a sloppy page', () => {
  const r = run('detect.mjs', [slop, '--json']);
  assert.equal(r.status, 0, r.stderr);
  const j = JSON.parse(r.stdout);
  assert.equal(j.tool, 'unslopslop');
  assert.equal(j.verdict, 'heavy');
  assert.ok(j.score >= 35);
  const ids = j.findings.map((f) => f.rule);
  for (const id of ['copy-cliche', 'copy-placeholder', 'color-purple-gradient', 'layout-overflow-x']) assert.ok(ids.includes(id), id);
  assert.ok(Object.keys(j.byPass).length === 9);
});
test('detect on the clean page: score 0, verdict clean', () => {
  const j = JSON.parse(run('detect.mjs', [clean, '--json']).stdout);
  assert.equal(j.score, 0);
  assert.equal(j.verdict, 'clean');
});
test('--fail-on heavy exits 1 for slop and 0 for clean', () => {
  assert.equal(run('detect.mjs', [slop, '--fail-on', 'heavy', '--json']).status, 1);
  assert.equal(run('detect.mjs', [clean, '--fail-on', 'light', '--json']).status, 0);
});
test('--disable removes a rule and lowers the score', () => {
  const full = JSON.parse(run('detect.mjs', [slop, '--json']).stdout);
  const cut = JSON.parse(run('detect.mjs', [slop, '--json', '--disable', 'color-purple-gradient']).stdout);
  assert.ok(!cut.findings.some((f) => f.rule === 'color-purple-gradient'));
  assert.ok(cut.score < full.score);
});
test('unknown rule id and missing file are usage errors (exit 2)', () => {
  assert.equal(run('detect.mjs', [slop, '--disable', 'nope']).status, 2);
  assert.equal(run('detect.mjs', [join(dir, 'missing.html')]).status, 2);
});
test('--out writes report.json, report.md and both screenshots', async () => {
  const out = join(dir, 'out');
  assert.equal(run('detect.mjs', [slop, '--out', out]).status, 0);
  for (const f of ['report.json', 'report.md', 'desktop.png', 'mobile.png']) assert.ok((await stat(join(out, f))).size > 0, f);
  assert.match(await readFile(join(out, 'report.md'), 'utf8'), /Verdict: \*\*HEAVY\*\*/);
});
test('compare.mjs writes a PNG', async () => {
  const out = join(dir, 'cmp.png');
  assert.equal(run('compare.mjs', [slop, clean, '--out', out]).status, 0);
  const buf = await readFile(out);
  assert.equal(buf.subarray(1, 4).toString(), 'PNG');
  assert.ok(buf.length > 2000);
});
test('motion-probe reads declared duration and measures an ease-out fade', () => {
  const r = run('motion-probe.mjs', [anim, '--trigger', 'click:#t', '--sample', '#b', '--ms', '900', '--json']);
  assert.equal(r.status, 0, r.stderr);
  const j = JSON.parse(r.stdout);
  assert.ok(j.declared.some((d) => d.kind === 'transition' && d.duration === 400 && /opacity/.test(d.props)), JSON.stringify(j.declared));
  assert.equal(j.measured.channel, 'opacity');
  assert.ok(j.measured.durationMs > 250 && j.measured.durationMs < 600, JSON.stringify(j.measured));
  assert.equal(j.measured.easingClass, 'ease-out');
});
