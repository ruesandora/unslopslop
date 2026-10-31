export default {
  id: 'children-reading',
  name: 'First reader',
  group: 'children',
  domains: ['web', 'mobile'],
  moves: ['airy setting', 'reading-first text face', 'rounded display'],
  mood: ['warm', 'encouraging', 'playful', 'clear'],
  fonts: {
    display: { family: 'Grandstander', q: 'Grandstander:wght@400..900', licence: 'OFL', fallback: '"Comic Neue", system-ui, sans-serif', role: 'titles and buttons' },
    text: { family: 'Andika', q: 'Andika:ital,wght@0,400;0,700;1,400', licence: 'OFL', fallback: 'system-ui, sans-serif', role: 'reading text; letter shapes drawn for early readers' },
  },
  colours: { ground: '#e3f2ff', ink: '#14213d', accent: '#ff7a1a', line: '#a9cbe8', panel: '#ffffff' },
  ladder: [
    ['Title', 72, 44, 1.05, 0, 800, 'display', 'Milo finds a map'],
    ['Button', 26, 24, 1, 0, 700, 'display', 'Read to me'],
    ['Story text', 28, 24, 1.7, 0.01, 400, 'text', 'The map was under the big blue rug.'],
    ['Body', 19, 18, 1.6, 0.01, 400, 'text', 'For grown-ups: Andika has a single-storey a and g, and an l with a tail, so letters are not mixed up.'],
  ],
  case: 'Sentence case only. Never all capitals for children: word shapes are how they read.',
  features: { css: 'font-variant-ligatures: none; letter-spacing: 0.01em', off: 'font-variant-ligatures: normal', sample: 'a g l I 1 · fly first', face: 'text', note: 'Ligatures off and a hair of tracking keep each letter separate for early readers.' },
  signature: 'The story text is the largest reading size on the screen (28 px, line height 1.7), and the word being read aloud gets a thick orange underline that moves word by word.',
  use: 'Reading and learning apps, children’s books online, school tools for ages four to nine.',
  slop: 'When the rounded display face sets paragraphs, when every element bounces, or when text is set on a busy illustration.',
  css: `
  .cr { padding: 56px 40px 64px; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); gap: 56px; align-items: center; }
  .cr h1 { margin: 0 0 22px; font: 800 72px/1.05 var(--f-display); }
  .cr .btn { display: inline-block; font: 700 26px/1 var(--f-display); background: var(--accent); color: var(--ink); padding: 18px 28px; border-radius: 999px; text-decoration: none; box-shadow: 0 4px 0 #c45500; }
  .cr .page { background: var(--panel); border-radius: 24px; padding: 36px 40px; box-shadow: 0 2px 0 var(--line), 0 18px 40px -24px rgba(20, 33, 61, .45); }
  .cr .page p { margin: 0 0 14px; font: 400 28px/1.7 var(--f-text); letter-spacing: .01em; font-variant-ligatures: none; }
  .cr .page mark { background: none; color: inherit; text-decoration: underline 5px var(--accent); text-underline-offset: 7px; }
  .cr .note { margin: 18px 0 0; font-size: 18px; }
  @media (max-width: 760px) {
    .cr { grid-template-columns: 1fr; padding: 32px 18px 40px; gap: 28px; }
    .cr h1 { font-size: 44px; }
    .cr .btn { font-size: 24px; }
    .cr .page { padding: 24px 22px; }
    .cr .page p { font-size: 24px; }
  }`,
  hero: `<div class="cr">
  <div>
    <h1>Milo finds a map</h1>
    <a class="btn" href="#">Read to me</a>
    <p class="note">Placeholder story for a reading app.</p>
  </div>
  <div class="page">
    <p>The map was under the big blue rug.</p>
    <p>Milo <mark>held</mark> it up to the light.</p>
  </div>
</div>`,
};
