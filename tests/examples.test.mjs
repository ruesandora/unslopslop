// The "before" example pages must stay heavy slop. The "after" pages are NOT asserted here any more:
// the owner judged earlier after pages as bad as the before pages, and the old scorer still passed them.
// Their old versions now live in tests/calibration (labelled bad) and calibration.test.mjs holds the line.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

for (const ex of ['saas-landing', 'dashboard']) {
  test(`${ex}: the before report is heavy slop and a fail`, async () => {
    const b = JSON.parse(await readFile(new URL(`../examples/${ex}/before-report/report.json`, import.meta.url), 'utf8'));
    assert.equal(b.verdict, 'heavy');
    assert.equal(b.overall, 'fail');
  });
}
