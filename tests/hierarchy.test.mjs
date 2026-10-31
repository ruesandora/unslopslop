// Measured hierarchy proof and subject kinds (field, mosaic, tool, watermark, ghost): every piece has a bad and a good
// fixture. mutation.test.mjs switches each gate off (UNSLOP_TASTE_OFF) and checks that exactly its test fails.
import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch } from '../skills/unslopslop/scripts/lib/browser.mjs';
import { analyze } from '../skills/unslopslop/scripts/lib/analyze.mjs';
import { hierarchyScore, tasteScore, PROOF_PASS } from '../skills/unslopslop/scripts/lib/taste.mjs';
import { HIER_QUIET, HIER_FLAT, HIER_CROWDED, SUBJECT_FIELD, SUBJECT_MOSAIC, SUBJECT_TOOL, SUBJECT_WATERMARK, SUBJECT_GHOST } from './fixtures-hierarchy.mjs';

const only = process.env.UNSLOP_TASTE_ONLY;
const want = (n) => !only || only === n;
let browser, dir;
const cache = new Map();
const run = async (name, html) => {
  if (!cache.has(name)) {
    browser ??= await launch();
    dir ??= await mkdtemp(join(tmpdir(), 'unslop-hier-'));
    await writeFile(join(dir, `${name}.html`), html);
    cache.set(name, await analyze(browser, join(dir, `${name}.html`), { compared: true }));
  }
  return cache.get(name);
};
after(async () => { if (browser) await browser.close(); if (dir) await rm(dir, { recursive: true, force: true }); });

if (!only) {
  // Pure scorer: signals in, hierarchy out.
  const sig = (hier, extra = {}) => ({ vw: 1440, app: false, hier: { lead: 44, body: 17, ratio: 2.6, weightDiff: 500, inkDiff: 0.3, free: 0.95, levels: 3, ...hier }, ...extra });
  test('hierarchyScore: weight, ink and space earn the points without a giant size', () => {
    const r = hierarchyScore(sig({}));
    assert.ok(r.frac >= 0.7 && r.proven, JSON.stringify(r));
  });
  test('hierarchyScore: a flat page earns nothing and is not proven', () => {
    const r = hierarchyScore(sig({ lead: 18, ratio: 1, weightDiff: 0, inkDiff: 0, free: 0.2, levels: 1 }));
    assert.ok(r.frac <= 0.1 && !r.proven, JSON.stringify(r));
  });
  test('hierarchyScore: a size ratio alone (one axis) is not proven', () => {
    const r = hierarchyScore(sig({ lead: 96, body: 16, ratio: 6, weightDiff: 0, inkDiff: 0, free: 0.2, levels: 2 }));
    assert.ok(!r.proven, JSON.stringify(r));
  });
  test('hierarchyScore: the same strong hierarchy scores the same at any absolute size', () => {
    const a = hierarchyScore(sig({ lead: 44, body: 17, ratio: 2.6 })).frac, b = hierarchyScore(sig({ lead: 88, body: 34, ratio: 2.6 })).frac;
    assert.equal(a, b);
  });
  test('hierarchyScore: more levels than 7 is clutter, 3 to 5 is full credit', () => {
    const f = (levels) => hierarchyScore(sig({ levels })).frac;
    assert.ok(f(4) > f(2) && f(4) > f(12) && f(2) > f(1), `${f(1)} ${f(2)} ${f(4)} ${f(12)}`);
  });
  test('tasteScore: a measured hierarchy lifts the old 55 cap, a missing one keeps it', () => {
    const base = { subjectFrac: 0.4, subjectKind: 'media', mediaFrac: 0.4, display: 44, overlap: 1, keyword: 0, app: false, ground: 0.8, accent: 0.01, vw: 1440 };
    assert.ok(tasteScore({ ...base, hier: sig({}).hier }, 80, {}, new Set()).proof >= PROOF_PASS);
    assert.equal(tasteScore({ ...base, hier: sig({ ratio: 1, weightDiff: 0, inkDiff: 0, free: 0.2, levels: 1, lead: 17 }).hier }, 80, {}, new Set()).proof, 55);
  });
}

if (want('hierarchy')) {
  test('good: a 44 px lead built from weight, tone and space earns the hierarchy proof', async () => {
    const r = await run('quiet', HIER_QUIET);
    assert.ok(r.taste.components.hierarchy.points >= 15, JSON.stringify(r.taste.components.hierarchy));
    assert.ok(!r.taste.caps.some((c) => /flat hierarchy/.test(c)), r.taste.caps.join());
    assert.ok(r.taste.proof >= PROOF_PASS, `proof ${r.taste.proof}`);
  });
  test('bad: a flat page earns almost no hierarchy points and is capped at 55', async () => {
    const r = await run('flat', HIER_FLAT);
    assert.ok(r.taste.components.hierarchy.points <= 5, JSON.stringify(r.taste.components.hierarchy));
    assert.ok(r.taste.proof <= 55 && r.taste.caps.some((c) => /flat hierarchy/.test(c)), `${r.taste.proof} ${r.taste.caps}`);
  });
}
if (want('hierarchy')) {
  // The six type-only recipes that use no giant size must be able to earn the proof; the specimens are real full pages.
  const root = new URL('../skills/unslopslop/type/', import.meta.url);
  for (const id of ['luxury-whisper', 'finance-ledger', 'health-calm', 'swiss-position', 'brutalist-raw', 'technical-field-notes']) {
    test(`type specimen ${id} (no giant size) earns the hierarchy proof`, async (t) => {
      browser ??= await launch();
      const r = await analyze(browser, fileURLToPath(new URL(`${id}/specimen.html`, root)), { compared: true, fast: true });
      const hc = r.taste.components.hierarchy;
      t.diagnostic(`${id}: lead ${r.taste.signals.hier.lead} px, ${hc.points}/25, ${hc.why}`);
      assert.ok(hc.points >= 10 && !/does not own/.test(hc.why) && !r.taste.caps.some((c) => /flat hierarchy/.test(c)), `${hc.points} ${hc.why}`);
    });
  }
}
if (want('owns')) {
  test('bad: a crowded 48 px lead (size and weight, but no space around it) is not proven; the same lead alone is', async () => {
    const bad = await run('crowded', HIER_CROWDED), good = await run('quiet', HIER_QUIET);
    assert.ok(/does not own the screen/.test(bad.taste.components.hierarchy.why) && bad.taste.proof <= 55, `${bad.taste.components.hierarchy.why} / proof ${bad.taste.proof}`);
    assert.ok(!/does not own/.test(good.taste.components.hierarchy.why));
  });
}

const kind = async (name, pages) => ({ good: await run(`${name}-good`, pages.good), bad: await run(`${name}-bad`, pages.bad) });
if (want('field')) {
  test('subject kind field: a large pattern vector counts as the subject, a plain CSS box does not', async () => {
    const { good, bad } = await kind('field', SUBJECT_FIELD);
    assert.equal(good.taste.signals.subjectKind, 'field');
    assert.ok(good.taste.components.subject.points >= 25, JSON.stringify(good.taste.components.subject));
    assert.equal(bad.taste.components.subject.points, 0);
  });
}
if (want('mosaic')) {
  test('subject kind mosaic: a wall of 20 tiles is one subject, two tiles are not', async () => {
    const { good, bad } = await kind('mosaic', SUBJECT_MOSAIC);
    assert.equal(good.taste.signals.subjectKind, 'mosaic');
    assert.ok(good.taste.components.subject.points >= 15, JSON.stringify(good.taste.components.subject));
    assert.notEqual(bad.taste.signals.subjectKind, 'mosaic');
  });
}
if (want('tool')) {
  test('subject kind tool: a canvas inside a panel full of controls makes the tool the subject, a lone canvas card does not', async () => {
    const { good, bad } = await kind('tool', SUBJECT_TOOL);
    assert.equal(good.taste.signals.subjectKind, 'tool');
    assert.ok(good.taste.components.subject.points >= 25, JSON.stringify(good.taste.components.subject));
    assert.notEqual(bad.taste.signals.subjectKind, 'tool');
  });
}
if (want('watermark')) {
  test('watermark: an image at 7% opacity is not the subject, the same image at full opacity is', async () => {
    const { good, bad } = await kind('watermark', SUBJECT_WATERMARK);
    assert.ok(good.taste.components.subject.points > 0 && good.taste.signals.subjectKind === 'media', JSON.stringify(good.taste.signals));
    assert.equal(bad.taste.components.subject.points, 0, JSON.stringify(bad.taste.signals));
  });
}
if (want('ghost')) {
  test('ghost: an empty canvas is not a subject, a drawn canvas is', async () => {
    const { good, bad } = await kind('ghost', SUBJECT_GHOST);
    assert.ok(good.taste.components.subject.points > 0, JSON.stringify(good.taste.signals));
    assert.equal(bad.taste.components.subject.points, 0, JSON.stringify(bad.taste.signals));
  });
}
