// The opposite failure: pages stripped of slop until nothing is left (a plain document, no visual,
// no depth, no colour, no motion). These rules do NOT add to the slop score; they feed the craft
// report next to it. Same contract as rules.mjs (scope 'page', check(h) -> [{el, detail}]).
// Pass name for all of them: 'craft'.

const DESK = ['desktop'];

export const BLAND = [
  {
    id: 'bland-no-hero-visual', pass: 'craft', severity: 'major', scope: 'page', viewports: DESK,
    title: 'No real visual on the first screen',
    why: 'A first screen of text alone asks the reader to imagine the product. Strong pages show it: a product view, a photo, a drawing.',
    fix: 'Put the product itself in the first screen: a built UI view, a real screenshot, a photo or a meaningful drawing, at least 8% of the screen.',
    check: (h) => {
      const v = h.visuals();
      const best = v.reduce((a, b) => (b.frac > a ? b.frac : a), 0);
      return best < 0.08 ? [{ el: 'first screen', detail: v.length ? `largest visual covers ${(best * 100).toFixed(1)}% of the screen` : 'no image, canvas, drawing or product surface' }] : [];
    },
  },
  {
    id: 'bland-document-column', pass: 'craft', severity: 'major', scope: 'page', viewports: DESK,
    title: 'Whole page is one narrow column',
    why: 'On a 1440 px screen a single text column from top to bottom reads as a document, not a designed page.',
    fix: 'Use the width: put a visual beside the headline, set one section in two or three columns of different weight, or let a product view run wide.',
    check: (h) => {
      const blocks = h.all().filter((e) => {
        const r = h.rect(e);
        if (r.width < 200 || r.height < 60) return false;
        return h.own(e).length > 0 || ['IMG', 'VIDEO', 'CANVAS', 'SVG', 'PICTURE'].includes(e.tagName.toUpperCase()) || [...e.children].some((k) => h.own(k).length > 0);
      });
      const rs = blocks.map((e) => h.rect(e));
      for (let i = 0; i < rs.length; i++) for (let j = i + 1; j < rs.length; j++) {
        const a = rs[i], b = rs[j];
        const vOverlap = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (vOverlap >= 40 && (a.right <= b.left + 1 || b.right <= a.left + 1)) return [];
      }
      const wide = Math.max(0, ...rs.map((r) => r.width));
      return wide <= 0.6 * h.vw ? [{ el: 'body', detail: `no side-by-side blocks; widest block ${Math.round(wide)}px` }] : [];
    },
  },
  {
    id: 'bland-timid-display', pass: 'craft', severity: 'major', scope: 'page', viewports: DESK,
    title: 'No display-size type',
    why: 'On a landing or content page, a title under 2.5x the body size has no voice. Premium pages commit to one large, confident line. (App screens are exempt.)',
    fix: 'Set the h1 (or the one hero line) at 2.5x the body size or more, in the display face, with tight tracking.',
    check: (h) => {
      if (h.isApp()) return [];
      const body = h.bodySize();
      const firsts = h.textEls().filter((e) => h.rect(e).top < h.vh);
      if (!firsts.length) return [];
      const big = Math.max(...firsts.map((e) => h.px(h.cs(e).fontSize)));
      return big < body * 2.5 ? [{ el: 'first screen', detail: `largest ${big}px vs body ${body}px (${(big / body).toFixed(2)}x)` }] : [];
    },
  },
  {
    id: 'bland-no-depth', pass: 'craft', severity: 'minor', scope: 'page', viewports: DESK,
    title: 'No depth at all',
    why: 'No shadow, no layered surface, one flat colour everywhere: the page looks like printed paper, not an interface.',
    fix: 'Add one layer system: a raised surface for the product view (soft layered shadow), a second surface tone, or one overlapping element.',
    check: (h) => {
      let shadows = 0;
      const surf = new Set();
      const vpA = h.vw * h.vh;
      for (const e of h.all()) {
        const s = h.cs(e);
        if ((s.boxShadow && s.boxShadow !== 'none' && !/^inset/.test(s.boxShadow)) || /drop-shadow/.test(s.filter)) shadows++;
        const r = h.rect(e);
        const c = h.rgba(s.backgroundColor);
        if (c && c.a > 0.5 && r.width * r.height >= 0.02 * vpA) surf.add(h.hex(c));
        if (s.backgroundImage && s.backgroundImage !== 'none' && r.width * r.height >= 0.02 * vpA) surf.add('img:' + s.backgroundImage.slice(0, 40));
      }
      const page = h.rgba(h.cs(document.body).backgroundColor);
      if (page && page.a > 0.5) surf.add(h.hex(page));
      return shadows === 0 && surf.size <= 2 ? [{ el: 'body', detail: `0 shadows, ${surf.size} surface tone(s)` }] : [];
    },
  },
  {
    id: 'bland-no-texture', pass: 'craft', severity: 'minor', scope: 'page', viewports: DESK,
    title: 'No texture, pattern or tonal light anywhere',
    why: 'Every surface is one flat fill. Good pages carry a material: grain, a faint pattern or watermark, a tonal light behind the product.',
    fix: 'Add one material that suits the project: fine grain, a subtle pattern in one zone, a watermark, or a soft light behind the main visual. Keep it quiet (under 10% opacity).',
    check: (h) => (h.textures().length ? [] : [{ el: 'body', detail: 'no background image, gradient, mask or noise on any large area' }]),
  },
  {
    id: 'bland-monochrome', pass: 'craft', severity: 'major', scope: 'page', viewports: DESK,
    title: 'No colour anywhere',
    why: 'Ink on paper with no accent gives the eye no signal for what to press or where the brand is.',
    fix: 'Pick one accent with a job (primary action, selection, the key data series) and use it there, consistently.',
    check: (h) => {
      for (const e of h.all()) {
        const s = h.cs(e);
        const toks = [s.color, s.backgroundColor, s.borderTopColor, s.fill, s.stroke, ...h.colorTokens(s.backgroundImage)];
        if (toks.some((t) => t && t !== 'none' && h.saturated(h.rgba(t)))) return [];
      }
      return [{ el: 'body', detail: 'no saturated colour on text, surfaces, borders or drawings' }];
    },
  },
  {
    id: 'bland-static', pass: 'craft', severity: 'minor', scope: 'page', viewports: DESK,
    title: 'Nothing moves, even where a demo would explain the product',
    why: 'A product page with a call to action but no motion leaves the reader to guess how the product behaves over time.',
    fix: 'Animate the product view once: one short sequence (render(t) or a few keyframes) that shows what happens, then stops. Respect reduced motion.',
    check: (h) => {
      const cta = [...document.querySelectorAll('a, button')].some((e) => { const c = h.rgba(h.cs(e).backgroundColor); return h.visible(e) && c && c.a > 0.5; });
      if (!document.querySelector('h1') || !cta) return [];
      const m = h.motion();
      const anims = document.getAnimations ? document.getAnimations().length : 0;
      const declared = h.all().some((e) => h.cs(e).animationName !== 'none');
      return m.raf < 10 && m.mut < 5 && anims === 0 && !declared ? [{ el: 'body', detail: `no animation, ${m.raf} animation frames, ${m.mut} DOM changes after load` }] : [];
    },
  },
  {
    id: 'bland-empty-first-screen', pass: 'craft', severity: 'minor', scope: 'page', viewports: DESK,
    title: 'First screen is mostly empty',
    why: 'Large empty areas with nothing to look at read as unfinished rather than calm.',
    fix: 'Fill the first screen with intent: the headline at display size and the product view; keep space around them, not instead of them.',
    check: (h) => {
      const c = h.coverage();
      return c < 0.2 ? [{ el: 'first screen', detail: `${Math.round(c * 100)}% of the first screen holds text or visuals` }] : [];
    },
  },
  {
    id: 'bland-default-serif', pass: 'craft', severity: 'major', scope: 'page', viewports: DESK,
    title: 'Default system serif',
    why: 'Georgia, Times and other built-in serifs are what a browser shows when nobody chose a type face.',
    fix: 'Choose a face on purpose (a real web font with a licence that allows self-hosting) and pair it with one text face.',
    check: (h) => {
      const sys = /^(georgia|times|times new roman|serif|ui-serif|charter|iowan old style|cambria|palatino|palatino linotype|book antiqua|bitstream charter)$/;
      const loaded = new Set([...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replace(/["']/g, '').toLowerCase()));
      const out = [];
      for (const el of [document.body, document.querySelector('h1'), document.querySelector('h2')].filter(Boolean)) {
        const fams = h.cs(el).fontFamily.split(',').map((f) => f.replace(/["']/g, '').trim().toLowerCase());
        for (const f of fams) {
          if (loaded.has(f)) break;
          if (sys.test(f)) { out.push({ el: h.sel(el), detail: h.cs(el).fontFamily.slice(0, 50) }); break; }
        }
      }
      return out;
    },
  },
];

export const BLAND_IDS = BLAND.map((r) => r.id);
