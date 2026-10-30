// Fixtures for the bland rules (the opposite failure mode) and for the craft score.
// Each fixture is a full page (`html`). `good` is the near miss: the same page with the one missing
// quality added back. RICH is a small page that earns a passing craft score; DOC is the plain
// stripped document the bland rules exist to catch.
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';

const font = (f) => pathToFileURL(fileURLToPath(new URL(`../examples/assets/fonts/${f}`, import.meta.url))).href;
const FACES = `@font-face{font-family:"Schibsted Grotesk";src:url("${font('schibsted-grotesk-latin-var.woff2')}") format("woff2");font-weight:400 900;font-display:block}
@font-face{font-family:"Atkinson Hyperlegible Next";src:url("${font('atkinson-hyperlegible-next-latin-var.woff2')}") format("woff2");font-weight:200 800;font-display:block}`;
const PRELOAD = `<link rel="preload" as="font" type="font/woff2" crossorigin href="${font('schibsted-grotesk-latin-var.woff2')}"><link rel="preload" as="font" type="font/woff2" crossorigin href="${font('atkinson-hyperlegible-next-latin-var.woff2')}">`;

const BASE_CSS = `${FACES}
*{box-sizing:border-box}
body{margin:0;font:17px/1.6 "Atkinson Hyperlegible Next",system-ui,sans-serif;color:#e9e6df;background:#101317}
h1,h2{font-family:"Schibsted Grotesk",sans-serif;font-weight:600;margin:0 0 16px;line-height:1.05}
h1{font-size:64px}
p{margin:0 0 16px;max-width:60ch}
.wrap{max-width:1200px;margin:0 auto;padding:64px 32px}
.hero{display:grid;grid-template-columns:1fr 1.1fr;gap:48px;align-items:center}
.cta{display:inline-block;padding:12px 20px;border-radius:8px;background:#3b5bff;color:#fff;text-decoration:none}
.panel{border-radius:12px;background:#1a1f27;box-shadow:0 1px 0 rgba(255,255,255,.06) inset,0 24px 48px -24px rgba(0,0,0,.25);padding:24px;min-height:420px}
.row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #2a303a}
.bar{height:8px;border-radius:4px;background:#3b5bff;transform-origin:left;animation:fill 1.6s cubic-bezier(.16,1,.3,1) 1 both}
@keyframes fill{from{transform:scaleX(.2)}to{transform:scaleX(1)}}
.lit{background-image:radial-gradient(60% 50% at 70% 40%,rgba(59,91,255,.12),transparent 70%)}
@media (max-width:760px){.hero{grid-template-columns:1fr}.wrap{padding:32px 16px}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}`;

const ROWS = Array.from({ length: 7 }, (_, i) => `<div class="row"><span>Invoice ${i + 41}</span><span>Day ${i * 2 + 1}</span></div>`).join('');
const PANEL = `<div class="panel" aria-label="Example invoice schedule"><div class="bar"></div>${ROWS}</div>`;
const HERO = (visual = PANEL, h1 = 'Late invoices, chased politely') =>
  `<section class="hero"><div><h1>${h1}</h1><p>Reminders go out on day 3, 7 and 14 and stop the moment the money lands.</p><a class="cta" href="#start">Connect invoices</a></div>${visual}</section>`;

export function cpage({ css = '', body, bodyClass = 'lit' }) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>fixture</title>${PRELOAD}<style>${BASE_CSS}
${css}</style></head><body class="${bodyClass}"><main class="wrap">${body}</main></body></html>`;
}

export const RICH = cpage({ body: HERO() });
// TASTE_GOOD earns every taste component: one muted drawing (about 45% of the first screen, no labels, so a
// subject and not a chart), a 100 px display line crossing it, one flat ground, no coloured keyword.
const drawing = (w, h) => `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="max-width:100%;height:auto" role="img" aria-label="Example drawing">${Array.from({ length: 14 }, (_, i) => `<circle cx="${40 + i * 60}" cy="${h / 2 + Math.sin(i) * h / 4}" r="${18 + (i % 4) * 8}" fill="hsl(${190 + i * 9} 22% ${34 + (i % 5) * 6}%)"/>`).join('')}</svg>`;
export const TASTE_GOOD = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>fixture</title>${PRELOAD}<style>${FACES}
*{box-sizing:border-box}body{margin:0;font:17px/1.6 "Atkinson Hyperlegible Next",system-ui,sans-serif;color:#e9e6df;background:#101317;overflow-x:hidden}
.stage{position:relative;min-height:900px;padding:64px 48px}
h1{font:600 104px/1 "Schibsted Grotesk",sans-serif;margin:0;position:relative;z-index:2;max-width:900px}
.art{position:absolute;right:48px;top:140px;width:900px;z-index:1}
.lede{position:relative;z-index:2;max-width:46ch;margin-top:32px}
.cta{display:inline-block;padding:12px 20px;border-radius:8px;background:#3b5bff;color:#fff;text-decoration:none;margin-top:16px}
.bar{height:8px;width:200px;border-radius:4px;background:#3b5bff;transform-origin:left;animation:fill 1.6s cubic-bezier(.16,1,.3,1) 1 both}
@keyframes fill{from{transform:scaleX(.2)}to{transform:scaleX(1)}}
@media (max-width:760px){h1{font-size:44px}.art{position:static;width:100%}.stage{padding:24px 16px;min-height:0}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}</style></head><body><main class="stage"><h1>Late invoices, chased politely</h1><div class="art">${drawing(900, 640)}</div><p class="lede">Reminders go out on day 3, 7 and 14 and stop the moment the money lands.</p><a class="cta" href="#start">Connect invoices</a><div class="bar" style="margin-top:24px"></div></main></body></html>`;
export const RICH_IMG = TASTE_GOOD;
export const DOC = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>doc</title><style>body{margin:0;font:17px/1.6 Georgia,serif;color:#222;background:#f6f3ec}main{max-width:640px;margin:0 auto;padding:48px 16px}h1{font-size:34px;font-weight:500}a{color:#333}</style></head>
<body><main><h1>Late invoices, chased politely</h1><p>Reminders go out on day 3, 7 and 14 and stop the moment the money lands.</p><p><a href="#s" style="background:#222;color:#fff;padding:12px 20px;text-decoration:none">Connect invoices</a></p><h2>How it works</h2><p>It reads the due date and starts a schedule.</p></main></body></html>`;

const doc = (inner, css = '') => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>f</title><style>body{margin:0;font:17px/1.6 system-ui,sans-serif;color:#222;background:#fafafa}main{max-width:640px;margin:0 auto;padding:48px 24px}${css}</style></head><body><main>${inner}</main></body></html>`;

export const BLAND_FIXTURES = {
  'bland-no-hero-visual': {
    bad: { html: cpage({ body: HERO('<p>Example schedule: day 3, day 7, day 14.</p>') }) },
    good: { html: RICH },
  },
  'bland-document-column': {
    bad: { html: doc('<h1>Field notes</h1><p>One paragraph after another, all in one narrow column, from top to bottom of the page.</p><p>Another paragraph in the same column so that nothing ever sits beside anything else.</p>') },
    good: { html: doc('<h1>Field notes</h1><div style="display:flex;gap:24px"><p style="width:300px">One paragraph in the left column with enough words to be a block.</p><p style="width:300px">A second paragraph beside it, in a column of its own.</p></div>') },
  },
  'bland-timid-display': {
    bad: { html: cpage({ css: 'h1{font-size:30px}', body: HERO() }) },
    good: { html: cpage({ css: 'h1{font-size:48px}', body: HERO() }) },
  },
  'bland-no-depth': {
    bad: { html: doc('<h1>Notes</h1><p>Flat text on one flat background with nothing raised.</p>') },
    good: { html: doc('<h1>Notes</h1><p style="box-shadow:0 8px 24px -12px rgba(0,0,0,.2);padding:16px">The same text on one raised surface.</p>') },
  },
  'bland-no-texture': {
    bad: { html: doc('<h1>Notes</h1><p>Flat fills only.</p>') },
    good: { html: doc('<h1>Notes</h1><p>Same page with a faint tonal light behind it.</p>', 'body{background-image:radial-gradient(50% 40% at 70% 20%,rgba(0,0,0,.05),transparent)}') },
  },
  'bland-monochrome': {
    bad: { html: doc('<h1>Notes</h1><p>Grey on grey. <a href="#a" style="color:#333">A grey link</a></p>') },
    good: { html: doc('<h1>Notes</h1><p>Grey text and <a href="#a" style="color:#1f6f5c">one green link</a> as the accent.</p>') },
  },
  'bland-static': {
    bad: { html: doc('<h1>Fluxly</h1><button style="background:#222;color:#fff;padding:12px 20px;border:0">Start</button><div style="width:200px;height:40px;background:#ddd"></div>') },
    good: { html: doc('<h1>Fluxly</h1><button style="background:#222;color:#fff;padding:12px 20px;border:0">Start</button><div class="m" style="width:200px;height:40px;background:#ddd"></div>', '.m{animation:grow 1.2s ease-out 1 both}@keyframes grow{from{transform:scaleX(.3)}to{transform:none}}') },
  },
  'bland-empty-first-screen': {
    bad: { html: doc('<p style="margin-top:300px">Hello.</p>') },
    good: { html: cpage({ body: HERO() }) },
  },
  'bland-default-serif': {
    bad: { html: doc('<h1>Notes</h1><p>Text.</p>', 'h1{font-family:Georgia,serif}') },
    good: { html: cpage({ body: '<h1>Notes</h1><p>Text.</p>' }) },
  },
};
