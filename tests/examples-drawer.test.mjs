// The example pages' phone menus must open and close (a dead "Menu" button hides the navigation on phones).
import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { launch } from '../skills/unslopslop/scripts/lib/browser.mjs';
import { toUrl } from '../skills/unslopslop/scripts/lib/analyze.mjs';

const cases = [
  ['saas-landing', '#site-nav', 20], // drawer on the right: click the left edge
  ['dashboard', '#drawer', 370],    // drawer on the left: click the right edge
];

test('phone menu opens a drawer at 390 px, moves focus in, and closes on Escape and outside click', async () => {
  const browser = await launch();
  try {
    for (const [ex, drawer, outsideX] of cases) {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
      const p = await ctx.newPage();
      await p.goto(toUrl(fileURLToPath(new URL(`../examples/${ex}/after.html`, import.meta.url))), { waitUntil: 'load' });
      const btn = p.locator('button.menu');
      assert.equal(await btn.getAttribute('aria-expanded'), 'false', `${ex}: closed at start`);
      assert.equal(await p.locator(`${drawer} a`).first().isVisible(), false, `${ex}: links hidden at start`);
      await btn.click();
      await p.waitForTimeout(400);
      assert.equal(await btn.getAttribute('aria-expanded'), 'true', `${ex}: aria-expanded after click`);
      assert.equal(await p.locator(`${drawer} a`).first().isVisible(), true, `${ex}: links visible after click`);
      assert.ok(await p.evaluate((sel) => document.querySelector(sel).contains(document.activeElement), drawer), `${ex}: focus moved into the drawer`);
      await p.keyboard.press('Escape');
      await p.waitForTimeout(400);
      assert.equal(await btn.getAttribute('aria-expanded'), 'false', `${ex}: Escape closes`);
      assert.equal(await p.locator(`${drawer} a`).first().isVisible(), false, `${ex}: links hidden after Escape`);
      await btn.click();
      await p.waitForTimeout(400);
      await p.mouse.click(outsideX, 800);
      await p.waitForTimeout(400);
      assert.equal(await btn.getAttribute('aria-expanded'), 'false', `${ex}: outside click closes`);
      await ctx.close();
    }
  } finally { await browser.close(); }
});
