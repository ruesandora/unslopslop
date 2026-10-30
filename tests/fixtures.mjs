// One bad and one good fixture per rule. `good` is a near miss: same idea, done properly.
// Pages are wrapped in a clean base (see page()) that triggers no rule by itself.

const STD = '<h1>Field notes</h1><p>A short note about the week.</p>';
const CORE = `
body{margin:0;font:17px/1.6 Georgia,serif;color:#222;background:#fafaf7}
main{max-width:640px;margin:0 auto;padding:32px 16px}
h1{font-size:44px;line-height:1.1;margin:0 0 16px;font-weight:500}
h2{font-size:28px;line-height:1.25;margin:24px 0 12px;font-weight:500}
h3{font-size:20px;margin:0 0 8px;font-weight:500}
p{margin:0 0 16px;max-width:60ch}
a{color:#1a4fd6}`;
const FOCUS = 'a:focus-visible,button:focus-visible{outline:2px solid #1a4fd6;outline-offset:2px}';
const REDUCED = '@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}';
const GIF = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

export function page({ body, css = '', omit = [], bare = false }) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>fixture</title><style>${CORE}
${omit.includes('focus') ? '' : FOCUS}
${omit.includes('reduced') ? '' : REDUCED}
${css}</style></head><body><main>${bare ? '' : STD}${body}</main></body></html>`;
}

export const BASE = { body: '' };

const many = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join('');
const card3 = (inner) => `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">${inner}</div>`;
const svg = '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="#333"/></svg>';

export const FIXTURES = {
  'spacing-off-grid': {
    bad: { body: many(4, () => '<div style="padding:13px 18px 11px 22px">Row</div>') },
    good: { body: many(4, () => '<div style="padding:12px 16px 12px 24px">Row</div>') },
  },
  'spacing-cramped': {
    bad: { body: '<button style="padding:2px 4px;background:#222;color:#fff;border:0;font:inherit">Buy now</button>' },
    good: { body: '<button style="padding:12px 20px;background:#222;color:#fff;border:0;font:inherit">Buy now</button>' },
  },
  'color-purple-gradient': {
    bad: { body: '<div style="height:80px;background:linear-gradient(135deg,#6d28d9,#2563eb)"></div>' },
    good: { body: '<div style="height:80px;background:linear-gradient(135deg,#f4efe6,#e8e1d4)"></div>' },
  },
  'color-gradient-text': {
    bad: { body: '<h2 style="background:linear-gradient(90deg,#f97316,#ef4444);-webkit-background-clip:text;background-clip:text;color:transparent">Hello world</h2>' },
    good: { body: '<h2 style="color:#b8400f">Hello world</h2>' },
  },
  'color-glow': {
    bad: { body: '<div style="width:120px;height:60px;box-shadow:0 0 40px rgba(99,102,241,.6)"></div>' },
    good: { body: '<div style="width:120px;height:60px;box-shadow:0 2px 8px rgba(0,0,0,.12)"></div>' },
  },
  'color-low-contrast': {
    bad: { body: '<p style="color:#aaa">Pale grey text on a light page.</p>' },
    good: { body: '<p style="color:#555">Dark grey text on a light page.</p>' },
  },
  'color-framework-default': {
    bad: { body: '<p style="color:#6366f1">Accent text</p><div style="background:#0f172a;color:#fff;padding:16px">Dark block</div>' },
    good: { body: '<p style="color:#1f5f4a">Accent text</p><div style="background:#2b2a26;color:#fff;padding:16px">Dark block</div>' },
  },
  'icon-tile': {
    bad: { body: many(3, () => `<span style="display:inline-flex;width:44px;height:44px;border-radius:12px;background:#e0e7ff;align-items:center;justify-content:center;margin-right:8px">${svg}</span>`) },
    good: { body: many(3, () => `<span style="display:inline-flex;margin-right:8px">${svg}</span>`) },
  },
  'icon-emoji-ui': {
    bad: { body: '<h2>🚀 Launch</h2><h2>✨ Features</h2>' },
    good: { body: '<h2>Launch</h2><h2>Features</h2>' },
  },
  'copy-cliche': {
    bad: { body: '<h2>Unleash seamless productivity</h2>' },
    good: { body: '<h2>Weekly report for four regions</h2>' },
  },
  'copy-contrast-formula': {
    bad: { body: "<h2>Not just a tool, it's a partner</h2>" },
    good: { body: '<h2>A tool that books your meetings</h2>' },
  },
  'copy-em-dash': {
    bad: { body: '<p>One — two — three — four</p>' },
    good: { body: '<p>One, two, three, four</p>' },
  },
  'copy-trailing-period': {
    bad: { body: '<h2>Our team.</h2><h2>Our work.</h2>' },
    good: { body: '<h2>Our team</h2><h2>Our work</h2><p>Paragraphs keep their full stop.</p>' },
  },
  'copy-greeting': {
    bad: { body: '<h2>Welcome back, Sam</h2>' },
    good: { body: "<h2>This month's orders</h2>" },
  },
  'copy-placeholder': {
    bad: { body: '<p>Lorem ipsum dolor sit amet</p>' },
    good: { body: '<p>The harvest opens on the second Saturday.</p>' },
  },
  'copy-unverified-proof': {
    bad: { body: '<p>Trusted by 10,000+ teams worldwide</p>' },
    good: { body: '<p>Used by 214 teams, per our billing records, March 2026</p>' },
  },
  'type-reflex-font': {
    bad: { css: "body{font-family:'Inter',sans-serif}", body: '' },
    good: { css: "body{font-family:Georgia,serif}", body: '' },
  },
  'type-flat-hierarchy': {
    bad: { css: 'h1{font-size:18px}', body: many(12, (i) => `<p>Paragraph number ${i}.</p>`) },
    good: { body: many(12, (i) => `<p>Paragraph number ${i}.</p>`) },
  },
  'type-eyebrow': {
    bad: { bare: true, body: '<div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#555">Overview</div><h2>Quarterly numbers</h2>' },
    good: { bare: true, body: '<h2>Quarterly numbers</h2><div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#555">Overview</div>' },
  },
  'type-tight-leading': {
    bad: { body: `<p style="line-height:1.1">${'Tight lines are hard to follow when the paragraph runs long. '.repeat(4)}</p>` },
    good: { body: `<p style="line-height:1.6">${'Tight lines are hard to follow when the paragraph runs long. '.repeat(4)}</p>` },
  },
  'type-long-measure': {
    bad: { css: 'main{max-width:none}p{max-width:none}', body: `<p>${'A very long line of running text keeps going and going. '.repeat(14)}</p>` },
    good: { body: `<p>${'A very long line of running text keeps going and going. '.repeat(14)}</p>` },
  },
  'type-heavy-weight': {
    bad: { body: many(3, () => '<p style="font-weight:900">Heavy</p>') },
    good: { body: many(3, () => '<p style="font-weight:500">Medium</p>') },
  },
  'layout-nested-cards': {
    bad: { body: '<div style="border:1px solid #ccc;border-radius:12px;padding:16px;width:360px"><p>Outer</p><div style="border:1px solid #ccc;border-radius:8px;padding:16px"><p>Inner</p><p>More</p></div></div>' },
    good: { body: '<div style="border:1px solid #ccc;border-radius:12px;padding:16px;width:360px"><p>Outer</p><div style="padding:16px 0"><p>Inner</p><p>More</p></div></div>' },
  },
  'layout-identical-cards': {
    bad: { body: card3(many(3, () => `<div>${svg}<h3>Fast</h3><p>Short text here.</p></div>`)) },
    good: { body: card3(many(3, () => '<div><h3>Fast</h3><p>Short text here.</p></div>')) },
  },
  'layout-stat-strip': {
    bad: { body: card3(many(3, () => '<div><div style="font-size:40px">10k+</div><div style="font-size:14px">Users</div></div>')) },
    good: { body: card3(many(3, () => '<div><div style="font-size:40px">10k</div><div style="font-size:14px">users, vs 8k last month</div></div>')) },
  },
  'layout-side-stripe': {
    bad: { body: '<div style="border-left:4px solid #1a7f5a;padding:16px;background:#fff">Note text</div>' },
    good: { body: '<div style="border:1px solid #ccc;padding:16px;background:#fff">Note text</div>' },
  },
  'layout-overflow-x': {
    bad: { body: '<div style="width:2000px;height:20px;background:#ddd"></div>' },
    good: { body: '<div style="width:2000px;max-width:100%;height:20px;background:#ddd"></div>' },
  },
  'layout-tap-target': {
    bad: { body: many(4, () => '<a href="#" style="display:inline-block;padding:2px 4px;font-size:13px">link</a>') },
    good: { body: many(4, () => '<a href="#" style="display:inline-block;padding:12px 16px;font-size:16px">link</a>') },
  },
  'detail-pulse-dot': {
    bad: { css: '@keyframes p{50%{opacity:.3}}', body: '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#2a9d4f;animation:p 1.5s infinite"></span>' },
    good: { body: '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#2a9d4f"></span>' },
  },
  'detail-glass': {
    bad: { body: many(2, () => '<div style="padding:16px;background:rgba(255,255,255,.3);backdrop-filter:blur(12px)">Glass</div>') },
    good: { body: many(2, () => '<div style="padding:16px;background:#fff">Solid</div>') },
  },
  'detail-announce-pill': {
    bad: { bare: true, body: '<span style="display:inline-block;padding:4px 12px;border:1px solid #bbb;border-radius:999px;font-size:13px">New: version 2 is here</span><h1>Field notes</h1>' },
    good: { bare: true, body: '<h1>Field notes</h1>' },
  },
  'detail-numbered': {
    bad: { body: '<div>01</div><div>02</div><div>03</div>' },
    good: { body: '<ol><li>01</li><li>02</li><li>03</li></ol>' },
  },
  'detail-arrow-links': {
    bad: { body: many(3, () => '<p><a href="#">Read more →</a></p>') },
    good: { body: many(3, () => '<p><a href="#">Read more</a></p>') },
  },
  'detail-card-triple': {
    bad: { body: many(3, () => '<div style="border:1px solid #ddd;box-shadow:0 4px 12px rgba(0,0,0,.08);background:#fff;border-radius:12px;padding:16px;margin-bottom:16px"><p>Card</p><p>Text</p></div>') },
    good: { body: many(3, () => '<div style="border:1px solid #ddd;border-radius:12px;padding:16px;margin-bottom:16px"><p>Card</p><p>Text</p></div>') },
  },
  'detail-focus-ring': {
    bad: { omit: ['focus'], css: 'a{outline:none}', body: '<a href="#">link</a>' },
    good: { css: 'a{outline:none} a:focus-visible{outline:2px solid #1a4fd6}', body: '<a href="#">link</a>' },
  },
  'detail-hover-lift': {
    bad: { css: '.c:hover{transform:translateY(-4px)}', body: '<div class="c">card</div>' },
    good: { css: '.c:hover{background:#eee}', body: '<div class="c">card</div>' },
  },
  'image-blur-blob': {
    bad: { body: '<div style="position:absolute;width:320px;height:320px;filter:blur(80px);background:#a78bfa;opacity:.5"></div>' },
    good: { body: '<div style="position:absolute;width:320px;height:320px;background:#e9e4d8"></div>' },
  },
  'image-placeholder-src': {
    bad: { body: '<img src="http://127.0.0.1:1/placeholder.png" alt="" width="40" height="40">' },
    good: { body: `<img src="${GIF}" alt="" width="40" height="40">` },
  },
  'image-avatar-stack': {
    bad: { body: `<div style="display:flex">${many(4, () => '<span style="width:32px;height:32px;border-radius:50%;background:#ccc;margin-left:-10px;border:2px solid #fff"></span>')}</div>` },
    good: { body: `<div style="display:flex;gap:8px">${many(4, () => '<span style="width:32px;height:32px;border-radius:50%;background:#ccc"></span>')}</div>` },
  },
  'image-no-alt': {
    bad: { body: `<img src="${GIF}" width="40" height="40">` },
    good: { body: `<img src="${GIF}" alt="" width="40" height="40">` },
  },
  'image-broken': {
    bad: { body: '<img src="missing.png" alt="x" width="40" height="40">' },
    good: { body: `<img src="${GIF}" alt="x" width="40" height="40">` },
  },
  'motion-infinite': {
    bad: { css: '@keyframes f{50%{transform:translateY(-10px)}}', body: '<div style="width:60px;height:60px;background:#ccc;animation:f 3s ease-in-out infinite"></div>' },
    good: { css: '@keyframes f{50%{transform:translateY(-10px)}}', body: '<div style="width:60px;height:60px;background:#ccc;animation:f 300ms ease-out 1"></div>' },
  },
  'motion-entrance-everywhere': {
    bad: { body: many(6, () => '<p class="fade-up">Appears</p>') },
    good: { body: many(6, () => '<p>Appears</p>') },
  },
  'motion-no-reduced': {
    bad: { omit: ['reduced'], css: '.x{transition:opacity .2s ease}', body: '<p class="x">hi</p>' },
    good: { css: '.x{transition:opacity .2s ease}', body: '<p class="x">hi</p>' },
  },
  'motion-transition-all': {
    bad: { css: '.x{transition:all .2s ease}', body: '<p class="x">hi</p>' },
    good: { css: '.x{transition:opacity .2s ease}', body: '<p class="x">hi</p>' },
  },
};
