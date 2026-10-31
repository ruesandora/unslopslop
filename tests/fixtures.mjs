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
  'type-accent-keyword': {
    bad: { body: '<h2>Invoices that <span style="color:#2a5bd7">chase themselves</span></h2>' },
    good: { body: '<h2>Invoices that <span style="color:#777">chase themselves</span></h2>' },
  },
  'type-live-number-proportional': {
    bad: { body: '<p id="t">0:00</p><script>let i=0;const t=document.getElementById("t");setInterval(()=>{t.textContent="0:0"+(++i%10)},5)</script>' },
    good: { body: '<p id="t" style="font-variant-numeric:tabular-nums">0:00</p><script>let i=0;const t=document.getElementById("t");setInterval(()=>{t.textContent="0:0"+(++i%10)},5)</script>' },
  },
  'layout-text-overlap': {
    bad: { body: '<div style="position:relative;height:60px"><p style="position:absolute;top:0;left:0">Upload failed</p><p style="position:absolute;top:4px;left:10px">Retry later</p></div>' },
    good: { body: '<div style="position:relative;height:60px"><p style="position:absolute;top:0;left:0">Upload failed</p><p style="position:absolute;top:4px;left:10px;background:#fafaf7">Retry later</p></div>' },
  },
  'color-accent-decorative': {
    bad: { body: '<p style="border-top:3px solid #2a5bd7;padding-top:8px">Part one of the story.</p><p style="border-top:3px solid #2a5bd7;padding-top:8px">Part two of the story.</p><p style="border-top:3px solid #2a5bd7;padding-top:8px">Part three of the story.</p><p style="border-top:3px solid #2a5bd7;padding-top:8px">Part four of the story.</p>' },
    good: { body: '<p style="border-top:3px solid #ccc;padding-top:8px">Part one of the story.</p><p style="border-top:3px solid #ccc;padding-top:8px">Part two of the story.</p><p style="border-top:3px solid #ccc;padding-top:8px">Part three of the story.</p><p style="border-top:3px solid #2a5bd7;padding-top:8px">Paid on 12 Oct.</p>' },
  },
  'layout-stock-dark-launch': {
    bad: { css: 'body{background:#050505;color:#eee}h1{text-align:center}.cta{background:#ff4d1a;color:#000;border-radius:999px;padding:12px 24px;display:inline-block;text-decoration:none}', body: '<p><a class="cta" href="#a">Get started</a> <code>npx create-thing</code></p>' },
    good: { css: 'body{background:#050505;color:#eee}h1{text-align:left}.cta{background:#ff4d1a;color:#000;border-radius:999px;padding:12px 24px;display:inline-block;text-decoration:none}', body: '<p><a class="cta" href="#a">Get started</a> <code>npx create-thing</code></p>' },
  },
  'detail-showcase-ornament': {
    bad: { body: '<div class="glow orb" style="width:200px;height:200px;background:#ddd" aria-hidden="true"></div>' },
    good: { body: '<div class="photo" style="width:200px;height:200px;background:#ddd" aria-hidden="true"></div>' },
  },
  'motion-shadow-animated': {
    bad: { css: '.c{transition:box-shadow 200ms ease-out}.c:hover{box-shadow:0 8px 16px rgba(0,0,0,.2)}', body: '<div class="c">Card</div>' },
    good: { css: '.c{transition:opacity 200ms ease-out}.c:hover{opacity:.9}', body: '<div class="c">Card</div>' },
  },
  'type-ai-default-font': {
    bad: { css: "h1{font-family:'Fraunces',Georgia,serif}", body: '' },
    good: { css: "h1{font-family:'Fraunces',Georgia,serif}", body: '<meta name="unslop-brief" content="font: Fraunces, the client owns a licence and it is their house face for every printed menu">' },
  },
  'type-house-pairing': {
    bad: { css: "body{font-family:'Atkinson Hyperlegible Next',system-ui,sans-serif}h1{font-family:'Schibsted Grotesk',sans-serif}", body: '' },
    good: { css: "body{font-family:'IBM Plex Sans',system-ui,sans-serif}h1{font-family:'Spectral',Georgia,serif}", body: '' },
  },
  'type-hero-number': {
    bad: { body: '<div style="font-size:64px">€18,460</div>' },
    good: { body: '<p style="font-size:24px">€18,460 outstanding, down from €21,300 on 1 Oct</p>' },
  },
  'copy-caption-sprawl': {
    bad: { body: '<h2>Revenue</h2><p style="font-size:13px;color:#666">Example data. Numbers are samples.</p><h2>Clients</h2><p style="font-size:13px;color:#666">Example data. Names are samples.</p>' },
    good: { body: '<h2>Revenue</h2><p>Revenue rose in October.</p><h2>Clients</h2><p>Eighteen clients this month.</p><footer><p style="font-size:13px">Example data. All names and numbers are samples.</p></footer>' },
  },
  'detail-paper-props': {
    bad: { css: 'body{background:#101317}.paper{background:#f3ede2;border-radius:8px;padding:16px;margin:8px;min-height:80px;box-shadow:0 8px 16px rgba(0,0,0,.2)}', body: '<div class="paper">Dear client, a letter.</div><div class="paper">Another sheet of paper.</div>' },
    good: { css: 'body{background:#101317}.panel{background:#1a1f2a;border-radius:8px;padding:16px;margin:8px;min-height:80px;box-shadow:0 8px 16px rgba(0,0,0,.2)}', body: '<div class="panel">Reminder queue</div><div class="panel">Bank feed</div>' },
  },
  'copy-emoji': {
    bad: { body: '<p>Ship it 🚀</p>' },
    good: { body: '<p>Ship it.</p>' },
  },
  'color-faded-text': {
    bad: { body: '<p style="color:#8a8a8a">This support text is faded grey on light paper.</p><p style="color:#8a8a8a">So is this second line of quiet support text.</p>' },
    good: { body: '<p style="color:#3a3a3a">This support text is dark enough to read easily.</p><p style="color:#3a3a3a">So is this second line of support text here.</p>' },
  },
  'type-heading-muted-subtitle': {
    bad: { body: '<section><h2>Three letters</h2><p style="font-size:15px;color:#777">You approve the wording once and it goes out for you.</p></section><section><h2>Your tone</h2><p style="font-size:15px;color:#777">Pick how direct each letter sounds and when it goes out.</p></section>' },
    good: { body: '<section><h2>Three letters</h2><p style="font-size:15px;color:#222">You approve the wording once and it goes out for you.</p></section><section><h2>Your tone</h2><p style="font-size:15px;color:#222">Pick how direct each letter sounds and when it goes out.</p></section>' },
  },
  'detail-stamp-sticker': {
    bad: { body: '<div style="display:inline-block;rotate:6deg;border:2px solid #333;padding:8px 16px">Paid 12 Oct</div>' },
    good: { body: '<div style="display:inline-block;padding:8px 16px">Paid on 12 Oct</div>' },
  },
  'color-rainbow-tiles': {
    bad: { body: '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">' + ['#e33d5c', '#2d7be5', '#20a36a', '#f08a1c'].map((c) => `<div style="background:${c};border-radius:8px;height:80px;color:#fff;padding:12px">Tool</div>`).join('') + '</div>' },
    good: { body: '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">' + ['#2d7be5', '#e8e8e8', '#e8e8e8', '#e8e8e8'].map((c) => `<div style="background:${c};border-radius:8px;height:80px;color:#111;padding:12px">Tool</div>`).join('') + '</div>' },
  },
  'detail-floating-chat': {
    bad: { body: '<button style="position:fixed;right:16px;bottom:16px;padding:12px 20px">Live support</button>' },
    good: { body: '<footer><a href="#help">Help and support</a></footer>' },
  },
};

// ---- page frame, app screens, visual poverty, accessibility ----
const LONG = 'Long enough text to count as real content on the page. '.repeat(3);
Object.assign(FIXTURES, {
  'page-no-heading': {
    bad: { bare: true, body: '<p>Just text with no heading anywhere.</p>' },
    good: { bare: true, body: '<h2>Title</h2><p>Text under a heading.</p>' },
  },
  'page-multiple-h1': {
    bad: { body: '<h1>Second title</h1>' },
    good: { body: '<h2>Second title</h2>' },
  },
  'page-untitled-sections': {
    bad: { body: many(2, () => `<section><p>${LONG}</p></section>`) },
    good: { body: many(2, () => `<section><h2>Part</h2><p>${LONG}</p></section>`) },
  },
  'layout-text-at-edge': {
    bad: { body: '<p style="position:relative;left:-14px">Text that sits on the screen edge.</p>' },
    good: { body: '<p>Text that keeps the page margin.</p>' },
  },
  'layout-empty-middle': {
    bad: { body: '<p>Top</p><div style="height:500px"></div><p>Bottom</p>' },
    good: { body: '<p>Top</p><div style="height:100px"></div><p>Bottom</p>' },
  },
  'layout-one-sided-hero': {
    bad: { css: 'main{margin:0}', body: '<p>One more line.</p><p>And another.</p>' },
    good: { body: '<p>One more line.</p><p>And another.</p>' },
  },
  'layout-no-focal-point': {
    bad: { css: 'h1{font-size:17px}', body: many(5, (i) => `<p>Line ${i}</p>`) },
    good: { body: many(5, (i) => `<p>Line ${i}</p>`) },
  },
  'layout-late-headline': {
    bad: { bare: true, body: '<div style="height:700px"></div><h1>Late headline</h1>' },
    good: { bare: true, body: '<h1>Early headline</h1><div style="height:700px"></div>' },
  },
  'layout-side-nav-mobile': {
    bad: { body: '<aside style="position:fixed;left:0;top:0;width:200px;height:100%;background:#eee">Menu</aside>' },
    good: { css: '@media (max-width:760px){aside{display:none}}', body: '<aside style="position:fixed;left:0;top:0;width:200px;height:100%;background:#eee">Menu</aside>' },
  },
  'layout-uneven-rows': {
    bad: { body: '<table><tbody><tr><td>A</td></tr><tr><td>B<br>B2<br>B3</td></tr><tr><td>C</td></tr></tbody></table>' },
    good: { body: '<table><tbody><tr><td>A</td></tr><tr><td>B</td></tr><tr><td>C</td></tr></tbody></table>' },
  },
  'type-mono-outside-code': {
    bad: { body: many(2, () => '<p style="font-family:ui-monospace,monospace">Revenue 42</p>') },
    good: { body: many(2, () => '<p><code style="font-family:ui-monospace,monospace">npm test</code></p>') },
  },
  'type-small-text': {
    bad: { body: many(3, () => '<p style="font-size:12px">Small print</p>') },
    good: { body: many(3, () => '<p style="font-size:14px">Small print</p>') },
  },
  'type-tiny-text': {
    bad: { body: '<p style="font-size:10px">Tiny print</p>' },
    good: { body: '<p style="font-size:13px">Small print</p>' },
  },
  'type-long-headline': {
    bad: { body: '<h2 style="max-width:300px">This headline keeps going and going across many lines of text</h2>' },
    good: { body: '<h2 style="max-width:300px">A short headline</h2>' },
  },
  'color-random-gradient': {
    bad: { body: '<div style="height:60px;background:linear-gradient(90deg,#f97316,#14b8a6,#ec4899)"></div>' },
    good: { body: '<div style="height:60px;background:linear-gradient(90deg,#f97316,#facc15)"></div>' },
  },
  'color-rainbow': {
    bad: { body: `<div style="display:flex;gap:8px">${['#ef4444', '#eab308', '#22c55e', '#0ea5e9', '#a21caf'].map((c) => `<div style="flex:1;height:60px;background:${c}"></div>`).join('')}</div>` },
    good: { body: `<div style="display:flex;gap:8px">${many(5, () => '<div style="flex:1;height:60px;background:#1f6f5c"></div>')}</div>` },
  },
  'copy-fake-data': {
    bad: { body: '<p>Acme Inc.</p>' },
    good: { body: '<p>Linden Print Works</p>' },
  },
  'detail-heavy-shadow': {
    bad: { body: many(2, () => '<div style="height:40px;margin-bottom:24px;box-shadow:0 30px 60px rgba(0,0,0,.4)"></div>') },
    good: { body: many(2, () => '<div style="height:40px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,.1)"></div>') },
  },
  'detail-version-badge': {
    bad: { body: '<span style="padding:2px 8px">BETA</span>' },
    good: { body: '<span>Beta program notes</span>' },
  },
  'detail-scroll-hint': {
    bad: { body: '<div>Scroll</div>' },
    good: { body: '<div>Scrolling is smooth in this editor</div>' },
  },
  'detail-fake-window': {
    bad: { body: `<div style="display:flex;gap:6px">${['#ef4444', '#f59e0b', '#22c55e'].map((c) => `<span style="width:12px;height:12px;border-radius:50%;background:${c}"></span>`).join('')}</div>` },
    good: { body: `<div style="display:flex;gap:6px">${many(3, () => '<span style="width:12px;height:12px;border-radius:50%;background:#1f6f5c"></span>')}</div>` },
  },
  'a11y-no-name': {
    bad: { body: '<button style="padding:12px 20px"></button>' },
    good: { body: '<button aria-label="Close" style="padding:12px 20px"></button>' },
  },
  'a11y-click-div': {
    bad: { body: '<div onclick="void 0">Click me</div>' },
    good: { body: '<div onclick="void 0" role="button" tabindex="0">Click me</div>' },
  },
  'env-dev-server': {
    bad: { body: '<script type="module" src="/@vite/client"></script>' },
    good: { body: '<script src="app.js"></script>' },
  },
  'image-poverty': {
    bad: { body: '<div style="height:2800px"></div>' },
    good: { body: `<div style="height:2800px"></div><img src="${GIF}" alt="" width="40" height="40">` },
  },
  'image-video-no-poster': {
    bad: { body: '<video width="200" height="100"></video>' },
    good: { body: `<video width="200" height="100" poster="${GIF}"></video>` },
  },
  'motion-hidden-reduced': {
    bad: { omit: ['reduced'], css: '@keyframes in{to{opacity:1}}.r{opacity:0;animation:in .5s forwards}@media (prefers-reduced-motion:reduce){.r{animation:none}}', body: '<p class="r">Reveal text</p>' },
    good: { omit: ['reduced'], css: '@keyframes in{to{opacity:1}}.r{opacity:0;animation:in .5s forwards}@media (prefers-reduced-motion:reduce){.r{opacity:1;animation:none}}', body: '<p class="r">Reveal text</p>' },
  },
  'color-faded-heading-part': {
    bad: { body: '<h2>The search took hours. <span style="color:#c8c8c4">Now it takes one line.</span></h2>' },
    good: { body: '<h2>The search took hours. <span style="color:#555">Now it takes one line.</span></h2>' },
  },
  'detail-urgency-timer': {
    bad: { body: '<p>Founding price: <span>10:21:05</span> left. <a href="#c">Claim it</a></p>' },
    good: { body: '<p>Founding price until 14 November, 18:00 CET. <a href="#c">Read the terms</a></p>' },
  },
});
