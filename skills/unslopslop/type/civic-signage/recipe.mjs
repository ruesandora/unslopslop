export default {
  id: 'civic-signage',
  name: 'Civic signage',
  group: 'civic',
  domains: ['web', 'mobile', 'email'],
  moves: ['plain sans system', 'tight setting'],
  mood: ['plain', 'trustworthy', 'direct', 'accessible'],
  fonts: {
    display: { family: 'Overpass', q: 'Overpass:wght@400..900', licence: 'OFL', fallback: '"Highway Gothic", system-ui, sans-serif', role: 'headings and buttons' },
    text: { family: 'Public Sans', q: 'Public+Sans:ital,wght@0,400..700;1,400', licence: 'OFL', fallback: 'system-ui, sans-serif' },
    mono: { family: 'Overpass Mono', q: 'Overpass+Mono:wght@400..600', licence: 'OFL', fallback: 'ui-monospace, monospace', role: 'reference numbers only' },
  },
  colours: { ground: '#ffffff', ink: '#0f2340', accent: '#00703c', line: '#b1b9c4', panel: '#f1f3f6' },
  ladder: [
    ['Page title', 56, 36, 1.05, -0.012, 800, 'display', 'Renew a parking permit'],
    ['Step', 28, 22, 1.2, -0.005, 700, 'display', 'Check your vehicle'],
    ['Body', 19, 18, 1.55, 0, 400, 'text', 'Text at 19 px, lines under 70 characters, no text lighter than the ink.'],
    ['Reference', 17, 16, 1.4, 0.02, 500, 'mono', 'PRM-2049-K7'],
    ['Hint', 16, 16, 1.45, 0, 400, 'text', 'This is on your current permit.'],
  ],
  case: 'Sentence case everywhere, including buttons. No capitals except reference codes.',
  features: { css: 'font-variant-numeric: lining-nums tabular-nums slashed-zero', off: 'font-variant-numeric: normal', sample: 'PRM-2049-K7 · O0 · 1l', face: 'mono', note: 'Reference codes in mono with slashed zero so people can type them back without guessing.' },
  signature: 'Nothing decorative: a heavy, tight page title, numbered steps in the display face at heading size, and reference codes in a mono that is easy to read aloud on the phone.',
  use: 'Government and council services, forms, utilities, transit, anything where people must finish a task under stress.',
  slop: 'When a hero image or illustration is added to look friendly, when the green action colour is used for headings too, or when helper text goes grey.',
  css: `
  .cv { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); gap: 64px; padding: 56px 40px 64px; }
  .cv .crumb { font-size: 16px; margin: 0 0 18px; }
  .cv .crumb a { text-decoration: underline; }
  .cv h1 { margin: 0 0 18px; font: 800 56px/1.05 var(--f-display); letter-spacing: -.012em; }
  .cv .lede { font-size: 21px; margin: 0 0 28px; max-width: 46ch; }
  .cv ol { list-style: none; margin: 0; padding: 0; counter-reset: s; }
  .cv li { counter-increment: s; display: grid; grid-template-columns: 44px 1fr; gap: 0 14px; padding: 16px 0; border-top: 1px solid var(--line); }
  .cv li::before { content: counter(s); font: 700 20px/40px var(--f-display); width: 40px; height: 40px; text-align: center; border: 2px solid var(--ink); border-radius: 50%; }
  .cv li h2 { margin: 6px 0 4px; font: 700 28px/1.2 var(--f-display); }
  .cv li p { grid-column: 2; margin: 0; font-size: 18px; }
  .cv .btn { display: inline-block; margin-top: 24px; background: var(--accent); color: #fff; font: 700 20px/1 var(--f-display); padding: 16px 22px; text-decoration: none; box-shadow: 0 3px 0 #002d18; }
  .cv aside { background: var(--panel); padding: 28px; align-self: start; }
  .cv aside h2 { margin: 0 0 10px; font: 700 22px/1.2 var(--f-display); }
  .cv code { display: block; font: 500 22px/1.3 var(--f-mono); letter-spacing: .02em; font-variant-numeric: slashed-zero; margin: 8px 0 6px; }
  .cv aside p { margin: 0; font-size: 16px; }
  @media (max-width: 760px) {
    .cv { grid-template-columns: 1fr; gap: 32px; padding: 28px 18px 40px; }
    .cv h1 { font-size: 36px; }
    .cv .lede { font-size: 18px; }
    .cv li h2 { font-size: 22px; }
  }`,
  hero: `<div class="cv">
  <div>
    <p class="crumb"><a href="#">Parking</a> · Permits</p>
    <h1>Renew a parking permit</h1>
    <p class="lede">Placeholder service copy. It takes about ten minutes. You need your current permit and the vehicle registration.</p>
    <ol>
      <li><h2>Check your vehicle</h2><p>Placeholder step text.</p></li>
      <li><h2>Confirm your address</h2><p>Placeholder step text.</p></li>
    </ol>
    <a class="btn" href="#">Start now</a>
  </div>
  <aside><h2>Your permit reference</h2><code>PRM-2049-K7</code><p>Example code. It is printed top right on your current permit.</p></aside>
</div>`,
};
