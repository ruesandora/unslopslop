// Each rule: fires on its bad fixture, stays quiet on its good fixture.
// UNSLOP_ONLY=<id> limits the run to one rule (used by mutation.test.mjs).
import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { launch } from '../skills/unslopslop/scripts/lib/browser.mjs';
import { analyze } from '../skills/unslopslop/scripts/lib/analyze.mjs';
import { RULES } from '../skills/unslopslop/scripts/lib/rules.mjs';
import { FIXTURES, BASE, page } from './fixtures.mjs';
import { BLAND } from '../skills/unslopslop/scripts/lib/rules-bland.mjs';
import { BLAND_FIXTURES } from './fixtures-bland.mjs';

let browser, dir;
before(async () => {
  browser = await launch();
  dir = await mkdtemp(join(tmpdir(), 'unslop-'));
});
after(async () => {
  await browser.close();
  await rm(dir, { recursive: true, force: true });
});

async function run(name, def, only) {
  const file = join(dir, `${name}.html`);
  await writeFile(file, def.html || page(def));
  return analyze(browser, file, { only, fast: true });
}

const only = process.env.UNSLOP_ONLY;

if (!only) {
  test('every rule has a fixture pair, and no fixture lacks a rule', () => {
    assert.deepEqual(Object.keys(FIXTURES).sort(), RULES.map((r) => r.id).sort());
    assert.deepEqual(Object.keys(BLAND_FIXTURES).sort(), BLAND.map((r) => r.id).sort());
  });
  test('rule ids are unique and carry severity, pass, fix text', () => {
    const ids = new Set();
    for (const r of [...RULES, ...BLAND]) {
      assert.ok(!ids.has(r.id), `duplicate ${r.id}`);
      ids.add(r.id);
      assert.ok(['critical', 'major', 'minor'].includes(r.severity), r.id);
      assert.ok(r.fix && r.why && r.title, r.id);
    }
  });
  test('the clean base page has zero findings and no rule errors', async () => {
    const res = await run('base', BASE);
    assert.deepEqual(res.findings.map((f) => f.rule), []);
    assert.deepEqual(res.errors, []);
    assert.equal(res.score, 0);
    assert.equal(res.verdict, 'clean');
  });
}

for (const rule of [...RULES, ...BLAND]) {
  if (only && only !== rule.id) continue;
  const fx = FIXTURES[rule.id] || BLAND_FIXTURES[rule.id];
  const pick = (res) => (rule.pass === 'craft' ? res.craft.findings : res.findings);
  test(`${rule.id} fires on bad fixture`, async () => {
    const res = await run(`${rule.id}-bad`, fx.bad, [rule.id]);
    assert.deepEqual(res.errors, []);
    assert.ok(pick(res).some((f) => f.rule === rule.id), `${rule.id} did not fire`);
  });
  test(`${rule.id} stays quiet on good fixture`, async () => {
    const res = await run(`${rule.id}-good`, fx.good, [rule.id]);
    assert.deepEqual(res.errors, []);
    assert.ok(!pick(res).some((f) => f.rule === rule.id), `${rule.id} fired on the good fixture: ${JSON.stringify(pick(res)[0]?.examples)}`);
  });
}
