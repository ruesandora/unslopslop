// The type library: enough recipes, every field filled, open licences only, no AI-default faces,
// no pairing that the repo already used, a specimen and a screenshot per recipe, every move family covered.
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { loadRecipes, FAMILIES, GROUPS } from '../skills/unslopslop/type/build.mjs';
import { AI_DEFAULT_LIST } from '../skills/unslopslop/scripts/lib/ai-default-fonts.mjs';
import { USED_PAIRINGS } from '../skills/unslopslop/scripts/lib/used-type.mjs';

const recipes = await loadRecipes();
const dir = (id, f) => fileURLToPath(new URL(`../skills/unslopslop/type/${id}/${f}`, import.meta.url));

test('at least 24 recipes, ids unique, groups known', () => {
  assert.ok(recipes.length >= 24, `${recipes.length} recipes`);
  assert.equal(new Set(recipes.map((r) => r.id)).size, recipes.length);
  for (const r of recipes) assert.ok(GROUPS.some((g) => g[0] === r.group), `${r.id}: group ${r.group}`);
});

for (const r of recipes) {
  test(`${r.id}: complete, open licence, no default face, specimen and screenshot`, () => {
    assert.ok(r.name && r.name.length >= 3, 'name missing');
    for (const k of ['case', 'signature', 'use', 'slop', 'css', 'hero']) assert.ok(r[k] && String(r[k]).length > 10, `${k} missing`);
    assert.ok(r.mood.length >= 3 && r.domains.length >= 1 && r.moves.length >= 1);
    assert.ok(r.features?.css && r.features?.note);
    assert.ok(r.ladder.length >= 4, 'ladder has at least four steps');
    for (const [role, d, m, lh] of r.ladder) assert.ok(d >= m && m >= 11 && lh > 0.8 && lh < 2.1, `${role}: ${d}/${m} lh ${lh}`);
    for (const k of ['display', 'text', 'mono', 'accent']) {
      const f = r.fonts[k];
      if (!f) continue;
      assert.match(f.licence, /^(OFL|Apache 2\.0)$/, `${k} licence`);
      assert.ok(f.q && f.fallback, `${k} needs a Google Fonts query and a fallback stack`);
      assert.ok(!AI_DEFAULT_LIST.includes(f.family.toLowerCase()), `${k} ${f.family} is on the AI-default list`);
    }
    const d = r.fonts.display.family.toLowerCase(), t = r.fonts.text.family.toLowerCase();
    assert.ok(!USED_PAIRINGS.some((u) => u.display === d && u.text === t), 'pairing already used');
    assert.ok(existsSync(dir(r.id, 'screenshot.jpg')), 'screenshot.jpg');
    const html = readFileSync(dir(r.id, 'specimen.html'), 'utf8');
    assert.ok(html.includes(`content="${r.id}"`), 'specimen is built from this recipe (run node type/build.mjs)');
    assert.ok(!/<script[^>]+src=/.test(html), 'no external scripts');
  });
}

test('every move family has a recipe, and pairings are not repeated inside the library', () => {
  for (const f of FAMILIES) assert.ok(recipes.some((r) => r.moves.includes(f)), f);
  const pairs = recipes.map((r) => `${r.fonts.display.family}|${r.fonts.text.family}`);
  assert.equal(new Set(pairs).size, pairs.length, 'two recipes share a display + text pairing');
});
