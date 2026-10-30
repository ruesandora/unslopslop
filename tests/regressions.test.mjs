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
test('layout-text-overlap ignores the hidden body of a closed <details>', async () => {
  const body = '<details><summary>First question</summary><p>Hidden answer text</p></details><details><summary>Second question</summary><p>Another answer</p></details>';
  assert.equal(await fires('details', { body }, 'layout-text-overlap'), false);
});
test('layout-side-stripe catches a bar drawn with ::before and a 2 px inset shadow', async () => {
  assert.equal(await fires('pseudo-bar', { css: '.n{position:relative;padding:16px;background:#fff}.n::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:#f5c518}', body: '<div class="n">Cookie notice text</div>' }, 'layout-side-stripe'), true);
  assert.equal(await fires('inset-2', { body: '<div style="padding:16px;box-shadow:inset 2px 0 0 #3a55f0">Highlighted row text</div>' }, 'layout-side-stripe'), true);
});

// Over-firing on dense real sites (calibration against strong reference pages).
test('gradient rules ignore a text highlight that sweeps across (background wider than the text)', async () => {
  const sweep = 'background:linear-gradient(90deg,#72726e 33%,#feb629 40%,#ff91e0 45%,#cebef8 50%,transparent 67%);background-size:300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent';
  const fill = sweep.replace('background-size:300% 100%;', '');
  for (const id of ['color-gradient-text', 'color-random-gradient', 'color-purple-gradient']) {
    assert.equal(await fires('sweep-' + id, { body: `<p style="${sweep}">Highlight sweep over a transcript line</p>` }, id), false, id);
  }
  assert.equal(await fires('fill', { body: `<h2 style="${fill}">Static gradient fill headline</h2>` }, 'color-gradient-text'), true);
});
test('small and tiny text rules ignore labels inside an aria-hidden product picture', async () => {
  const inner = Array.from({ length: 4 }, () => '<p style="font-size:10px">mock label</p>').join('');
  assert.equal(await fires('mock-tiny', { body: `<div aria-hidden="true">${inner}</div>` }, 'type-tiny-text'), false);
  assert.equal(await fires('real-tiny', { body: inner }, 'type-tiny-text'), true);
  const inner12 = inner.replaceAll('10px', '12px');
  assert.equal(await fires('mock-small', { body: `<div role="img" aria-label="x">${inner12}</div>` }, 'type-small-text'), false);
});
test('spacing-cramped accepts a control whose height comes from height/line-height, not padding', async () => {
  const btn = (st) => `<a href="#a" style="display:inline-flex;align-items:center;background:#222;color:#fff;font:inherit;${st}">Buy now</a>`;
  assert.equal(await fires('ctl-height', { body: btn('height:40px;padding:0 18px') }, 'spacing-cramped'), false);
  assert.equal(await fires('ctl-flat', { body: btn('padding:0 4px') }, 'spacing-cramped'), true);
});
test('motion-infinite spares a long product-demo loop and shimmer, still flags an empty floating shape', async () => {
  const css = '@keyframes f{50%{transform:translateY(-10px)}}';
  const demo = '<div style="animation:f 6s ease-in-out infinite;padding:12px">Reminder sent on day 3</div>';
  const shimmer = '<div class="shimmer" style="width:80px;height:30px;background:#ddd;animation:f 2s linear infinite"></div>';
  const orb = '<div style="width:60px;height:60px;background:#ccc;animation:f 3s ease-in-out infinite"></div>';
  assert.equal(await fires('loop-demo', { css, body: demo }, 'motion-infinite'), false);
  assert.equal(await fires('loop-shimmer', { css, body: shimmer }, 'motion-infinite'), false);
  assert.equal(await fires('loop-orb', { css, body: orb }, 'motion-infinite'), true);
});
