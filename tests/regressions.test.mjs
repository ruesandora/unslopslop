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
test('detail-numbered ignores axis labels inside a chart (role=img)', async () => {
  const axis = '<div role="img" aria-label="Day axis">' + [10, 11, 12, 13, 14].map((d) => `<span style="margin-right:16px">${d}</span>`).join('') + '</div>';
  assert.equal(await fires('axis', { body: axis }, 'detail-numbered'), false);
  assert.equal(await fires('axis-zero', { body: axis.replace(/>1(\d)</g, '>0$1<') }, 'detail-numbered'), false);
  assert.equal(await fires('ornament-zero', { body: '<div>01</div><div>02</div><div>03</div>' }, 'detail-numbered'), true);
});
test('detail-numbered ignores item counts in navigation', async () => {
  const nav = '<nav><a href="#">Invoices 24</a> <a href="#">Clients <span>18</span></a> <a href="#">Views <span>13</span></a> <a href="#">Paid <span>11</span></a></nav>';
  assert.equal(await fires('navcount', { body: nav }, 'detail-numbered'), false);
});
test('detail-numbered leaves data counts alone but still catches numbers stacked over headings', async () => {
  assert.equal(await fires('counts', { body: '<p>Sent <b>23</b></p><p>Open <span>11</span></p><p>Paid <span>13</span></p>' }, 'detail-numbered'), false);
  assert.equal(await fires('over-heads', { body: '<div><span>12</span><h3>Plan</h3></div><div><span>13</span><h3>Build</h3></div><div><span>14</span><h3>Ship</h3></div>' }, 'detail-numbered'), true);
});
