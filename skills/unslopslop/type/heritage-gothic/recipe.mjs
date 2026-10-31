export default {
  id: 'heritage-gothic',
  name: 'Gothic heritage',
  group: 'retro',
  domains: ['web', 'logo-brand', 'social'],
  moves: ['blackletter accent', 'superfamily pair'],
  mood: ['old', 'crafted', 'dark', 'proud'],
  fonts: {
    display: { family: 'Grenze Gotisch', q: 'Grenze+Gotisch:wght@400..900', licence: 'OFL', fallback: '"Old English Text MT", Georgia, serif', role: 'the name only' },
    text: { family: 'Grenze', q: 'Grenze:ital,wght@0,400;0,600;0,700;1,400', licence: 'OFL', fallback: 'Georgia, serif', role: 'the same skeleton without the broken strokes' },
  },
  colours: { ground: '#1b1512', ink: '#efe3cf', accent: '#c78a3b', line: '#4a3a2f', scheme: 'dark' },
  ladder: [
    ['Name', 176, 92, 0.95, 0, 700, 'display', 'Brauhaus'],
    ['Heading', 34, 26, 1.1, 0.01, 700, 'text', 'Dark lager, brewed slow'],
    ['Body', 19, 17, 1.55, 0, 400, 'text', 'The text cut shares the blackletter skeleton, so the pair reads as one voice.'],
    ['Label', 14, 13, 1.2, 0.16, 600, 'text', 'CELLAR · PLACEHOLDER', 'text-transform:uppercase'],
  ],
  case: 'Blackletter never in capitals (gothic capitals stacked are unreadable); the name in title case, labels in tracked capitals in the text cut.',
  features: { css: 'font-variant-numeric: oldstyle-nums; font-feature-settings: "liga" 1', off: 'font-variant-numeric: lining-nums', sample: 'Batch 18 · 4.9 % · since placeholder', face: 'text', note: 'Old-style figures in the text cut keep numbers from shouting next to the gothic name.' },
  signature: 'A blackletter name with its own plain sibling: the display and the text are two cuts of one design, so the heritage voice continues into readable sentences.',
  use: 'Breweries, butchers, tattoo studios, metal and folk music, heritage food brands.',
  slop: 'When the blackletter sets anything but a name or a single word, when it is used in all capitals, or when it is paired with parchment and wax-seal props.',
  css: `
  .hg { padding: 56px 40px 72px; display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: 56px; align-items: end; }
  .hg .lab { font: 600 14px/1.2 var(--f-text); letter-spacing: .16em; text-transform: uppercase; margin: 0 0 8px; color: var(--accent); }
  .hg h1 { margin: 0; font: 700 176px/.95 var(--f-display); }
  .hg h2 { margin: 0 0 12px; font: 700 34px/1.1 var(--f-text); }
  .hg p { margin: 0 0 14px; font-size: 20px; line-height: 1.55; max-width: 38ch; font-variant-numeric: oldstyle-nums; }
  .hg .rule { height: 2px; background: var(--accent); width: 120px; margin: 0 0 22px; }
  @media (max-width: 760px) {
    .hg { grid-template-columns: 1fr; padding: 32px 18px 44px; gap: 24px; }
    .hg h1 { font-size: 92px; }
    .hg h2 { font-size: 26px; }
    .hg p { font-size: 17px; }
  }`,
  hero: `<div class="hg">
  <div><p class="lab">Cellar · placeholder town</p><h1>Brauhaus</h1></div>
  <div>
    <div class="rule"></div>
    <h2>Dark lager, brewed slow</h2>
    <p>Placeholder copy for a small brewery. The name is gothic; the sentences use the same design without the broken strokes, batch 18 at 4.9 % as an example.</p>
  </div>
</div>`,
};
