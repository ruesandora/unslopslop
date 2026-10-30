// Finds Playwright without adding it as a dependency: local install first, then global folders.
import { createRequire } from 'node:module';
import { join, dirname } from 'node:path';
import { execSync } from 'node:child_process';

export async function loadChromium() {
  try {
    return (await import('playwright')).chromium;
  } catch {}
  const roots = [
    ...(process.env.NODE_PATH || '').split(':').filter(Boolean),
    join(dirname(process.execPath), '..', 'lib', 'node_modules'),
  ];
  try {
    roots.push(execSync('npm root -g', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim());
  } catch {}
  for (const root of roots) {
    try {
      return createRequire(join(root, 'x.js'))('playwright').chromium;
    } catch {}
  }
  throw new Error('Playwright not found. Install it yourself (npm i -g playwright && npx playwright install chromium); unslopslop does not bundle it.');
}

export async function launch() {
  const chromium = await loadChromium();
  const opts = process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};
  return chromium.launch(opts);
}

// Consent and cookie banners cover the page in every capture. They are hidden (never accepted) before
// rules run and screenshots are taken. Pass keepConsent to analyze() / --keep-consent to skip this.
export const CONSENT_SELECTORS = [
  '#onetrust-consent-sdk', '#onetrust-banner-sdk', '#CybotCookiebotDialog', '.cc-window', '.fc-consent-root', '#usercentrics-root',
  '#cookie-banner', '.cookie-banner', '#cookie-consent', '.cookie-consent', '[id*="cookie-banner" i]', '[class*="cookie-banner" i]',
  '[role="dialog"][aria-label*="cookie" i]', '[role="dialog"][aria-label*="consent" i]', '[role="region"][aria-label*="cookie" i]',
];
export async function hideConsent(page) {
  await page.addStyleTag({ content: `${CONSENT_SELECTORS.join(',')}{display:none!important}` }).catch(() => {});
}
