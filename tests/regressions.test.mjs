// Bugs found while building the examples; each stays fixed.
import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { launch } from '../skills/unslopslop/scripts/lib/browser.mjs';
import { analyze } from '../skills/unslopslop/scripts/lib/analyze.mjs';
import { page } from './fixtures.mjs';

let browser, dir;
before(async () => { browser = await launch(); dir = await mkdtemp(join(tmpdir(), 'unslop-reg-')); });
after(async () => { await browser.close(); await rm(dir, { recursive: true, force: true }); });
const fires = async (name, def, id) => {
  const f = join(dir, name + '.html');
  await writeFile(f, page(def));
  return (await analyze(browser, f, { only: [id], fast: true })).findings.some((x) => x.rule === id);
};

test('spacing-cramped ignores a footer that only has a top rule', async () => {
  assert.equal(await fires('footer', { css: 'footer{border-top:1px solid #ccc;padding:32px 0}', body: '<footer>Footer text longer than twelve chars</footer>' }, 'spacing-cramped'), false);
});
test('type-flat-hierarchy compares the largest size per heading level, not the first heading found', async () => {
  const body = '<h2 style="font-size:20px">Card title</h2><h2 style="font-size:32px">Section title</h2><h3 style="font-size:20px">Sub</h3>' + Array.from({ length: 12 }, (_, i) => `<p>Paragraph ${i}.</p>`).join('');
  assert.equal(await fires('hier', { body }, 'type-flat-hierarchy'), false);
});
