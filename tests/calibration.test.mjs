// Calibration: the scorer must agree with the owner's eye. Bad pages (owner: 90-100 slop) must score >= 90
// or fail outright; good pages must earn the taste proof. Gold references live outside the repo
// (labels.json "goldFile"); that part is skipped when the file is absent.
import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { launch } from '../skills/unslopslop/scripts/lib/browser.mjs';
import { analyze } from '../skills/unslopslop/scripts/lib/analyze.mjs';
import { PROOF_PASS, tasteScore, ownerSlop } from '../skills/unslopslop/scripts/lib/taste.mjs';

const dir = new URL('./calibration/', import.meta.url);
const labels = JSON.parse(await readFile(new URL('labels.json', dir), 'utf8'));
let browser;
const res = {};
// Items marked local live outside the repo: $UNSLOP_CALIBRATION_DIR/<id>/index.html (absent: skipped).
const pageOf = (it) => (it.local ? (process.env.UNSLOP_CALIBRATION_DIR ? join(process.env.UNSLOP_CALIBRATION_DIR, it.id, 'index.html') : null) : fileURLToPath(new URL(`pages/${it.id}/index.html`, dir)));
const present = labels.items.filter((it) => { const f = pageOf(it); return f && existsSync(f); });
before(async () => {
  browser = await launch();
  for (const it of present) res[it.id] = await analyze(browser, pageOf(it), { compared: true });
});
after(async () => { await browser.close(); });

for (const it of present.filter((i) => i.side === 'bad')) {
  test(`bad: ${it.id} scores >= 90 and fails`, () => {
    const r = res[it.id];
    assert.ok(r.score >= 90, `${it.id}: owner slop ${r.score} (pattern ${r.patternScore}, proof ${r.taste.proof})`);
    assert.equal(r.overall, 'fail');
  });
}
for (const it of present.filter((i) => i.side === 'good')) {
  test(`good: ${it.id} earns the taste proof and is not a fail`, () => {
    const r = res[it.id];
    assert.ok(r.taste.proof >= PROOF_PASS, `${it.id}: proof ${r.taste.proof} ${JSON.stringify(r.taste.caps)}`);
    assert.equal(r.overall, 'pass', `${it.id}: slop ${r.score}`);
  });
}
test('bad and good sides are separated by the taste proof', { skip: present.some((i) => i.side === 'good') ? false : 'no local good page present' }, () => {
  const bad = Math.max(...present.filter((i) => i.side === 'bad').map((i) => res[i.id].taste.proof));
  const good = Math.min(...present.filter((i) => i.side === 'good').map((i) => res[i.id].taste.proof));
  assert.ok(good > bad + 30, `best bad proof ${bad}, worst good proof ${good}`);
});

// Derived measurements of strong reference pages (g) and template-style counters (c), taken on live pages.
const score = (m) => { const t = tasteScore(m.signals, m.craft, { compared: true }); return { proof: t.proof, slop: ownerSlop(m.tells, t.proof), craft: m.craft }; };
for (const m of labels.measured.filter((x) => x.expect === 'pass')) {
  test(`gold ${m.id} (${m.note}) is not a fail: proof >= ${PROOF_PASS}, slop under 35`, () => {
    const r = score(m);
    assert.ok(r.proof >= PROOF_PASS && r.slop < 35 && r.craft >= 70, JSON.stringify(r));
  });
}
for (const m of labels.measured.filter((x) => x.expect === 'fail')) {
  test(`counter ${m.id} fails: slop 35 or more`, () => {
    const r = score(m);
    assert.ok(r.slop >= 35, JSON.stringify(r));
  });
}
test('the scorer is neither all-pass nor all-fail on the measured set', () => {
  const passes = labels.measured.filter((m) => { const r = score(m); return r.proof >= PROOF_PASS && r.slop < 35 && r.craft >= 70; }).map((m) => m.side);
  assert.ok(passes.includes('gold') && !passes.includes('counter'), passes.join());
});

// Local gold list (kept outside the repo): rendered live; skipped when the file is absent.
const goldFile = process.env[labels.goldFileEnv];
const gold = goldFile && existsSync(goldFile) ? JSON.parse(await readFile(goldFile, 'utf8')) : null;
test('gold references (local list, rendered live) are not a fail with a reference compare', { skip: gold ? false : 'UNSLOP_GOLD_FILE not set (list kept outside the repo)' }, async () => {
  for (const g of gold) {
    const r = await analyze(browser, g.url || g.html, { compared: true });
    assert.equal(r.overall, 'pass', `${g.id}: owner slop ${r.score}, proof ${r.taste && r.taste.proof}`);
  }
});
