// Rule catalogue. One entry per detectable slop tell.
//   scope 'page': check(h) runs inside the rendered page (see helpers.mjs) and returns [{el, detail}]
//   scope 'css' : check(css, html) runs in Node on the stylesheet text and returns [{el, detail}]
// Page checks are serialised with toString(): keep them self-contained and written as arrow properties.
// Passes (fix order): spacing, color, icons, copy, typography, layout, detail, imagery, motion.

export const PASSES = ['spacing', 'color', 'icons', 'copy', 'typography', 'layout', 'detail', 'imagery', 'motion'];
export const WEIGHTS = { critical: 12, major: 6, minor: 2 };
const BOTH = ['desktop', 'mobile'];

export const RULES = [
  // ---------------------------------------------------------------- spacing
  {
    id: 'spacing-off-grid', pass: 'spacing', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Padding and gaps ignore a 4 px rhythm',
    why: 'Values like 13, 18 or 22 px show that spacing was typed, not chosen from a scale.',
    fix: 'Pick a 4 px scale (4, 8, 12, 16, 24, 32, 48, 64) and snap every padding and gap to the nearest step.',
    check: (h) => {
      const bad = [];
      let total = 0;
      for (const el of h.all()) {
        const s = h.cs(el);
        for (const p of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'rowGap', 'columnGap']) {
          const v = h.px(s[p]);
          if (v <= 2) continue;
          total++;
          if (Math.abs(v / 4 - Math.round(v / 4)) > 0.01) bad.push({ el: h.sel(el), detail: `${p} ${+v.toFixed(1)}px` });
        }
      }
      return total >= 10 && bad.length >= 8 && bad.length / total > 0.35 ? bad.slice(0, 8) : [];
    },
  },
  {
    id: 'spacing-cramped', pass: 'spacing', severity: 'minor', scope: 'page', viewports: BOTH,
    title: 'Text sits against the edge of its box',
    why: 'Buttons and cards with almost no inner padding read as unfinished.',
    fix: 'Give buttons at least 12 px horizontal and 8 px vertical padding (anything under 8 px horizontal is flagged), cards at least 16 px.',
    check: (h) => {
      const out = [];
      for (const el of h.textEls()) {
        const s = h.cs(el);
        const bg = h.rgba(s.backgroundColor);
        const sides = ['Top', 'Right', 'Bottom', 'Left'].filter((d) => h.px(s['border' + d + 'Width']) >= 1 && s['border' + d + 'Style'] !== 'none').length;
        const hasBox = (bg && bg.a > 0.05) || sides >= 3;
        if (!hasBox || s.display === 'inline') continue;
        const pl = h.px(s.paddingLeft), pr = h.px(s.paddingRight), pt = h.px(s.paddingTop), pb = h.px(s.paddingBottom);
        const isCtl = ['BUTTON', 'A', 'INPUT'].includes(el.tagName) || el.getAttribute('role') === 'button';
        const long = h.own(el).length >= 12;
        if (!isCtl && !long) continue;
        const bad = isCtl ? pl < 8 || pr < 8 || pt < 4 || pb < 4 : Math.min(pl, pr, pt, pb) < 8;
        if (bad) out.push({ el: h.sel(el), detail: `padding ${pt}/${pr}/${pb}/${pl}px` });
      }
      return out;
    },
  },

  // ------------------------------------------------------------------ color
  {
    id: 'color-purple-gradient', pass: 'color', severity: 'critical', scope: 'page', viewports: ['desktop'],
    title: 'Violet / indigo gradient',
    why: 'The purple-to-blue gradient is the most recognisable AI-product colour move.',
    fix: 'Replace with one flat brand colour. If depth is needed, use a surface step and a 1 px line, not a gradient.',
    check: (h) => {
      const out = [];
      for (const el of h.all()) {
        const bi = h.cs(el).backgroundImage;
        if (!/gradient\(/.test(bi)) continue;
        const stops = h.colorTokens(bi).map((t) => h.rgba(t)).filter((c) => c && c.a > 0.05).map((c) => h.hsl(c));
        const violet = stops.some((c) => c.h >= 245 && c.h <= 320 && c.s > 0.3 && c.l > 0.15 && c.l < 0.85);
        if (violet && stops.length >= 2) out.push({ el: h.sel(el), detail: h.snip(bi, 80) });
      }
      return out;
    },
  },
  {
    id: 'color-gradient-text', pass: 'color', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Gradient-filled text',
    why: 'Headings or numbers clipped to a colour ramp are a stock "AI landing" signature.',
    fix: 'Set the text in one solid colour; emphasise with size, weight or position instead.',
    check: (h) =>
      h.textEls().filter((el) => {
        const s = h.cs(el);
        return (s.webkitBackgroundClip === 'text' || s.backgroundClip === 'text') && /gradient\(/.test(s.backgroundImage);
      }).map((el) => ({ el: h.sel(el), detail: h.snip(h.own(el)) })),
  },
  {
    id: 'color-glow', pass: 'color', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Coloured glow shadow',
    why: 'Large zero-offset shadows in a saturated colour fake "energy" and hurt legibility.',
    fix: 'Use a neutral, low-alpha shadow with a real offset, or no shadow and a 1 px border.',
    check: (h) => {
      const out = [];
      for (const el of h.all()) {
        const s = h.cs(el);
        for (const prop of ['boxShadow', 'textShadow']) {
          const v = s[prop];
          if (!v || v === 'none') continue;
          for (const part of v.split(/,(?![^(]*\))/)) {
            const tok = h.colorTokens(part)[0];
            const nums = (part.replace(tok || '', '').match(/-?\d+(\.\d+)?px/g) || []).map(parseFloat);
            if (!tok || nums.length < 3) continue;
            const c = h.rgba(tok);
            const k = h.hsl(c);
            if (c.a >= 0.15 && k.s > 0.4 && k.l > 0.2 && k.l < 0.85 && Math.abs(nums[0]) <= 2 && Math.abs(nums[1]) <= 8 && nums[2] >= 24)
              out.push({ el: h.sel(el), detail: `${prop} ${h.snip(part, 60)}` });
          }
        }
      }
      return out;
    },
  },
  {
    id: 'color-low-contrast', pass: 'color', severity: 'major', scope: 'page', viewports: BOTH,
    title: 'Text below WCAG contrast',
    why: 'Grey-on-tint and pale-on-white text fails readers and audits alike.',
    fix: 'Darken the text (or lighten the surface) until body text reaches 4.5:1 and large text 3:1.',
    check: (h) => {
      const out = [];
      for (const el of h.textEls()) {
        const s = h.cs(el);
        const fg = h.rgba(s.color);
        const bg = h.bgOf(el);
        if (!fg || !bg || fg.a < 0.99) continue;
        const size = h.px(s.fontSize);
        const large = size >= 24 || (size >= 18.66 && h.px(s.fontWeight) >= 700);
        const ratio = h.contrast(fg, bg);
        if (ratio < (large ? 3 : 4.5)) out.push({ el: h.sel(el), detail: `${ratio.toFixed(2)}:1 "${h.snip(h.own(el), 30)}"` });
      }
      return out;
    },
  },
  {
    id: 'color-framework-default', pass: 'color', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Stock framework palette',
    why: 'Untouched indigo/violet/slate swatches from popular utility palettes make unrelated products look alike.',
    fix: 'Derive the palette from the brand: one accent chosen on purpose, neutrals tinted toward it.',
    check: (h) => {
      const stock = new Set(['#6366f1', '#4f46e5', '#818cf8', '#8b5cf6', '#7c3aed', '#a78bfa', '#a855f7', '#9333ea', '#d946ef', '#3b82f6', '#0f172a', '#1e293b', '#111827']);
      const hits = new Map();
      for (const el of h.all()) {
        const s = h.cs(el);
        const toks = [s.color, s.backgroundColor, s.borderTopColor, ...h.colorTokens(s.backgroundImage)];
        for (const t of toks) {
          const c = h.rgba(t);
          if (c && c.a > 0.9 && stock.has(h.hex(c))) hits.set(h.hex(c), h.sel(el));
        }
      }
      return hits.size >= 2 ? [...hits].map(([k, v]) => ({ el: v, detail: k })) : [];
    },
  },

  // ------------------------------------------------------------------ icons
  {
    id: 'icon-tile', pass: 'icons', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Icon in a rounded coloured tile, repeated',
    why: 'A tinted square with a glyph above a heading is the default feature-card opener.',
    fix: 'Drop the tile. Use a bare icon at one size, or no icon and let the heading carry the card.',
    check: (h) => {
      const tiles = h.all().filter((el) => {
        const r = h.rect(el);
        if (r.width < 28 || r.width > 72 || Math.abs(r.width - r.height) > 6) return false;
        const s = h.cs(el);
        const bg = h.rgba(s.backgroundColor);
        if (!(bg && bg.a > 0.05) && !/gradient/.test(s.backgroundImage)) return false;
        if (h.px(s.borderTopLeftRadius) < 6) return false;
        const hasIcon = el.querySelector('svg, img, i') || /^\p{Extended_Pictographic}/u.test(h.own(el));
        return !!hasIcon && h.own(el).length <= 3;
      });
      return tiles.length >= 3 ? tiles.map((e) => ({ el: h.sel(e), detail: 'icon tile' })) : [];
    },
  },
  {
    id: 'icon-emoji-ui', pass: 'icons', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Emoji used as interface icons',
    why: 'Emoji in headings, buttons and list items render differently per platform and signal a quick draft.',
    fix: 'Use one consistent line-icon set (one size, one stroke width) or remove the glyph.',
    check: (h) => {
      const out = [];
      for (const el of h.textEls()) {
        const t = h.own(el).replace(/[©®™]/g, '');
        if (!/\p{Extended_Pictographic}/u.test(t)) continue;
        if (h.heading(el) || ['BUTTON', 'A', 'LI', 'LABEL', 'SPAN', 'P', 'DIV'].includes(el.tagName)) out.push({ el: h.sel(el), detail: h.snip(t, 30) });
      }
      return out.length >= 2 ? out : [];
    },
  },

  // ------------------------------------------------------------------- copy
  {
    id: 'copy-cliche', pass: 'copy', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Stock marketing vocabulary',
    why: 'Words such as "seamless", "elevate" or "unleash" carry no information and mark the text as generated.',
    fix: 'Say the concrete thing: what the product does, for whom, with what number or example.',
    check: (h) => {
      const re = /\b(elevate[sd]?|seamless(ly)?|unleash(es|ed)?|supercharge[sd]?|turbocharge[sd]?|next-?gen(eration)?|cutting-?edge|game-?chang(er|ing)|revolutioni[sz]e[sd]?|effortless(ly)?|unlock the power|to the next level|streamline[sd]?|delve|tapestry|harness the power|in today'?s fast-?paced|all-in-one|one-stop|leverag(e|ing)|empower(s|ing)?|reimagine[sd]?|world-?class|state-of-the-art|best-in-class|future-?proof|robust)\b/i;
      const out = [];
      let inHeading = false;
      for (const el of h.textEls()) {
        const m = h.own(el).match(re);
        if (m) {
          out.push({ el: h.sel(el), detail: `"${m[0]}"` });
          if (h.heading(el)) inHeading = true;
        }
      }
      return inHeading || out.length >= 2 ? out : [];
    },
  },
  {
    id: 'copy-contrast-formula', pass: 'copy', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: '"Not X, but Y" headline formula',
    why: 'Defining the product by what it is not ("not just a tool, it\'s a partner") is a reflex of generated copy.',
    fix: 'State the claim directly: say what it is and what the reader gets.',
    check: (h) => {
      const res = [
        /\b(not|isn['’]t|aren['’]t|no longer)\b[^.!?\n]{0,60}[,—–-]\s*(it['’]s|its|but|they['’]re|we['’]re|this is)\b/i,
        /\bnot just\b/i,
        /\b(it['’]s|this is|that['’]s) not\b[^.]{0,60}\.\s*(it['’]s|this is|that['’]s)\b/i,
        /^no [^.]{2,30}\.\s*no [^.]{2,30}\./i,
        /\bstop [^.]{2,40}\.\s*start\b/i,
      ];
      const out = [];
      let inHeading = false;
      for (const el of h.textEls()) {
        const t = h.own(el);
        if (res.some((r) => r.test(t))) {
          out.push({ el: h.sel(el), detail: h.snip(t, 70) });
          if (h.heading(el)) inHeading = true;
        }
      }
      return inHeading || out.length >= 2 ? out : [];
    },
  },
  {
    id: 'copy-em-dash', pass: 'copy', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Em dashes scattered through the copy',
    why: 'Three or more em dashes on one page is a frequent sign of generated prose.',
    fix: 'Split the sentence, or use a comma, colon or full stop.',
    check: (h) => {
      const hits = h.textEls().filter((el) => /—/.test(h.own(el)));
      const n = hits.reduce((a, el) => a + (h.own(el).match(/—/g) || []).length, 0);
      return n >= 3 ? hits.map((el) => ({ el: h.sel(el), detail: h.snip(h.own(el), 50) })) : [];
    },
  },
  {
    id: 'copy-trailing-period', pass: 'copy', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Full stops on short UI text',
    why: 'Headings, buttons and labels do not end in a full stop; paragraphs do.',
    fix: 'Remove the final full stop from headings, buttons, labels and captions of one sentence.',
    check: (h) => {
      const out = [];
      for (const el of h.textEls()) {
        if (!(h.heading(el) || ['BUTTON', 'LABEL', 'TH', 'FIGCAPTION'].includes(el.tagName) || (el.tagName === 'A' && el.closest('nav')))) continue;
        const t = h.own(el);
        if (/\.$/.test(t) && !/\.\s/.test(t) && !/\.\.\.$/.test(t) && t.split(' ').length <= 10) out.push({ el: h.sel(el), detail: h.snip(t, 50) });
      }
      return out.length >= 2 ? out : [];
    },
  },
  {
    id: 'copy-greeting', pass: 'copy', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Greeting as a page heading',
    why: '"Welcome back, Sam" names no context; the heading should say what this screen is.',
    fix: 'Name the content ("This month\'s scans"), not the visitor.',
    check: (h) =>
      h.textEls().filter((el) => h.heading(el) && /^(welcome( back)?|hi|hello|hey|good (morning|afternoon|evening))\b[ ,!]/i.test(h.own(el)))
        .map((el) => ({ el: h.sel(el), detail: h.snip(h.own(el), 50) })),
  },
  {
    id: 'copy-placeholder', pass: 'copy', severity: 'critical', scope: 'page', viewports: ['desktop'],
    title: 'Placeholder or filler text left in',
    why: 'Lorem ipsum, "Acme", "John Doe" and [bracketed] gaps show the page was never finished.',
    fix: 'Write the real text, or remove the block. Never ship a stand-in name.',
    check: (h) => {
      const re = /lorem ipsum|dolor sit amet|\b(john|jane) (doe|smith)\b|\bacme\b|\bnexus (ai|labs)\b|your company|company name|\[[A-Za-z][^\]]{2,30}\]|user@example\.com|\b(sarah|alex) johnson\b/i;
      return h.textEls().filter((el) => re.test(h.own(el))).map((el) => ({ el: h.sel(el), detail: h.snip(h.own(el), 50) }));
    },
  },
  {
    id: 'copy-unverified-proof', pass: 'copy', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Social proof with no source',
    why: 'Round user counts, star scores and "trusted by" lines that cannot be checked read as invented.',
    fix: 'Cite the source and date, link to the real logo or review, or delete the claim.',
    check: (h) => {
      const res = [
        /\b(trusted|loved|used|chosen) by\b[^.]{0,40}\d/i,
        /\b\d[\d,.]*\s?[kKmM]?\+\s+(happy |active |paying )?(teams|users|customers|companies|developers|creators|businesses)\b/i,
        /\b(4\.[5-9]|5\.0)\s?(\/\s?5|stars?|★)/i,
        /★{4,}/,
      ];
      const sourced = /\b(source|as of|according to|per the|survey|review on|g2|capterra|trustpilot)\b|\b20\d\d\b/i;
      return h.textEls().filter((el) => {
        const t = h.own(el) + ' ' + (el.parentElement ? h.own(el.parentElement) : '');
        return res.some((r) => r.test(h.own(el))) && !sourced.test(t);
      }).map((el) => ({ el: h.sel(el), detail: h.snip(h.own(el), 60) }));
    },
  },

  // ------------------------------------------------------------- typography
  {
    id: 'type-reflex-font', pass: 'typography', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Reflex font family',
    why: 'Inter, Poppins, Space Grotesk and a few others are what models pick without a reason.',
    fix: 'Choose a family on purpose and write the reason in DESIGN.md. A system stack is better than an unexamined default.',
    check: (h) => {
      const reflex = ['inter', 'roboto', 'open sans', 'poppins', 'dm sans', 'space grotesk', 'outfit', 'plus jakarta sans', 'instrument sans', 'instrument serif', 'fraunces', 'playfair display', 'syne', 'montserrat', 'jetbrains mono', 'space mono'];
      const out = [];
      for (const el of [document.body, document.querySelector('h1')].filter(Boolean)) {
        const first = h.cs(el).fontFamily.split(',')[0].replace(/["']/g, '').trim().toLowerCase();
        if (reflex.includes(first)) out.push({ el: h.sel(el), detail: first });
      }
      return out;
    },
  },
  {
    id: 'type-flat-hierarchy', pass: 'typography', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Flat type hierarchy',
    why: 'When the largest text is barely bigger than body text, nothing leads the eye.',
    fix: 'Set a scale with clear steps: at least 2x between page title and body, and visible steps between heading levels.',
    check: (h) => {
      const els = h.textEls();
      if (els.length < 12) return [];
      const weight = new Map();
      let max = 0, maxEl = null;
      for (const el of els) {
        const fs = Math.round(h.px(h.cs(el).fontSize));
        weight.set(fs, (weight.get(fs) || 0) + h.own(el).length);
        if (fs > max) { max = fs; maxEl = el; }
      }
      const body = [...weight].sort((a, b) => b[1] - a[1])[0][0];
      const out = [];
      if (max / body < 2) out.push({ el: h.sel(maxEl), detail: `largest ${max}px vs body ${body}px (ratio ${(max / body).toFixed(2)})` });
      const hs = ['h1', 'h2', 'h3'].map((t) => Math.max(0, ...[...document.querySelectorAll(t)].filter(h.visible).map((e) => h.px(h.cs(e).fontSize)))).filter((v) => v > 0);
      for (let i = 1; i < hs.length; i++) if (hs[i - 1] / hs[i] < 1.15) out.push({ el: `h${i}->h${i + 1}`, detail: `${hs[i - 1]}px to ${hs[i]}px` });
      return out;
    },
  },
  {
    id: 'type-eyebrow', pass: 'typography', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Eyebrow label above the heading',
    why: 'A small, spaced, uppercase tag above every heading is a template habit.',
    fix: 'Delete it, or fold the information into the heading. Keep at most one, and only if it carries a fact.',
    check: (h) => {
      const out = [];
      for (const el of h.textEls()) {
        const s = h.cs(el);
        const t = h.own(el);
        const upper = s.textTransform === 'uppercase' || (t.length >= 3 && t === t.toUpperCase() && /[A-Z]{3}/.test(t));
        const fs = h.px(s.fontSize);
        const ls = h.px(s.letterSpacing);
        if (!upper || fs > 14 || ls < fs * 0.06 || h.heading(el)) continue;
        let next = el.nextElementSibling;
        if (!next && el.parentElement && el.parentElement.children.length === 1) next = el.parentElement.nextElementSibling;
        if (next && /^H[1-3]$/.test(next.tagName) && h.rect(next).top - h.rect(el).bottom < 90) out.push({ el: h.sel(el), detail: h.snip(t, 30) });
      }
      return out;
    },
  },
  {
    id: 'type-tight-leading', pass: 'typography', severity: 'minor', scope: 'page', viewports: BOTH,
    title: 'Body text set too tight',
    why: 'Multi-line paragraphs under 1.3 line-height, or letter-spacing below -0.04em, are hard to read.',
    fix: 'Body line-height 1.5 to 1.7; keep tight leading for headings only and never track tighter than -0.03em.',
    check: (h) => {
      const out = [];
      for (const el of h.textEls()) {
        const s = h.cs(el);
        const fs = h.px(s.fontSize);
        const lh = s.lineHeight === 'normal' ? fs * 1.2 : h.px(s.lineHeight);
        const lines = h.rect(el).height / lh;
        if (!h.heading(el) && h.own(el).length >= 60 && lines >= 2 && lh / fs < 1.3) out.push({ el: h.sel(el), detail: `line-height ${(lh / fs).toFixed(2)}` });
        if (h.px(s.letterSpacing) < -0.04 * fs && fs > 0) out.push({ el: h.sel(el), detail: `letter-spacing ${(h.px(s.letterSpacing) / fs).toFixed(3)}em` });
      }
      return out;
    },
  },
  {
    id: 'type-long-measure', pass: 'typography', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Line length above 85 characters',
    why: 'Very long lines make the eye lose its place.',
    fix: 'Cap running text at 60 to 75 characters (max-width: 65ch).',
    check: (h) => {
      const out = [];
      for (const el of h.textEls()) {
        const t = h.own(el);
        if (t.length < 160 || h.heading(el)) continue;
        const s = h.cs(el);
        const fs = h.px(s.fontSize);
        const lh = s.lineHeight === 'normal' ? fs * 1.2 : h.px(s.lineHeight);
        const lines = Math.max(1, Math.round(h.rect(el).height / lh));
        if (lines >= 2 && t.length / lines > 85) out.push({ el: h.sel(el), detail: `${Math.round(t.length / lines)} chars per line` });
      }
      return out;
    },
  },
  {
    id: 'type-heavy-weight', pass: 'typography', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Heavy weights carry the hierarchy',
    why: 'Weights of 800 to 900, or bold on most text, flatten emphasis. Hierarchy should come from size and colour.',
    fix: 'Use 400 and 500 (600 sparingly). Let size and tone do the ranking.',
    check: (h) => {
      const els = h.textEls();
      const heavy = els.filter((e) => h.px(h.cs(e).fontWeight) >= 800);
      if (heavy.length >= 3) return heavy.map((e) => ({ el: h.sel(e), detail: `weight ${h.cs(e).fontWeight}` }));
      const bold = els.filter((e) => h.px(h.cs(e).fontWeight) >= 700);
      return els.length >= 12 && bold.length >= 8 && bold.length / els.length > 0.5 ? bold.map((e) => ({ el: h.sel(e), detail: 'weight 700+' })) : [];
    },
  },

  // ----------------------------------------------------------------- layout
  {
    id: 'layout-nested-cards', pass: 'layout', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Card inside a card',
    why: 'Boxes within boxes add borders and shadows but no information.',
    fix: 'Keep one container. Group inside it with spacing, a divider or a heading.',
    check: (h) => {
      const cards = h.all().filter((e) => h.isCard(e));
      const out = [];
      for (const c of cards) {
        const parent = cards.find((p) => p !== c && p.contains(c));
        if (parent) out.push({ el: `${h.sel(parent)} > ${h.sel(c)}`, detail: 'nested card' });
      }
      return out;
    },
  },
  {
    id: 'layout-identical-cards', pass: 'layout', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Row of identical icon + title + text cards',
    why: 'Three or four same-size feature cards in a row say nothing about which point matters.',
    fix: 'Rank the points: one larger block for the main idea, the rest as a list or table.',
    check: (h) => {
      const out = [];
      for (const p of h.all()) {
        const kids = [...p.children].filter((k) => h.visible(k));
        if (kids.length < 3 || kids.length > 6) continue;
        const r0 = h.rect(kids[0]);
        if (!kids.every((k) => Math.abs(h.rect(k).width - r0.width) <= 2 && Math.abs(h.rect(k).height - r0.height) <= 2)) continue;
        const full = kids.every((k) => {
          const icon = k.querySelector('svg, img, i') || /^\p{Extended_Pictographic}/u.test((k.textContent || '').trim());
          const title = k.querySelector('h2, h3, h4, h5, h6, strong, b');
          const text = k.querySelector('p');
          return icon && title && text;
        });
        if (full) out.push({ el: h.sel(p), detail: `${kids.length} identical cards` });
      }
      return out;
    },
  },
  {
    id: 'layout-stat-strip', pass: 'layout', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Row of big numbers with small labels',
    why: 'A strip of three or four headline metrics without a comparison is the standard hero-metric template.',
    fix: 'Show one number that matters most, with its comparison base and date; move the rest into a table or chart.',
    check: (h) => {
      const numRe = /^[\s$€£]?[\d.,]+\s?[%+kKmMxX]*\+?$/;
      const out = [];
      for (const p of h.all()) {
        const kids = [...p.children].filter((k) => h.visible(k));
        if (kids.length < 3 || kids.length > 6) continue;
        const stats = kids.filter((k) => {
          const big = [k, ...k.querySelectorAll('*')].find((e) => numRe.test(h.own(e)) && h.px(h.cs(e).fontSize) >= 28);
          return !!big && (k.textContent || '').trim().length < 80;
        });
        if (stats.length < 3 || stats.length !== kids.length) continue;
        const cmp = /\b(vs|versus|from|last|prior|previous|than|compared|yesterday|ago|prev)\b/i;
        const compared = stats.filter((k) => cmp.test(k.textContent || '')).length;
        if (compared < stats.length / 2) out.push({ el: h.sel(p), detail: `${stats.length} stat blocks, ${compared} with a comparison` });
      }
      return out;
    },
  },
  {
    id: 'layout-side-stripe', pass: 'layout', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Coloured stripe down one side of a box',
    why: 'A thick left border on a card, alert or quote is a common AI shortcut for emphasis.',
    fix: 'Emphasise with a tinted surface, a heading or an icon. Do not use a one-sided accent border.',
    check: (h) => {
      const out = [];
      for (const el of h.all()) {
        const s = h.cs(el);
        if (h.rect(el).height < 24) continue;
        for (const side of ['Left', 'Right']) {
          const w = h.px(s['border' + side + 'Width']);
          const c = h.rgba(s['border' + side + 'Color']);
          if (w >= 3 && s['border' + side + 'Style'] !== 'none' && c && c.a > 0.3 && h.px(s.borderTopWidth) <= 1 && h.px(s.borderBottomWidth) <= 1 && el.tagName !== 'INPUT')
            out.push({ el: h.sel(el), detail: `${w}px ${side.toLowerCase()} border` });
        }
        if (/inset\s+-?[3-9]px\s+0(px)?\s+0/.test(s.boxShadow) || /\)\s*inset\s+-?[3-9]px\s+0px\s+0px/.test(s.boxShadow))
          out.push({ el: h.sel(el), detail: 'inset side shadow' });
      }
      return out;
    },
  },
  {
    id: 'layout-overflow-x', pass: 'layout', severity: 'critical', scope: 'page', viewports: BOTH,
    title: 'Page scrolls sideways',
    why: 'Horizontal overflow is a bug, most often on phones.',
    fix: 'Find the widest element, give it max-width: 100% or let it wrap; do not hide the overflow on body.',
    check: (h) => {
      const root = document.documentElement;
      if (root.scrollWidth <= root.clientWidth + 1) return [];
      const off = h.all().filter((e) => h.rect(e).right > root.clientWidth + 1 && !e.closest('[style*="overflow"]'));
      const worst = off.sort((a, b) => h.rect(b).right - h.rect(a).right).slice(0, 4);
      return (worst.length ? worst : [document.body]).map((e) => ({ el: h.sel(e), detail: `scrollWidth ${root.scrollWidth} > ${root.clientWidth}` }));
    },
  },
  {
    id: 'layout-tap-target', pass: 'layout', severity: 'minor', scope: 'page', viewports: ['mobile'],
    title: 'Touch targets under 32 px',
    why: 'Small buttons and links are hard to hit on a phone.',
    fix: 'Make every control at least 44 px tall (minimum 32 px) with padding rather than larger text.',
    check: (h) => {
      const out = [];
      for (const el of h.all()) {
        if (!el.matches('a[href], button, input:not([type=hidden]), select, [role=button]')) continue;
        if (h.cs(el).display === 'inline') continue;
        const r = h.rect(el);
        if (Math.min(r.width, r.height) < 32) out.push({ el: h.sel(el), detail: `${Math.round(r.width)}x${Math.round(r.height)}px` });
      }
      return out.length >= 3 ? out : [];
    },
  },

  // ----------------------------------------------------------------- detail
  {
    id: 'detail-pulse-dot', pass: 'detail', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Pulsing status dot',
    why: 'A blinking "live" dot on a status that never changes pretends the product is alive.',
    fix: 'Show status only when it comes from data, as text plus colour, without animation.',
    check: (h) => {
      const out = [];
      for (const el of h.all()) {
        const s = h.cs(el);
        const r = h.rect(el);
        const inf = s.animationName !== 'none' && /infinite/.test(s.animationIterationCount);
        if (!inf) continue;
        const dot = r.width <= 16 && r.height <= 16 && h.px(s.borderTopLeftRadius) >= r.width / 2 - 1;
        const named = /pulse|ping|blink|beacon/i.test(s.animationName + ' ' + el.className);
        if (dot || (named && r.width <= 48)) out.push({ el: h.sel(el), detail: `animation ${s.animationName}` });
      }
      return out;
    },
  },
  {
    id: 'detail-glass', pass: 'detail', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Frosted glass on several surfaces',
    why: 'Backdrop blur on many elements costs performance and rarely has anything meaningful behind it.',
    fix: 'Use solid surfaces. Keep blur for at most one overlay that really sits over content.',
    check: (h) => {
      const els = h.all().filter((e) => {
        const s = h.cs(e);
        const v = s.backdropFilter || s.webkitBackdropFilter;
        return v && v !== 'none';
      });
      return els.length >= 2 ? els.map((e) => ({ el: h.sel(e), detail: 'backdrop-filter' })) : [];
    },
  },
  {
    id: 'detail-announce-pill', pass: 'detail', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Announcement pill above the hero heading',
    why: 'A rounded "New: ..." badge above the h1 is on nearly every generated landing page.',
    fix: 'Remove it. If there is real news, link it in the header or footer.',
    check: (h) => {
      const h1 = document.querySelector('h1');
      if (!h1) return [];
      const hr = h.rect(h1);
      const out = [];
      for (const el of h.all()) {
        const r = h.rect(el);
        if (r.height > 44 || r.height < 18 || r.bottom > hr.top + 4 || hr.top - r.bottom > 90 || r.top > hr.top) continue;
        const rad = h.px(h.cs(el).borderTopLeftRadius);
        if (rad < r.height / 2 - 2) continue;
        const bg = h.rgba(h.cs(el).backgroundColor);
        const border = h.px(h.cs(el).borderTopWidth) >= 1;
        if (!((bg && bg.a > 0.03) || border)) continue;
        if (/\b(new|introducing|announcing|beta|now live|just launched|powered by|ai-powered|v\d)\b|✨/i.test(el.textContent || '')) out.push({ el: h.sel(el), detail: h.snip((el.textContent || '').trim(), 40) });
      }
      return out.slice(0, 1);
    },
  },
  {
    id: 'detail-numbered', pass: 'detail', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Decorative section numbers',
    why: '"01 / 02 / 03" on content that has no sequence is ornament.',
    fix: 'Number only real steps (use an ordered list). Otherwise drop the numbers.',
    check: (h) => {
      const els = h.textEls().filter((e) => /^(0\d|\d{2})(\s*\/\s*\d{2})?\.?$/.test(h.own(e)) && !e.closest('ol'));
      return els.length >= 3 ? els.map((e) => ({ el: h.sel(e), detail: h.own(e) })) : [];
    },
  },
  {
    id: 'detail-arrow-links', pass: 'detail', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Arrow glyph on many links',
    why: 'Appending "→" to every link and button is decoration.',
    fix: 'Keep an arrow only on the single primary action, if direction carries meaning.',
    check: (h) => {
      const els = h.textEls().filter((e) => ['A', 'BUTTON', 'SPAN'].includes(e.tagName) && /(→|->|↗|»)\s*$/.test(h.own(e)));
      return els.length >= 3 ? els.map((e) => ({ el: h.sel(e), detail: h.snip(h.own(e), 30) })) : [];
    },
  },
  {
    id: 'detail-card-triple', pass: 'detail', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Border, soft shadow and tint on every card',
    why: 'Stacking a border, a diffuse shadow and a different fill on the same surface is three signals for one idea.',
    fix: 'Pick one separator per surface: a border, or a tint, or (for floating layers only) a shadow.',
    check: (h) => {
      const els = h.all().filter((e) => {
        if (!h.isCard(e)) return false;
        const s = h.cs(e);
        const bw = h.px(s.borderTopWidth) >= 1 && s.borderTopStyle !== 'none';
        const sh = s.boxShadow !== 'none' && /(\d+)px\s+(\d+)px/.test(s.boxShadow);
        const bg = h.rgba(s.backgroundColor);
        const pb = e.parentElement ? h.bgOf(e.parentElement) : null;
        const me = h.bgOf(e);
        const tint = bg && bg.a > 0.05 && pb && me && Math.abs(pb.r - me.r) + Math.abs(pb.g - me.g) + Math.abs(pb.b - me.b) > 9;
        return bw && sh && tint;
      });
      return els.length >= 3 ? els.map((e) => ({ el: h.sel(e), detail: 'border + shadow + tint' })) : [];
    },
  },
  {
    id: 'detail-focus-ring', pass: 'detail', severity: 'major', scope: 'css', viewports: ['desktop'],
    title: 'Focus outline removed without a replacement',
    why: 'Keyboard users cannot see where they are.',
    fix: 'Add :focus-visible with a 2 px outline (or ring) in an accent colour; never leave outline: none alone.',
    check: (css) => {
      if (!/outline\s*:\s*(none|0)\b/i.test(css)) return [];
      if (/:focus-visible\s*\{[^}]*(outline|box-shadow)/i.test(css) || /:focus\s*\{[^}]*(box-shadow|outline\s*:\s*[1-9])/i.test(css)) return [];
      return [{ el: 'stylesheet', detail: 'outline: none with no :focus-visible style' }];
    },
  },
  {
    id: 'detail-hover-lift', pass: 'detail', severity: 'minor', scope: 'css', viewports: ['desktop'],
    title: 'Cards lift or grow on hover',
    why: 'translateY(-4px) and scale(1.05) on hover is a stock micro-interaction.',
    fix: 'Change tone or border colour on hover, only inside @media (hover: hover).',
    check: (css) => {
      const m = css.match(/:hover[^{]*\{[^}]*transform\s*:[^;}]*(translateY\(\s*-|scale\(\s*1\.\d)[^;}]*/i);
      return m ? [{ el: 'stylesheet', detail: m[0].replace(/\s+/g, ' ').slice(0, 80) }] : [];
    },
  },

  // ---------------------------------------------------------------- imagery
  {
    id: 'image-blur-blob', pass: 'imagery', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Blurred colour blob behind the content',
    why: 'Soft coloured orbs in the hero background are decoration without subject.',
    fix: 'Remove the blob. If the hero needs an image, use a real photo, product screen or diagram.',
    check: (h) => {
      const out = [];
      for (const el of h.all()) {
        const s = h.cs(el);
        const r = h.rect(el);
        const blur = (s.filter.match(/blur\((\d+(\.\d+)?)px\)/) || [])[1];
        if (blur && +blur >= 40 && r.width >= 160 && r.height >= 160) out.push({ el: h.sel(el), detail: `filter blur(${blur}px)` });
        else if (/radial-gradient/.test(s.backgroundImage) && ['absolute', 'fixed'].includes(s.position) && r.width >= 300 && r.height >= 300) {
          const toks = h.colorTokens(s.backgroundImage).map((t) => h.rgba(t));
          if (toks.some((c) => c.a === 0 || c.a < 0.05) && toks.some((c) => c.a > 0.05 && h.hsl(c).s > 0.4)) out.push({ el: h.sel(el), detail: 'radial gradient orb' });
        }
      }
      return out;
    },
  },
  {
    id: 'image-placeholder-src', pass: 'imagery', severity: 'critical', scope: 'page', viewports: ['desktop'],
    title: 'Stand-in image service',
    why: 'Placeholder or random-photo URLs (placehold, picsum, pravatar ...) show an unfinished page and may disappear.',
    fix: 'Replace with the real asset hosted with the site, or remove the slot.',
    check: (h) => {
      const re = /placeholder|placehold\.co|picsum\.photos|dummyimage|lorempixel|source\.unsplash|unsplash\.com\/random|pravatar|randomuser\.me|via\.placeholder/i;
      const out = [];
      for (const img of document.querySelectorAll('img')) if (re.test(img.currentSrc || img.src)) out.push({ el: h.sel(img), detail: h.snip(img.src, 60) });
      for (const el of h.all()) {
        const bi = h.cs(el).backgroundImage;
        if (/url\(/.test(bi) && re.test(bi)) out.push({ el: h.sel(el), detail: h.snip(bi, 60) });
      }
      return out;
    },
  },
  {
    id: 'image-avatar-stack', pass: 'imagery', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Overlapping avatar row',
    why: 'A stack of round faces beside "trusted by" is the stock proof device, and the faces are rarely real.',
    fix: 'Replace with a named customer quote that can be checked, or remove.',
    check: (h) => {
      const out = [];
      for (const p of h.all()) {
        const kids = [...p.children].filter((k) => h.visible(k));
        if (kids.length < 3) continue;
        const round = kids.filter((k) => {
          const r = h.rect(k);
          return r.width >= 20 && r.width <= 64 && Math.abs(r.width - r.height) < 3 && h.px(h.cs(k).borderTopLeftRadius) >= r.width / 2 - 1;
        });
        if (round.length < 3) continue;
        const overlap = round.slice(1).filter((k, i) => h.rect(k).left < h.rect(round[i]).right - 1).length;
        if (overlap >= 2) out.push({ el: h.sel(p), detail: `${round.length} overlapping circles` });
      }
      return out;
    },
  },
  {
    id: 'image-no-alt', pass: 'imagery', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Image without an alt attribute',
    why: 'Screen readers announce the file name instead of the meaning; alt="" marks decoration explicitly.',
    fix: 'Write a short description, or alt="" if the image is purely decorative.',
    check: (h) => [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).map((i) => ({ el: h.sel(i), detail: h.snip(i.getAttribute('src') || '', 50) })),
  },
  {
    id: 'image-broken', pass: 'imagery', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Image fails to load',
    why: 'A broken image icon is an obvious defect.',
    fix: 'Fix the path or remove the element.',
    check: (h) => [...document.querySelectorAll('img')].filter((i) => i.complete && i.naturalWidth === 0 && h.visible(i)).map((i) => ({ el: h.sel(i), detail: h.snip(i.getAttribute('src') || '', 50) })),
  },

  // ----------------------------------------------------------------- motion
  {
    id: 'motion-infinite', pass: 'motion', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Ornament that animates forever',
    why: 'Endless loops (floating shapes, shimmering text, tickers) compete with content and drain batteries.',
    fix: 'Animate in response to an action and then stop. Keep infinite loops for real loading indicators only.',
    check: (h) => {
      const out = [];
      for (const el of h.all()) {
        const s = h.cs(el);
        if (s.animationName === 'none' || !/infinite/.test(s.animationIterationCount)) continue;
        const r = h.rect(el);
        if (r.width <= 16 && r.height <= 16) continue;
        if (el.closest('[role=progressbar], [aria-busy=true], [role=status]') || /spin|loader|loading|skeleton/i.test(el.className + s.animationName)) continue;
        out.push({ el: h.sel(el), detail: `animation ${s.animationName}` });
      }
      return out;
    },
  },
  {
    id: 'motion-entrance-everywhere', pass: 'motion', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Everything fades up on load or scroll',
    why: 'Six or more elements entering with the same fade-and-rise turns motion into wallpaper.',
    fix: 'Animate one moment (the hero, or one key reveal). Leave the rest still.',
    check: (h) => {
      const els = h.all().filter((e) => {
        const s = h.cs(e);
        const fin = s.animationName !== 'none' && !/infinite/.test(s.animationIterationCount);
        return fin || e.hasAttribute('data-aos') || /(^|[\s_-])(fade-?up|fade-?in|reveal|animate-in|aos-animate|slide-?up)/i.test(e.className);
      });
      return els.length >= 6 ? els.map((e) => ({ el: h.sel(e), detail: 'entrance animation' })) : [];
    },
  },
  {
    id: 'motion-no-reduced', pass: 'motion', severity: 'minor', scope: 'css', viewports: ['desktop'],
    title: 'No prefers-reduced-motion handling',
    why: 'People who ask the system for less motion still get all of it.',
    fix: 'Add @media (prefers-reduced-motion: reduce) that removes or shortens animations and transitions.',
    check: (css) => {
      const moves = /@keyframes|animation\s*:|animation-name\s*:|transition\s*:\s*[^;}]*\d/i.test(css);
      return moves && !/prefers-reduced-motion/i.test(css) ? [{ el: 'stylesheet', detail: 'animations present, no reduced-motion query' }] : [];
    },
  },
  {
    id: 'motion-transition-all', pass: 'motion', severity: 'minor', scope: 'css', viewports: ['desktop'],
    title: 'transition: all',
    why: 'Animating every property triggers layout work and surprising effects.',
    fix: 'List the properties you mean (opacity, transform, background-color) with a duration and easing.',
    check: (css) => {
      const m = css.match(/transition(-property)?\s*:\s*[^;}]*\ball\b[^;}]*/i);
      return m ? [{ el: 'stylesheet', detail: m[0].replace(/\s+/g, ' ').slice(0, 60) }] : [];
    },
  },
];

export const RULE_IDS = RULES.map((r) => r.id);
