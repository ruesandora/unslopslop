// Craft score: a rich page passes, a stripped document fails, and every component earns points
// on the rich page. mutation.test.mjs switches each component off (UNSLOP_CRAFT_OFF) and checks
// that exactly its "earns points" test fails.
import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { launch } from '../skills/unslopslop/scripts/lib/browser.mjs';
import { analyze } from '../skills/unslopslop/scripts/lib/analyze.mjs';
import { COMPONENTS, CRAFT_PASS, craftScore } from '../skills/unslopslop/scripts/lib/craft.mjs';
import { RICH, DOC } from './fixtures-bland.mjs';

let browser, dir, rich, doc;
before(async () => {
  browser = await launch();
  dir = await mkdtemp(join(tmpdir(), 'unslop-craft-'));
  await writeFile(join(dir, 'rich.html'), RICH);
  await writeFile(join(dir, 'doc.html'), DOC);
  rich = await analyze(browser, join(dir, 'rich.html'));
  doc = await analyze(browser, join(dir, 'doc.html'));
});
after(async () => {
  await browser.close();
  await rm(dir, { recursive: true, force: true });
});

const only = process.env.UNSLOP_CRAFT_ONLY;

for (const name of Object.keys(COMPONENTS)) {
  if (only && only !== name) continue;
  test(`rich page earns points for ${name}`, () => {
    assert.ok(rich.craft.components[name].points > 0, `${name}: ${JSON.stringify(rich.craft.components[name])}`);
  });
}

if (!only) {
  test('components add up to 100', () => {
    assert.equal(Object.values(COMPONENTS).reduce((a, b) => a + b, 0), 100);
  });
  test(`rich page passes the craft mark (${CRAFT_PASS})`, () => {
    assert.ok(rich.craft.score >= CRAFT_PASS, JSON.stringify(rich.craft.components));
  });
  test('stripped document scores low and raises bland signals', () => {
    assert.ok(doc.craft.score < 40, `doc craft ${doc.craft.score}`);
    const ids = doc.craft.findings.map((f) => f.rule);
    for (const id of ['bland-no-hero-visual', 'bland-document-column', 'bland-default-serif', 'bland-static', 'bland-no-depth', 'bland-no-texture']) assert.ok(ids.includes(id), id);
  });
  test('clean slop with low craft is an overall fail', () => {
    assert.equal(doc.verdict, 'clean');
    assert.equal(doc.overall, 'fail');
  });
  test('bland signals never add to the slop score', () => {
    assert.equal(doc.score, 0);
  });
  test('craftScore is pure: same signals, same score; more visual area, more points', () => {
    const s = rich.craft.signals;
    assert.deepEqual(craftScore(s, '', new Set()), craftScore(s, '', new Set()));
    const less = craftScore({ ...s, visFrac: 0.02, bestVis: 0.02 }, '', new Set());
    assert.ok(less.components.visual.points < craftScore(s, '', new Set()).components.visual.points);
  });
}
