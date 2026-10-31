export default {
  id: 'zine-typewriter',
  name: 'Zine, typewriter and slab',
  group: 'brutalist',
  domains: ['web', 'social', 'email'],
  moves: ['tight setting', 'cut-out blocks', 'mixed families'],
  mood: ['rebellious', 'handmade', 'loud', 'urgent'],
  fonts: {
    display: { family: 'Bowlby One SC', q: 'Bowlby+One+SC', licence: 'OFL', fallback: 'Impact, "Arial Black", sans-serif', role: 'blocks of two or three words' },
    text: { family: 'Courier Prime', q: 'Courier+Prime:ital,wght@0,400;0,700;1,400', licence: 'OFL', fallback: '"Courier New", monospace', role: 'all reading text, like a typed page' },
  },
  colours: { ground: '#efece4', ink: '#111111', accent: '#e8432e', line: '#111111' },
  ladder: [
    ['Block', 104, 52, 0.88, -0.01, 400, 'display', 'NO MORE QUIET'],
    ['Heading', 28, 22, 1.1, 0, 400, 'display', 'ISSUE PLACEHOLDER'],
    ['Body', 18, 16, 1.55, 0, 400, 'text', 'Typewriter text for everything you read, set ragged, with real underlines.'],
    ['Note', 15, 14, 1.4, 0, 700, 'text', 'photocopy and pass it on'],
  ],
  case: 'Display in its small-caps capitals only, in blocks of two or three words; text as typed, lowercase welcome.',
  features: { css: 'font-variant-ligatures: none; font-variant-numeric: tabular-nums', off: 'font-variant-ligatures: normal', sample: 'fi fl ff · 1 2 3', face: 'text', note: 'Typewriter text has no ligatures; turn them off so fi and fl stay two letters.' },
  signature: 'Words set as cut-out blocks: each display phrase sits on its own ink or red slab, butted edge to edge with no gap and no rotation, over typewriter text.',
  use: 'Zines, activist and union campaigns, small labels, bookshops, community radio.',
  slop: 'When the blocks are tilted like stickers, when tape and torn-paper props are drawn in, or when a ransom-note mix of five fonts replaces two.',
  css: `
  .zn { padding: 48px 40px 64px; display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: 48px; }
  .zn h1 { margin: 0; font: 400 104px/.88 var(--f-display); letter-spacing: -.01em; }
  .zn h1 span { display: inline-block; padding: .06em .12em .02em; background: var(--ink); color: var(--ground); }
  .zn h1 span.r { background: var(--accent); color: var(--ink); }
  .zn h1 span.p { background: transparent; color: var(--ink); padding-left: 0; }
  .zn h2 { font: 400 28px/1.1 var(--f-display); margin: 0 0 14px; }
  .zn p { margin: 0 0 14px; font: 400 18px/1.55 var(--f-text); max-width: 40ch; font-variant-ligatures: none; }
  .zn p u { text-underline-offset: 3px; }
  .zn .note { font-weight: 700; font-size: 15px; border-top: 2px solid var(--ink); padding-top: 10px; }
  @media (max-width: 760px) {
    .zn { grid-template-columns: 1fr; padding: 28px 14px 40px; gap: 24px; }
    .zn h1 { font-size: 52px; }
    .zn h2 { font-size: 22px; }
    .zn p { font-size: 16px; }
  }`,
  hero: `<div class="zn">
  <h1><span>NO MORE</span><br><span class="r">QUIET</span><br><span class="p">MEETINGS</span></h1>
  <div>
    <h2>ISSUE PLACEHOLDER</h2>
    <p>placeholder zine text. we typed this on the office machine because the <u>printer budget</u> went to the party. bring a friend.</p>
    <p>thursday, the back room, placeholder address.</p>
    <p class="note">photocopy and pass it on</p>
  </div>
</div>`,
};
