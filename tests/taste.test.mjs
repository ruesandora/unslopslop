// Taste proof: a page that dodges the slop checklist but has no taste is NOT proven good.
// mutation.test.mjs switches each component off (UNSLOP_TASTE_OFF) and checks that exactly its test fails.
import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { launch } from '../skills/unslopslop/scripts/lib/browser.mjs';
import { analyze } from '../skills/unslopslop/scripts/lib/analyze.mjs';
import { tasteScore, ownerSlop, PROOF_PASS, TASTE_COMPONENTS } from '../skills/unslopslop/scripts/lib/taste.mjs';
import { RICH, TASTE_GOOD } from './fixtures-bland.mjs';

const HIER = { lead: 90, body: 17, ratio: 5.3, weightDiff: 400, inkDiff: 0.4, free: 0.95, levels: 4 };
const FLAT = { lead: 17, body: 17, ratio: 1, weightDiff: 0, inkDiff: 0, free: 0.2, levels: 1 };

const only = process.env.UNSLOP_TASTE_ONLY;
let browser, dir, plain, good, goodCompared;
before(async () => {
  browser = await launch();
  dir = await mkdtemp(join(tmpdir(), 'unslop-taste-'));
  await writeFile(join(dir, 'plain.html'), RICH);
  await writeFile(join(dir, 'good.html'), TASTE_GOOD);
  plain = await analyze(browser, join(dir, 'plain.html'));
  good = await analyze(browser, join(dir, 'good.html'));
  goodCompared = await analyze(browser, join(dir, 'good.html'), { compared: true });
});
after(async () => { await browser.close(); await rm(dir, { recursive: true, force: true }); });

for (const name of Object.keys(TASTE_COMPONENTS)) {
  if (only && only !== name) continue;
  test(`taste component ${name} earns points on the good page`, () => {
    assert.ok(good.taste.components[name].points > 0, `${name}: ${JSON.stringify(good.taste.components[name])}`);
  });
}
if (!only || only === 'reference') {
  test('reference gate: without a side-by-side compare a passing page is UNPROVEN, with one it passes', () => {
    assert.equal(good.overall, 'unproven');
    assert.equal(goodCompared.overall, 'pass');
  });
}
if (!only) {
  test('components add up to 100', () => {
    assert.equal(Object.values(TASTE_COMPONENTS).reduce((a, b) => a + b, 0), 100);
  });
  test('a checklist-clean, craft-passing page with no real subject is not proven good (the rejected redesign case)', () => {
    assert.equal(plain.patternScore, 0, 'no slop pattern fires');
    assert.ok(plain.craft.score >= 70, `craft ${plain.craft.score}`);
    assert.ok(plain.taste.proof <= 10, `proof ${plain.taste.proof}`);
    assert.ok(plain.score >= 90, `owner slop ${plain.score}`);
    assert.equal(plain.overall, 'fail');
  });
  test('the good page is proven and low on slop', () => {
    assert.ok(good.taste.proof >= PROOF_PASS && good.score <= 20, JSON.stringify([good.taste.proof, good.score]));
  });
  test('tasteScore is pure; owner slop: unproven pulls up, tells count less when proven', () => {
    const t = { subjectFrac: 0.4, subjectKind: 'media', mediaFrac: 0.4, display: 90, overlap: 1, keyword: 0, app: false, ground: 0.8, accent: 0.01, vw: 1440, hier: HIER };
    assert.deepEqual(tasteScore(t, 80, {}, new Set()), tasteScore(t, 80, {}, new Set()));
    assert.equal(tasteScore(t, 80, {}, new Set()).proof, 100);
    assert.equal(ownerSlop(0, 30), 70);
    assert.ok(ownerSlop(90, 90) < ownerSlop(90, 20));
  });
  test('caps: no subject caps the proof at 10; a flat hierarchy caps it at 55', () => {
    const t = { subjectFrac: 0, subjectKind: '', mediaFrac: 0, display: 90, overlap: 0, keyword: 0, app: false, ground: 0.8, accent: 0.01, vw: 1440, hier: HIER };
    assert.equal(tasteScore(t, 80, {}, new Set()).proof, 10);
    assert.equal(tasteScore({ ...t, subjectFrac: 0.4, mediaFrac: 0.4, hier: FLAT, overlap: 1 }, 80, {}, new Set()).proof, 55);
  });
  test('a full-bleed or tiny subject earns less than one at 25-60%', () => {
    const base = { subjectKind: 'media', display: 90, vw: 1440, hier: HIER, overlap: 1, keyword: 0, app: false, ground: 0.8, accent: 0.01 };
    const at = (f) => tasteScore({ ...base, subjectFrac: f, mediaFrac: f }, 80, {}, new Set()).components.subject.points;
    assert.ok(at(0.4) > at(0.99) && at(0.4) > at(0.12) && at(0.12) > at(0.02), `${at(0.4)} ${at(0.99)} ${at(0.12)} ${at(0.02)}`);
  });
  test('a coloured headline keyword loses the keyword points', () => {
    const t = { subjectFrac: 0.4, mediaFrac: 0.4, display: 90, overlap: 1, keyword: 1, app: false, ground: 0.8, accent: 0.01, vw: 1440, hier: HIER };
    assert.equal(tasteScore(t, 80, {}, new Set()).components.keyword.points, 0);
  });
}
