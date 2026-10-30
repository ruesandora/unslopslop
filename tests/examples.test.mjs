// The shipped examples must keep demonstrating the claim: slop before, bland v1, and an after
// page that is clean on slop AND passes craft.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

for (const ex of ['saas-landing', 'dashboard']) {
  const load = async (v) => JSON.parse(await readFile(new URL(`../examples/${ex}/${v}-report/report.json`, import.meta.url), 'utf8'));
  test(`${ex}: heavy slop before, bland v1, clean and crafted after`, async () => {
    const [b, v1, a] = [await load('before'), await load('after-v1'), await load('after')];
    assert.equal(b.verdict, 'heavy');
    assert.equal(b.overall, 'fail');
    assert.equal(v1.verdict, 'clean');
    assert.ok(v1.craft.score < 70, `v1 craft ${v1.craft.score}`);
    assert.equal(v1.overall, 'fail');
    assert.equal(a.verdict, 'clean');
    assert.ok(a.craft.score >= 70 && a.craft.score > v1.craft.score && a.craft.score > b.craft.score);
    assert.equal(a.overall, 'pass');
  });
}
