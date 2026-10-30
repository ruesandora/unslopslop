#!/usr/bin/env node
// Zoomed crops for the independent review: headings, captions, numbers, cards, rotated things and
// stamps, emoji, the lowest-contrast texts, plus the first screen at 1440 and 390.
//   node review-crops.mjs <file|url> --out dir [--wait ms] [--max 40]
// Writes PNGs and index.md (what each crop is) into dir.
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { launch, hideConsent } from './lib/browser.mjs';
import { toUrl } from './lib/analyze.mjs';

const args = process.argv.slice(2);
const o = { out: 'crops', wait: 1500, max: 40 };
let target = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--out') o.out = args[++i];
  else if (args[i] === '--wait') o.wait = +args[++i];
  else if (args[i] === '--max') o.max = +args[++i];
  else target = args[i];
}
if (!target) { console.error('Usage: node review-crops.mjs <file|url> --out dir [--wait ms] [--max 40]'); process.exit(2); }
const dir = resolve(o.out);
await mkdir(dir, { recursive: true });
const browser = await launch();
const index = ['# Review crops', ''];
try {
  for (const [name, w, h] of [['first-1440', 1440, 900], ['first-390', 390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const p = await ctx.newPage();
    await p.goto(toUrl(target), { waitUntil: 'load', timeout: 30000 });
    await hideConsent(p);
    await p.waitForTimeout(o.wait);
    await p.screenshot({ path: join(dir, `${name}.png`) });
    index.push(`- \`${name}.png\`: first screen at ${w} px`);
    if (w === 1440) {
      const boxes = await p.evaluate(() => {
        const out = [];
        const lum = (c) => { const m = c.match(/[\d.]+/g); if (!m) return 1; const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(+m[0]) + 0.7152 * f(+m[1]) + 0.0722 * f(+m[2]); };
        const bgOf = (e) => { for (let x = e; x; x = x.parentElement) { const s = getComputedStyle(x); const m = s.backgroundColor.match(/[\d.]+/g); if (m && (m[3] === undefined || +m[3] > 0.9)) return s.backgroundColor; } return 'rgb(255,255,255)'; };
        const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
        const own = (e) => [...e.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(' ').trim();
        const vis = (e) => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 4 && r.height > 4 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0.05; };
        const add = (e, kind) => { const r = e.getBoundingClientRect(); out.push({ kind, x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height, text: (e.textContent || '').trim().slice(0, 60) }); };
        const all = [...document.body.querySelectorAll('*')].filter(vis);
        for (const e of document.querySelectorAll('h1, h2, h3')) if (vis(e)) add(e, 'heading');
        const texts = all.filter((e) => own(e).length > 1);
        for (const e of texts) {
          const s = getComputedStyle(e), t = own(e), size = parseFloat(s.fontSize);
          if (size <= 14 && t.split(/\s+/).length >= 4 && !e.closest('nav, td, th, button, a')) add(e, 'small text / caption');
          if (/\d/.test(t) && t.length <= 16 && size >= 28) add(e, 'large number');
          if (/\p{Extended_Pictographic}/u.test(t)) add(e, 'emoji');
        }
        const low = texts.map((e) => ({ e, r: ratio(getComputedStyle(e).color, bgOf(e)) })).filter((x) => own(x.e).length >= 12).sort((a, b) => a.r - b.r).slice(0, 5);
        for (const x of low) add(x.e, `low contrast ${x.r.toFixed(2)}:1`);
        for (const e of all) {
          const s = getComputedStyle(e);
          const rot = (s.rotate && s.rotate !== 'none') || /matrix\((?!1, 0, 0, 1)/.test(s.transform);
          if (rot && (e.textContent || '').trim()) add(e, 'rotated element');
          const r = e.getBoundingClientRect();
          if (r.width >= 160 && r.height >= 80 && parseFloat(s.borderTopLeftRadius) >= 6 && (s.boxShadow !== 'none' || parseFloat(s.borderTopWidth) >= 1)) add(e, 'card or panel');
          if (parseFloat(s.borderLeftWidth) >= 2 && parseFloat(s.borderTopWidth) < 1) add(e, 'left border');
        }
        return out;
      });
      let n = 0;
      const seen = new Set();
      const perKind = new Map();
      for (const b of boxes) {
        if (n >= o.max) break;
        const k0 = b.kind.replace(/ [\d.]+:1$/, '');
        if ((perKind.get(k0) || 0) >= 6) continue;
        perKind.set(k0, (perKind.get(k0) || 0) + 1);
        const key = `${b.kind}:${Math.round(b.x)}:${Math.round(b.y)}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const pad = 24;
        const clip = { x: Math.max(0, b.x - pad), y: Math.max(0, b.y - pad), width: Math.min(1440, b.w + pad * 2), height: Math.min(1400, b.h + pad * 2) };
        const file = `${String(++n).padStart(2, '0')}-${b.kind.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.png`;
        await p.screenshot({ path: join(dir, file), clip, fullPage: true }).catch(() => { n--; });
        index.push(`- \`${file}\`: ${b.kind}: "${b.text.replace(/\s+/g, ' ')}"`);
      }
    }
    await ctx.close();
  }
} finally {
  await browser.close();
}
await writeFile(join(dir, 'index.md'), index.join('\n') + '\n');
console.log(join(dir, 'index.md'));
