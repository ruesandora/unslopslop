// More rules: page frame, app screens, visual poverty, accessibility, and later additions.
// Same contract as rules.mjs.
const BOTH = ['desktop', 'mobile'];

export const EXTRA = [
  // ------------------------------------------------------------ page frame
  {
    id: 'page-no-heading', pass: 'layout', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Page has no heading at all',
    why: 'Without any h1 to h6 the page has no outline for readers, search engines or screen readers.',
    fix: 'Add one h1 that names the page, then h2 for each section.',
    check: (h) => (document.querySelector('h1, h2, h3, h4, h5, h6, [role=heading]') ? [] : [{ el: 'body', detail: 'no heading elements' }]),
  },
  {
    id: 'page-multiple-h1', pass: 'layout', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'More than one h1',
    why: 'Several h1 elements blur what the page is about.',
    fix: 'Keep one h1; demote the others to h2.',
    check: (h) => {
      const hs = [...document.querySelectorAll('h1')].filter(h.visible);
      return hs.length > 1 ? hs.map((e) => ({ el: h.sel(e), detail: h.snip(e.textContent.trim(), 40) })) : [];
    },
  },
  {
    id: 'page-untitled-sections', pass: 'layout', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Sections without a heading',
    why: 'Sections with no title cannot be scanned or navigated.',
    fix: 'Give each section a heading (or aria-label if a visible one would be redundant).',
    check: (h) => {
      const secs = [...document.querySelectorAll('section')].filter((s) => h.visible(s) && s.textContent.trim().length > 80);
      const bad = secs.filter((s) => !s.querySelector('h1, h2, h3, h4, h5, h6, [role=heading]') && !s.getAttribute('aria-label') && !s.getAttribute('aria-labelledby'));
      return bad.length >= 2 ? bad.map((s) => ({ el: h.sel(s), detail: 'no heading' })) : [];
    },
  },
  {
    id: 'layout-text-at-edge', pass: 'layout', severity: 'major', scope: 'page', viewports: BOTH,
    title: 'Text glued to the screen edge',
    why: 'Copy that starts within 8 px of the viewport edge has no page margin.',
    fix: 'Give the page container a side padding of at least 16 px on phones and 24 px on desktop.',
    check: (h) => {
      const out = [];
      for (const el of h.textEls()) {
        if (h.own(el).length < 10) continue;
        const r = h.rect(el);
        if (r.left < 8 || r.right > h.vw - 8) out.push({ el: h.sel(el), detail: `left ${Math.round(r.left)} right gap ${Math.round(h.vw - r.right)}px` });
      }
      return out;
    },
  },
  {
    id: 'layout-empty-middle', pass: 'layout', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Large empty band between content blocks',
    why: 'A gap of more than 320 px between two pieces of content reads as a broken or unfinished page.',
    fix: 'Pull the blocks together, or fill the band with the content that belongs there.',
    check: (h) => {
      const items = h.all().filter((e) => (h.own(e).length > 0 || ['IMG', 'VIDEO', 'CANVAS', 'svg'].includes(e.tagName)) && h.rect(e).height > 0)
        .map((e) => ({ e, top: h.rect(e).top + scrollY, bottom: h.rect(e).bottom + scrollY })).sort((a, b) => a.top - b.top);
      let reach = items.length ? items[0].bottom : 0;
      const out = [];
      for (const it of items) {
        if (it.top - reach > 320) out.push({ el: h.sel(it.e), detail: `${Math.round(it.top - reach)}px empty above` });
        reach = Math.max(reach, it.bottom);
      }
      return out;
    },
  },
  {
    id: 'layout-one-sided-hero', pass: 'layout', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'First screen leans entirely to one side',
    why: 'On a wide screen all content sits in the left 60% and the right is empty, so the first view feels unbalanced.',
    fix: 'Balance the first screen: put the key visual, product view or a second column opposite the text.',
    check: (h) => {
      const els = h.all().filter((e) => (h.own(e).length > 0 || ['IMG', 'VIDEO', 'CANVAS', 'svg'].includes(e.tagName)) && h.rect(e).top < h.vh && h.rect(e).width < h.vw * 0.95);
      if (els.length < 3 || !document.querySelector('h1')) return [];
      const right = Math.max(...els.map((e) => h.rect(e).right));
      return right < h.vw * 0.62 ? [{ el: 'first screen', detail: `content ends at ${Math.round((right / h.vw) * 100)}% of the width` }] : [];
    },
  },
  {
    id: 'layout-no-focal-point', pass: 'layout', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'No focal point on the first screen',
    why: 'When no text is clearly larger than the rest and there is no large image, the eye has nowhere to start.',
    fix: 'Make one element dominant: a headline at least 2x the body size, or a large product image.',
    check: (h) => {
      const els = h.textEls().filter((e) => h.rect(e).top < h.vh);
      if (els.length < 5) return [];
      const sizes = els.map((e) => h.px(h.cs(e).fontSize));
      const body = [...sizes].sort((a, b) => a - b)[Math.floor(sizes.length / 2)];
      const media = h.all().some((e) => ['IMG', 'VIDEO', 'CANVAS', 'svg'].includes(e.tagName) && h.rect(e).width >= 240 && h.rect(e).height >= 160 && h.rect(e).top < h.vh);
      return Math.max(...sizes) <= body * 1.6 && !media ? [{ el: 'first screen', detail: `largest ${Math.max(...sizes)}px vs body ${body}px` }] : [];
    },
  },
  {
    id: 'layout-late-headline', pass: 'layout', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Main headline starts low on the screen',
    why: 'If the h1 begins below 60% of the first screen, the page opens on filler.',
    fix: 'Move the headline into the upper half; trim the header and any banner above it.',
    check: (h) => {
      const h1 = document.querySelector('h1');
      return h1 && h.visible(h1) && h.rect(h1).top > h.vh * 0.6 ? [{ el: h.sel(h1), detail: `top at ${Math.round(h.rect(h1).top)}px of ${h.vh}` }] : [];
    },
  },
  {
    id: 'layout-side-nav-mobile', pass: 'layout', severity: 'major', scope: 'page', viewports: ['mobile'],
    title: 'Desktop side navigation on a phone',
    why: 'A fixed-width sidebar leaves a narrow strip for content on a 390 px screen.',
    fix: 'Below 760 px, fold the sidebar away: show a header row with a menu toggle, or tabs pinned to the bottom of the screen.',
    check: (h) => {
      const out = [];
      for (const el of h.all()) {
        const r = h.rect(el);
        const nav = ['ASIDE', 'NAV'].includes(el.tagName) || el.getAttribute('role') === 'navigation';
        if (nav && r.left < 10 && r.width >= 140 && r.width > h.vw * 0.3 && r.height > h.vh * 0.6) out.push({ el: h.sel(el), detail: `${Math.round(r.width)}px of ${h.vw}px wide` });
      }
      return out;
    },
  },
  {
    id: 'layout-uneven-rows', pass: 'layout', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Table rows of different heights',
    why: 'Rows that differ in height make a table look broken and hard to scan.',
    fix: 'Give rows one fixed padding and keep cell content to a single line (truncate, do not wrap).',
    check: (h) => {
      const out = [];
      for (const t of document.querySelectorAll('table')) {
        const rows = [...t.querySelectorAll('tbody tr')].filter(h.visible);
        if (rows.length < 3) continue;
        const hs = rows.map((r) => h.rect(r).height);
        if (Math.max(...hs) - Math.min(...hs) > 4) out.push({ el: h.sel(t), detail: `row heights ${Math.min(...hs).toFixed(0)}-${Math.max(...hs).toFixed(0)}px` });
      }
      return out;
    },
  },

  // ------------------------------------------------------------ typography
  {
    id: 'type-mono-outside-code', pass: 'typography', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Monospace type used outside code',
    why: 'Monospace for labels, stats and dates is decoration that tries to look technical.',
    fix: 'Keep monospace for code, paths and identifiers. Use the body family with tabular numbers for data.',
    check: (h) => {
      const re = /(^|,)\s*["']?(ui-monospace|sfmono-regular|menlo|monaco|consolas|courier new|jetbrains mono|space mono|ibm plex mono|fira code|roboto mono|dm mono)\b|\bmonospace\b/i;
      const els = h.textEls().filter((e) => !e.closest('code, pre, kbd, samp, var') && re.test(h.cs(e).fontFamily));
      return els.length >= 2 ? els.map((e) => ({ el: h.sel(e), detail: h.snip(h.own(e), 30) })) : [];
    },
  },
  {
    id: 'type-small-text', pass: 'typography', severity: 'minor', scope: 'page', viewports: BOTH,
    title: 'Several text elements under 13 px',
    why: 'Three or more small text elements make a page tiring to read, especially on phones.',
    fix: 'Raise captions and labels to at least 13 px (body 16 px).',
    check: (h) => {
      const els = h.textEls().filter((e) => { const f = h.px(h.cs(e).fontSize); return f >= 11 && f < 13 && !e.closest('[aria-hidden="true"], [role=img], figure, svg'); });
      return els.length >= 3 ? els.map((e) => ({ el: h.sel(e), detail: `${h.px(h.cs(e).fontSize)}px` })) : [];
    },
  },
  {
    id: 'type-tiny-text', pass: 'typography', severity: 'major', scope: 'page', viewports: BOTH,
    title: 'Text under 11 px',
    why: 'Text this small cannot be read by most people, even in an app.',
    fix: 'Never go below 11 px; aim for 13 px or more.',
    check: (h) => h.textEls().filter((e) => h.px(h.cs(e).fontSize) < 11 && !e.closest('[aria-hidden="true"], [role=img], figure, svg')).map((e) => ({ el: h.sel(e), detail: `${h.px(h.cs(e).fontSize)}px "${h.snip(h.own(e), 24)}"` })),
  },
  {
    id: 'type-long-headline', pass: 'typography', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Headline longer than two lines',
    why: 'A headline that needs three lines or more is a paragraph in disguise.',
    fix: 'Cut it to one clear statement of at most two lines at desktop width.',
    check: (h) => {
      const out = [];
      for (const e of document.querySelectorAll('h1, h2')) {
        if (!h.visible(e)) continue;
        const s = h.cs(e);
        const fs = h.px(s.fontSize);
        const lh = s.lineHeight === 'normal' ? fs * 1.2 : h.px(s.lineHeight);
        const lines = Math.round(h.rect(e).height / lh);
        if (lines > 2) out.push({ el: h.sel(e), detail: `${lines} lines` });
      }
      return out;
    },
  },

  // ------------------------------------------------------------------ color
  {
    id: 'color-random-gradient', pass: 'color', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Gradient across unrelated hues',
    why: 'A ramp that jumps across more than 120 degrees of hue (orange to teal to pink) has no brand logic.',
    fix: 'Use one hue family, or a flat colour.',
    check: (h) => {
      const out = [];
      for (const el of h.all()) {
        const bi = h.cs(el).backgroundImage;
        if (!/gradient\(/.test(bi)) continue;
        if ((h.cs(el).webkitBackgroundClip === 'text' || h.cs(el).backgroundClip === 'text') && parseFloat(h.cs(el).backgroundSize) >= 200) continue;
        const hs = h.colorTokens(bi).map((t) => h.rgba(t)).filter((c) => c && c.a > 0.3).map((c) => h.hsl(c)).filter((c) => c.s > 0.25 && c.l > 0.12 && c.l < 0.9).map((c) => c.h);
        if (hs.length < 2) continue;
        const spread = (a) => { const s = [...a].sort((x, y) => x - y); let gap = 0; for (let i = 0; i < s.length; i++) gap = Math.max(gap, (s[(i + 1) % s.length] - s[i] + 360) % 360); return 360 - gap; };
        if (spread(hs) > 120) out.push({ el: h.sel(el), detail: h.snip(bi, 70) });
      }
      return out;
    },
  },
  {
    id: 'color-rainbow', pass: 'color', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Rainbow of series colours in a chart',
    why: 'Every bar or slice in a different hue implies categories that are not there.',
    fix: 'One colour for the data, a second only to highlight the item that matters.',
    check: (h) => {
      const out = [];
      for (const p of h.all()) {
        const kids = [...p.children].filter((k) => h.visible(k) || (k.querySelector && h.visible(k)));
        if (kids.length < 5) continue;
        const buckets = new Set();
        let colored = 0;
        for (const k of kids) {
          const t = k.tagName.toLowerCase() === 'div' && k.children.length === 1 ? k.children[0] : k;
          const c = h.rgba(h.cs(t).backgroundColor);
          if (c && c.a > 0.5) { const k2 = h.hsl(c); if (k2.s > 0.35) { colored++; buckets.add(Math.round(k2.h / 40)); } }
        }
        if (colored >= 5 && buckets.size >= 5) out.push({ el: h.sel(p), detail: `${buckets.size} hues across ${colored} items` });
      }
      return out;
    },
  },

  // ------------------------------------------------------------------- copy
  {
    id: 'copy-fake-data', pass: 'copy', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Stock fake names and data',
    why: 'Acme, Globex, John Doe and "User 1" are the placeholder cast of generated demos.',
    fix: 'Use plausible, specific sample entries, and label them as sample data.',
    check: (h) => {
      const re = /\b(acme( inc\.?| corp\.?)?|globex( corp)?|initech|umbrella corp|hooli|pied piper|wayne enterprises|stark industries|contoso|foo ?bar)\b|\b(john|jane) (doe|smith)\b|\b(user|customer|client)\s?[1-5]\b/i;
      return h.textEls().filter((e) => re.test(h.own(e))).map((e) => ({ el: h.sel(e), detail: h.snip(h.own(e), 40) }));
    },
  },

  // ----------------------------------------------------------------- detail
  {
    id: 'detail-heavy-shadow', pass: 'detail', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Heavy resting shadows',
    why: 'Large dark shadows on elements at rest make the page look puffy and dated.',
    fix: 'Keep shadows only on floating layers (menus, dialogs) and make them subtle: low alpha, small blur.',
    check: (h) => {
      const out = [];
      for (const el of h.all()) {
        const v = h.cs(el).boxShadow;
        if (!v || v === 'none') continue;
        for (const part of v.split(/,(?![^(]*\))/)) {
          if (/inset/.test(part)) continue;
          const tok = h.colorTokens(part)[0];
          const nums = (part.replace(tok || '', '').match(/-?\d+(\.\d+)?px/g) || []).map(parseFloat);
          if (!tok || nums.length < 3) continue;
          const c = h.rgba(tok);
          if (c.a >= 0.3 && (nums[2] >= 30 || nums[1] >= 20)) out.push({ el: h.sel(el), detail: h.snip(part.trim(), 60) });
        }
      }
      return out.length >= 2 ? out : [];
    },
  },
  {
    id: 'detail-version-badge', pass: 'detail', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Version or BETA badge as decoration',
    why: 'A small "v2.0" or "BETA" pill near the top signals polish by label, not by substance.',
    fix: 'Remove it unless the status changes what the reader can do; then say so in a sentence.',
    check: (h) =>
      h.textEls().filter((e) => h.rect(e).top < h.vh && /^(beta|alpha|preview|new|v\d+(\.\d+){0,2})$/i.test(h.own(e)) && h.rect(e).height < 36)
        .map((e) => ({ el: h.sel(e), detail: h.own(e) })),
  },
  {
    id: 'detail-scroll-hint', pass: 'detail', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: '"Scroll" hint',
    why: 'A scroll prompt or bouncing chevron admits the page does not invite scrolling by itself.',
    fix: 'Let the next section peek above the fold instead.',
    check: (h) => h.textEls().filter((e) => /^(scroll( down| to (explore|discover))?|↓\s*scroll|swipe up)\.?$/i.test(h.own(e))).map((e) => ({ el: h.sel(e), detail: h.own(e) })),
  },
  {
    id: 'detail-fake-window', pass: 'detail', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Fake window chrome built from divs',
    why: 'Three red, yellow and green dots over a drawn "app" is a stand-in for a real product view.',
    fix: 'Use a real screenshot or the real component, or drop the mock.',
    check: (h) => {
      const out = [];
      for (const p of h.all()) {
        const kids = [...p.children].filter((k) => { const r = h.rect(k); return r.width > 4 && r.width <= 16 && Math.abs(r.width - r.height) < 2 && h.px(h.cs(k).borderTopLeftRadius) >= r.width / 2 - 1; });
        if (kids.length < 3) continue;
        const hues = kids.map((k) => h.hsl(h.rgba(h.cs(k).backgroundColor))).filter((c) => c.s > 0.4).map((c) => c.h);
        const has = (a, b) => hues.some((x) => x >= a && x <= b);
        if (has(0, 15) || has(345, 360)) if (has(35, 60) && has(90, 150)) out.push({ el: h.sel(p), detail: 'red/yellow/green dots' });
      }
      return out;
    },
  },
  {
    id: 'a11y-no-name', pass: 'detail', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Control without an accessible name',
    why: 'Icon-only buttons, empty links and unlabeled inputs are announced as nothing by screen readers.',
    fix: 'Add visible text, aria-label, or a <label> for every button, link and input.',
    check: (h) => {
      const out = [];
      for (const el of document.querySelectorAll('a[href], button, input:not([type=hidden]), select, textarea, [role=button]')) {
        if (!h.visible(el)) continue;
        let name = (el.getAttribute('aria-label') || '').trim() || (el.getAttribute('title') || '').trim() || (el.getAttribute('aria-labelledby') ? 'x' : '');
        if (!name && ['A', 'BUTTON'].includes(el.tagName) || el.getAttribute('role') === 'button') name = name || (el.textContent || '').trim() || (el.querySelector('img[alt]:not([alt=""])') ? 'x' : '');
        if (!name && ['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)) {
          const t = el.getAttribute('type');
          if (['submit', 'button', 'reset'].includes(t) && el.value) name = 'x';
          else if ((el.id && document.querySelector(`label[for="${el.id}"]`)) || el.closest('label')) name = 'x';
        }
        if (!name) out.push({ el: h.sel(el), detail: 'no text, aria-label or label' });
      }
      return out;
    },
  },
  {
    id: 'a11y-click-div', pass: 'detail', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Click handler on a non-interactive element',
    why: 'A div or span with onclick cannot be reached or activated from the keyboard.',
    fix: 'Use a real <button> or <a href>.',
    check: (h) => [...document.querySelectorAll('div[onclick], span[onclick], li[onclick], p[onclick], img[onclick]')].filter((e) => !e.getAttribute('role') && e.tabIndex < 0).map((e) => ({ el: h.sel(e), detail: 'onclick without role or tabindex' })),
  },
  {
    id: 'env-dev-server', pass: 'detail', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Page is served by a dev server',
    why: 'Dev builds are slower, unminified and differ from production, so a score taken on them misleads.',
    fix: 'Build for production and audit the built output (or the deployed URL).',
    check: (h) => {
      const srcs = [...document.scripts].map((s) => s.src).filter(Boolean).join(' ');
      return /@vite\/client|webpack-dev-server|hot-update|react-refresh|\/_next\/static\/chunks\/webpack\.js\?/.test(srcs) ? [{ el: 'script', detail: 'dev-server client script found' }] : [];
    },
  },

  // ---------------------------------------------------------------- imagery
  {
    id: 'image-poverty', pass: 'imagery', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Tall page with no real imagery',
    why: 'A long page made only of text and small vector doodles feels generic; SVG decoration does not count as imagery.',
    fix: 'Add real photos, product screenshots or video that show the subject (own assets first, then open-licensed with credit).',
    check: (h) => {
      if (document.documentElement.scrollHeight < 2500) return [];
      const media = [...document.querySelectorAll('img, video, picture, canvas')].filter(h.visible);
      const bg = h.all().some((e) => /url\(/.test(h.cs(e).backgroundImage));
      return media.length === 0 && !bg ? [{ el: 'body', detail: `${document.documentElement.scrollHeight}px tall, no img, video, canvas or background image` }] : [];
    },
  },
  {
    id: 'image-video-no-poster', pass: 'imagery', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Video without a poster',
    why: 'Until the video loads, the slot is blank.',
    fix: 'Add a poster image (and set width and height to avoid layout shift).',
    check: (h) => [...document.querySelectorAll('video')].filter((v) => !v.getAttribute('poster')).map((v) => ({ el: h.sel(v), detail: 'no poster attribute' })),
  },

  // ----------------------------------------------------------------- motion
  {
    id: 'motion-hidden-reduced', pass: 'motion', severity: 'critical', scope: 'page', viewports: ['reduced'],
    title: 'Content stays hidden when reduced motion is requested',
    why: 'Reveal animations that start at opacity 0 leave the text invisible for people who disable motion.',
    fix: 'Make the visible state the default; inside @media (prefers-reduced-motion: reduce) show everything immediately.',
    check: (h) => {
      const out = [];
      for (const el of document.body.querySelectorAll('*')) {
        if (['SCRIPT', 'STYLE'].includes(el.tagName) || (el instanceof SVGElement && el.tagName.toLowerCase() !== 'svg')) continue;
        const s = h.cs(el);
        const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1);
        if (own && s.display !== 'none' && s.visibility !== 'hidden' && parseFloat(s.opacity) < 0.05 && !el.closest('[aria-hidden=true], [hidden], dialog:not([open])')) out.push({ el: h.sel(el), detail: 'opacity 0 under reduced motion' });
      }
      return out;
    },
  },

  // ------------------------------------------------------- headline accents, live numbers, overlap, accent use
  {
    id: 'type-accent-keyword', pass: 'typography', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'One word of the headline in the accent colour',
    why: 'Colouring or gradient-filling one keyword of the headline is the most common template tell, even on design-tool sites.',
    fix: 'Let the whole headline speak in one colour. If a second tone is wanted, make it a quieter grey for a whole line, not a bright keyword.',
    check: (h) => {
      const out = [];
      for (const hd of document.querySelectorAll('h1, h2')) {
        if (!h.visible(hd)) continue;
        const base = h.rgba(h.cs(hd).color);
        const total = hd.textContent.trim().length;
        for (const k of hd.querySelectorAll('span, em, strong, b, i, mark')) {
          if (k.closest('a') || !h.visible(k)) continue;
          const t = k.textContent.trim();
          if (!t || t.split(/\s+/).length > 4 || t.length > total * 0.6) continue;
          const s = h.cs(k);
          const c = h.rgba(s.color);
          const bgc = h.rgba(s.backgroundColor);
          const filled = /gradient\(/.test(s.backgroundImage) || (bgc && bgc.a > 0.2 && h.saturated(bgc));
          if (filled || (h.saturated(c) && !h.saturated(base))) out.push({ el: h.sel(hd), detail: `"${h.snip(t, 30)}" coloured inside "${h.snip(hd.textContent.trim(), 40)}"` });
        }
      }
      return out;
    },
  },
  {
    id: 'type-live-number-proportional', pass: 'typography', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Changing numbers in proportional figures',
    why: 'Timers, prices and counters that update while set in proportional figures jitter sideways on every change.',
    fix: 'Set font-variant-numeric: tabular-nums on every number that changes (and on table columns of numbers).',
    check: (h) => {
      const seen = new Set();
      const out = [];
      for (const n of h.motion().nodes || []) {
        if (!n || seen.has(n) || !h.visible(n)) continue;
        seen.add(n);
        const t = h.own(n);
        if (!/\d/.test(t) || t.length > 24) continue;
        if (!/tabular-nums/.test(h.cs(n).fontVariantNumeric)) out.push({ el: h.sel(n), detail: `"${t}" changes without tabular-nums` });
      }
      return out;
    },
  },
  {
    id: 'layout-text-overlap', pass: 'layout', severity: 'major', scope: 'page', viewports: BOTH,
    title: 'Text drawn on top of other text',
    why: 'Two pieces of text sharing the same spot cannot be read. It is usually an absolutely positioned label or a fixed height that broke on a narrow screen.',
    fix: 'Give the elements their own space (grid, gap, wrapping), or put an opaque surface under the top layer if the overlap is intended.',
    check: (h) => {
      const boxOf = (e) => {
        const r = document.createRange();
        let box = null;
        for (const n of e.childNodes) {
          if (n.nodeType !== 3 || !n.textContent.trim()) continue;
          r.selectNodeContents(n);
          const b = r.getBoundingClientRect();
          if (!b.width || !b.height) continue;
          box = box ? { left: Math.min(box.left, b.left), top: Math.min(box.top, b.top), right: Math.max(box.right, b.right), bottom: Math.max(box.bottom, b.bottom) } : { left: b.left, top: b.top, right: b.right, bottom: b.bottom };
        }
        return box;
      };
      const els = h.textEls().filter((e) => h.own(e).length >= 2 && !(e.closest('details:not([open])') && !e.closest('summary'))).slice(0, 500).map((e) => ({ e, b: boxOf(e) })).filter((x) => x.b);
      const opaqueBetween = (top, common) => {
        for (let x = top; x && x !== common; x = x.parentElement) { const c = h.rgba(h.cs(x).backgroundColor); if (c && c.a >= 0.9) return true; }
        return false;
      };
      const out = [];
      for (let i = 0; i < els.length; i++) for (let j = i + 1; j < els.length; j++) {
        const A = els[i], B = els[j];
        if (A.e.contains(B.e) || B.e.contains(A.e)) continue;
        const w = Math.min(A.b.right, B.b.right) - Math.max(A.b.left, B.b.left);
        const hh = Math.min(A.b.bottom, B.b.bottom) - Math.max(A.b.top, B.b.top);
        if (w <= 0 || hh <= 0) continue;
        const small = Math.min((A.b.right - A.b.left) * (A.b.bottom - A.b.top), (B.b.right - B.b.left) * (B.b.bottom - B.b.top));
        if (w * hh < 0.2 * small) continue;
        const top = document.elementFromPoint(Math.max(A.b.left, B.b.left) + w / 2, Math.max(A.b.top, B.b.top) + hh / 2);
        let common = A.e.parentElement;
        while (common && !common.contains(B.e)) common = common.parentElement;
        const upper = top && A.e.contains(top) ? A.e : top && B.e.contains(top) ? B.e : null;
        if (upper && opaqueBetween(upper, common)) continue;
        out.push({ el: `${h.sel(A.e)} / ${h.sel(B.e)}`, detail: `"${h.snip(h.own(A.e), 20)}" over "${h.snip(h.own(B.e), 20)}"` });
        if (out.length >= 6) return out;
      }
      return out;
    },
  },
  {
    id: 'color-accent-decorative', pass: 'color', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Accent colour spent on decoration',
    why: 'When the accent paints rules, tags and ornaments, it no longer tells the reader what to press or what changed.',
    fix: 'Keep the accent for actions, selection, focus, live state and the key data series. Decoration goes neutral.',
    check: (h) => {
      const STATE = /\b(paid|overdue|late|due|sent|error|failed|success|active|live|running|done|new|matched|selected|current|warning)\b/i;
      const out = [];
      for (const e of h.all()) {
        if (e.closest('a, button, input, select, label, summary, svg, canvas, img, video, picture, [role=img], [role=button], [role=tab], [role=status], [role=switch], [aria-current], [aria-selected=true], [aria-pressed=true], [data-state]')) continue;
        const r = h.rect(e);
        if (r.width <= 12 && r.height <= 12) continue;
        const s = h.cs(e);
        const paint = [s.backgroundColor, s.borderTopColor, s.borderLeftColor, ...h.colorTokens(s.backgroundImage)].map((t) => h.rgba(t));
        const textPaint = h.own(e) ? h.rgba(s.color) : null;
        const used = paint.some((c) => h.saturated(c)) || h.saturated(textPaint);
        if (!used) continue;
        if (STATE.test(e.textContent || '') && (e.textContent || '').length < 60) continue;
        out.push({ el: h.sel(e), detail: 'accent on a non-interactive, non-state element' });
      }
      return out.length >= 4 ? out : [];
    },
  },
  {
    id: 'layout-stock-dark-launch', pass: 'layout', severity: 'major', scope: 'page', viewports: ['desktop'],
    title: 'Stock dark launch hero',
    why: 'Black hero, centred headline, one hot pill button and an install-command chip is the default component-library launch page; on a product that is not a developer tool it says nothing about the product.',
    fix: 'Start from the project read: show the product, pick a combination for this audience, drop the install chip unless people really install it.',
    check: (h) => {
      const h1 = document.querySelector('h1');
      if (!h1 || !h.visible(h1) || h.rect(h1).top > h.vh) return [];
      const bg = h.bgOf(h1) || { r: 0, g: 0, b: 0 };
      const dark = h.lum(bg) < 0.03;
      const centred = h.cs(h1).textAlign === 'center';
      const pill = [...document.querySelectorAll('a, button')].some((e) => {
        if (!h.visible(e) || h.rect(e).top > h.vh) return false;
        const s = h.cs(e), c = h.rgba(s.backgroundColor), k = c ? h.hsl(c) : null;
        return c && c.a > 0.8 && k.s > 0.5 && (k.h < 40 || k.h > 340) && h.px(s.borderTopLeftRadius) >= h.rect(e).height / 2 - 1;
      });
      const chip = [...document.querySelectorAll('code, pre, kbd')].some((e) => h.visible(e) && h.rect(e).top < h.vh && /\b(npm|npx|pnpm|yarn|bun|brew|pip|curl)\b/.test(e.textContent));
      return dark && centred && pill && chip ? [{ el: h.sel(h1), detail: 'dark centred hero, hot pill button and install chip' }] : [];
    },
  },
  {
    id: 'detail-showcase-ornament', pass: 'detail', severity: 'minor', scope: 'page', viewports: ['desktop'],
    title: 'Showcase effect with no job',
    why: 'Glow orbs, beams, spotlights, shimmer borders and particle fields dropped in as decoration: delete them and the message loses nothing.',
    fix: 'Remove the effect, or tie it to content (light behind the product, a beam that follows a real data flow).',
    check: (h) => {
      const re = /(^|[\s_-])(orb|beam|beams|spotlight|shimmer|particles?|sparkles?|meteors?|aurora|glow-?border|border-?beam)([\s_-]|$)/i;
      return h.all().filter((e) => re.test(typeof e.className === 'string' ? e.className : '') && !h.own(e) && h.rect(e).width * h.rect(e).height >= 4000)
        .map((e) => ({ el: h.sel(e), detail: 'decorative showcase effect without content' }));
    },
  },
];
