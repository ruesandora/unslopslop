// Re-run the detector on the example pages so the committed reports cannot drift from the code.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { launch } from '../skills/unslopslop/scripts/lib/browser.mjs';
import { analyze } from '../skills/unslopslop/scripts/lib/analyze.mjs';

test('example pages score the same as their committed reports', async () => {
  const browser = await launch();
  try {
    for (const ex of ['saas-landing', 'dashboard', 'motion-pure']) {
      for (const v of ex === 'motion-pure' ? ['index'] : ['before', 'after']) {
        const res = await analyze(browser, fileURLToPath(new URL(`../examples/${ex}/${v}.html`, import.meta.url)));
        if (ex === 'motion-pure') { assert.equal(res.score, 0); continue; }
        const saved = JSON.parse(await readFile(new URL(`../examples/${ex}/${v}-report/report.json`, import.meta.url), 'utf8'));
        assert.equal(res.score, saved.score, `${ex}/${v}`);
        assert.equal(res.verdict, saved.verdict, `${ex}/${v}`);
      }
    }
  } finally { await browser.close(); }
});
