// Hard rules: patterns that read as AI-made even on otherwise careful pages (fonts agents always pick,
// hero numbers, captions under everything, paper props, stamps, emoji, faded support text, the
// heading-plus-grey-subtitle pattern, rainbow tiles, floating chat pills). Same contract as rules.mjs.
// Page checks are serialised: keep them self-contained; the font list is injected as a literal below.
import { AI_DEFAULT_LIST } from './ai-default-fonts.mjs';
import { USED_PAIRINGS } from './used-type.mjs';

const BOTH = ['desktop', 'mobile'];
const FONT_LIST = JSON.stringify(AI_DEFAULT_LIST);

const fontCheck = new Function('h', `
  const list = ${FONT_LIST};
  const brief = (document.querySelector('meta[name="unslop-brief"]') || {}).content || '';
  const justified = (fam) => brief.split(/;\\s*/).some((p) => { const m = p.match(/^font:\\s*([^,]+),\\s*(.{20,})$/i); return m && m[1].trim().toLowerCase() === fam; });
  const texts = h.textEls();
  const biggest = texts.reduce((a, e) => (h.px(h.cs(e).fontSize) > (a ? h.px(h.cs(a).fontSize) : 0) ? e : a), null);
  const out = [];
  const seen = new Set();
  for (const el of [document.body, document.querySelector('h1'), document.querySelector('h2'), biggest].filter(Boolean)) {
    const first = h.cs(el).fontFamily.split(',')[0].replace(/["']/g, '').trim().toLowerCase();
    if (!list.includes(first) || seen.has(first) || justified(first)) continue;
    seen.add(first);
    out.push({ el: h.sel(el), detail: first });
  }
  return out;
`);

const pairCheck = new Function('h', `
  const used = ${JSON.stringify(USED_PAIRINGS)};
  const brief = (document.querySelector('meta[name="unslop-brief"]') || {}).content || '';
  const justified = (fam) => brief.split(/;\\s*/).some((p) => { const m = p.match(/^font:\\s*([^,]+),\\s*(.{20,})$/i); return m && m[1].trim().toLowerCase() === fam; });
  const first = (el) => h.cs(el).fontFamily.split(',')[0].replace(/["']/g, '').trim().toLowerCase();
  const texts = h.textEls();
  const biggest = texts.reduce((a, e) => (h.px(h.cs(e).fontSize) > (a ? h.px(h.cs(a).fontSize) : 0) ? e : a), null);
  const head = document.querySelector('h1') || biggest;
  if (!head) return [];
  const d = first(head), t = first(document.body);
  const hit = used.find((u) => u.display === d && u.text === t);
  if (!hit || justified(d)) return [];
  return [{ el: h.sel(head), detail: d + ' + ' + t + ' (already used: ' + hit.where + ')' }];
`);

export const HARD = [
  {
    id: 'type-ai-default-font', pass: 'typography', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'AI-default font',
    why: 'Display serifs and text faces that agents pick by reflex (the list in references/ai-default-fonts.md) make every generated page sound the same.',
    fix: 'Choose a face for this project and write why in the brief. To keep a listed face on purpose, add <meta name="unslop-brief" content="font: Family, reason">.',
    check: fontCheck,
  },
  {
    id: 'type-house-pairing', pass: 'typography', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Same type pairing as a previous project',
    why: 'Reusing the display and text pairing of the repo examples (or of your previous project) is a house style: every page starts to look like the last one, whatever the mood.',
    fix: 'Pick a recipe from type/ that matches the brief\'s mood words and is not in scripts/lib/used-type.mjs; write its id and reason in the brief. To keep the pairing for a real project reason, add <meta name="unslop-brief" content="font: Family, reason">.',
    check: pairCheck,
  },
  {
    id: 'type-hero-number', pass: 'typography', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Giant display number',
    why: 'A figure set at display size on its own ("€18,460", "99.9%") is the stock dashboard and landing move; size replaces meaning.',
    fix: 'Put the number in a sentence with its comparison and date, at heading size, or chart it.',
    check: (h) => h.textEls().filter((e) => {
      const t = h.own(e);
      return t.length <= 14 && /\d/.test(t) && /^[\s€$£¥+\-−]*[\d.,:\s]+\s*[%kKmMxX+]?$/.test(t) && h.px(h.cs(e).fontSize) >= 40;
    }).map((e) => ({ el: h.sel(e), detail: `"${h.own(e)}" at ${h.px(h.cs(e).fontSize)}px` })),
  },
  {
    id: 'copy-caption-sprawl', pass: 'copy', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Captions under everything',
    why: 'A small grey explanation under every block and visual, or the same "example data" note repeated, is filler that makes the page read as generated.',
    fix: 'Let headings and visuals speak. Keep one honest example-data note per page (footer or one corner), not one per element.',
    check: (h) => {
      const out = [];
      const notes = h.textEls().filter((e) => /\b(example|sample|illustrative|made[- ]up|fictional|demo)\b[^.]{0,40}\b(data|names?|amounts?|numbers?|figures?|invoices?|clients?)\b|\b(names?|amounts?|numbers?|data)\b[^.]{0,30}\bare (samples?|examples?|made up)\b/i.test(h.own(e)));
      if (notes.length >= 2) for (const e of notes) out.push({ el: h.sel(e), detail: `example note: "${h.snip(h.own(e), 40)}"` });
      const body = h.bodySize();
      const caps = h.textEls().filter((e) => {
        const s = h.cs(e);
        if (h.px(s.fontSize) > Math.min(14, body)) return false;
        if (h.own(e).split(/\s+/).length < 4 || !['P', 'FIGCAPTION', 'SPAN', 'DIV', 'SMALL'].includes(e.tagName)) return false;
        if (e.closest('a, button, label, td, th, li, nav, footer, summary')) return false;
        const prev = e.previousElementSibling;
        return !!prev && (h.heading(prev) || ['IMG', 'SVG', 'CANVAS', 'TABLE', 'FIGURE', 'VIDEO'].includes(prev.tagName.toUpperCase()) || h.isCard(prev));
      });
      if (caps.length >= 3) for (const e of caps.slice(0, 6)) out.push({ el: h.sel(e), detail: `caption: "${h.snip(h.own(e), 40)}"` });
      return out;
    },
  },
  {
    id: 'detail-paper-props', pass: 'detail', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Paper props as decoration',
    why: 'Cream paper cards, letter stacks, receipts, notebook rules and newsprint on a screen product are a costume, not the product.',
    fix: 'Show the real interface surfaces of the product in its own colours. Drop ruled-paper backgrounds and cream sheets laid on a dark stage.',
    check: (h) => {
      const out = [];
      const page = h.bgOf(document.body) || { r: 255, g: 255, b: 255 };
      const darkPage = h.lum(page) < 0.1;
      const papers = h.all().filter((e) => {
        if (!h.isCard(e)) return false;
        const c = h.rgba(h.cs(e).backgroundColor);
        if (!c || c.a < 0.9) return false;
        const k = h.hsl(c);
        return k.h >= 25 && k.h <= 60 && k.s >= 0.12 && k.l >= 0.84 && k.l <= 0.97;
      });
      if (papers.length >= 2 && (darkPage || papers.length >= 4)) for (const e of papers.slice(0, 6)) out.push({ el: h.sel(e), detail: 'cream paper card' });
      for (const e of [document.body, ...h.all()]) {
        const bi = h.cs(e).backgroundImage;
        if (/repeating-linear-gradient\((180deg|0deg|to bottom|to top)/.test(bi) && h.rect(e).height > 200) out.push({ el: h.sel(e), detail: 'ruled paper lines' });
      }
      return out;
    },
  },
  {
    id: 'copy-emoji', pass: 'copy', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Emoji in the page',
    why: 'Emoji in headings, buttons, labels or body copy are the most visible AI tell.',
    fix: 'Remove them. Use words, or one icon set drawn for the product. Keep emoji only if the brief says the user asked for them (<meta name="unslop-brief" content="emoji: reason">).',
    check: (h) => {
      const brief = (document.querySelector('meta[name="unslop-brief"]') || {}).content || '';
      if (/(^|;\s*)emoji:\s*.{10,}/i.test(brief)) return [];
      return h.textEls().filter((e) => /\p{Extended_Pictographic}/u.test(h.own(e).replace(/[©®™]/g, ''))).map((e) => ({ el: h.sel(e), detail: h.snip(h.own(e), 30) }));
    },
  },
  {
    id: 'color-faded-text', pass: 'color', severity: 'major', scope: 'page', viewports: BOTH,
    title: 'Faded support text',
    why: 'Light grey support text that passes the bare minimum still reads as faded; it is the "muted subtitle" look of generated pages and tires the eye.',
    fix: 'Readable text at 7:1 or more (4.5:1 from 24 px up). Rank with size and weight, not by greying text out.',
    check: (h) => {
      const out = [];
      for (const el of h.textEls()) {
        const t = h.own(el);
        if (t.length < 16 || el.closest('[aria-hidden=true], [disabled], [aria-disabled=true], a, button, [role=button]')) continue;
        const s = h.cs(el);
        const fg = h.rgba(s.color), bg = h.bgOf(el);
        if (!fg || !bg || fg.a < 0.99) continue;
        const size = h.px(s.fontSize);
        const r = h.contrast(fg, bg);
        if (r < (size >= 24 ? 4.5 : 7)) out.push({ el: h.sel(el), detail: `${r.toFixed(2)}:1 "${h.snip(t, 30)}"` });
      }
      return out.length >= 2 ? out : [];
    },
  },
  {
    id: 'type-heading-muted-subtitle', pass: 'typography', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Heading plus grey subtitle, section after section',
    why: 'A heading followed by a smaller, greyed paragraph in every section is the template rhythm of generated landing pages.',
    fix: 'Let the section open with its content (a product view, a table, a list) or write one sentence in the main text colour. Vary how sections start.',
    check: (h) => {
      const out = [];
      for (const hd of document.querySelectorAll('h1, h2, h3')) {
        if (!h.visible(hd)) continue;
        let p = hd.nextElementSibling;
        if (p && p.tagName !== 'P') p = null;
        if (!p || !h.visible(p) || h.own(p).length < 30) continue;
        const bg = h.bgOf(p), hc = h.rgba(h.cs(hd).color), pc = h.rgba(h.cs(p).color);
        if (!bg || !hc || !pc) continue;
        const muted = h.contrast(pc, bg) < h.contrast(hc, bg) * 0.8 && h.px(h.cs(p).fontSize) < h.px(h.cs(hd).fontSize);
        if (muted) out.push({ el: `${h.sel(hd)} + ${h.sel(p)}`, detail: `"${h.snip(hd.textContent.trim(), 30)}" with a greyed subtitle` });
      }
      return out.length >= 2 ? out : [];
    },
  },
  {
    id: 'detail-stamp-sticker', pass: 'detail', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Stamps and tilted stickers',
    why: 'Rubber stamps ("Paid", "Approved"), tilted badges and rotated sticker cards are props that stand in for real state.',
    fix: 'Show state as text plus colour in the interface itself, upright. Remove rotation from cards and labels.',
    check: (h) => {
      const angleOf = (s) => {
        let a = 0;
        if (s.rotate && s.rotate !== 'none') a += parseFloat(s.rotate) || 0;
        const m = s.transform && s.transform !== 'none' ? s.transform.match(/matrix\(([^)]+)\)/) : null;
        if (m) { const [x, y] = m[1].split(',').map(parseFloat); a += Math.atan2(y, x) * 180 / Math.PI; }
        return a;
      };
      const out = [];
      for (const e of h.all()) {
        if (!(e.textContent || '').trim() || e.closest('[role=img] svg')) continue;
        const a = angleOf(h.cs(e));
        if (Math.abs(a) >= 1.5 && Math.abs(a) <= 30) { out.push({ el: h.sel(e), detail: `rotated ${a.toFixed(1)}deg: "${h.snip(e.textContent.trim(), 24)}"` }); continue; }
        const t = h.own(e);
        const s = h.cs(e);
        if (/^(paid|approved|verified|certified|sold|void|rejected|confidential|sale|new|official)\b/i.test(t) && t.length <= 24 && h.px(s.borderTopWidth) >= 2 && s.borderTopStyle !== 'none') out.push({ el: h.sel(e), detail: `stamp: "${t}"` });
      }
      return out;
    },
  },
  {
    id: 'color-rainbow-tiles', pass: 'color', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Every tile a different bright colour',
    why: 'A grid where each card gets its own saturated fill or gradient turns the page into a sweet shop; nothing ranks and the brand has no colour.',
    fix: 'One surface colour for all tiles; let one accent mark the primary or selected tile.',
    check: (h) => {
      const out = [];
      for (const p of h.all()) {
        const kids = [...p.children].filter((k) => h.visible(k) && h.isCard(k));
        if (kids.length < 4) continue;
        const hues = new Set();
        let painted = 0;
        for (const k of kids) {
          const s = h.cs(k);
          const cs = [s.backgroundColor, ...h.colorTokens(s.backgroundImage)].map((t) => h.rgba(t)).filter((c) => h.saturated(c));
          if (cs.length) { painted++; hues.add(Math.round(h.hsl(cs[0]).h / 40)); }
        }
        if (painted >= 4 && hues.size >= 3) out.push({ el: h.sel(p), detail: `${painted} painted tiles in ${hues.size} hue bands` });
      }
      return out;
    },
  },
  {
    id: 'detail-floating-chat', pass: 'detail', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Floating chat or support pill',
    why: 'A fixed bubble in the corner ("Live support", a chat icon) covers content and is a template default.',
    fix: 'Put help in the navigation or the footer. If live chat is real, open it from a quiet button the user asks for.',
    check: (h) => h.all().filter((e) => {
      const s = h.cs(e);
      if (s.position !== 'fixed') return false;
      const r = h.rect(e);
      return r.bottom > h.vh - 160 && (r.right > h.vw - 160 || r.left < 160) && r.width < 360 && /(chat|support|help|destek|canlı|live|💬)/i.test(e.textContent || '');
    }).map((e) => ({ el: h.sel(e), detail: h.snip((e.textContent || '').trim(), 30) })),
  },
];
