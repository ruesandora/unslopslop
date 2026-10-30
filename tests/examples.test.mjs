// The shipped examples must keep demonstrating the claim: slop before, clean after.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

for (const ex of ['saas-landing', 'dashboard']) {
  const load = async (v) => JSON.parse(await readFile(new URL(`../examples/${ex}/${v}-report/report.json`, import.meta.url), 'utf8'));
  test(`${ex}: committed reports show heavy before and clean after`, async () => {
    const [b, a] = [await load('before'), await load('after')];
    assert.equal(b.verdict, 'heavy');
    assert.ok(b.score >= 35);
    assert.equal(a.verdict, 'clean');
    assert.ok(a.score < 10 && a.score < b.score);
  });
}
