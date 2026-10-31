export default {
  id: 'editorial-caslon-mixed',
  name: 'Caslon, mixed case',
  group: 'editorial',
  domains: ['web', 'email', 'social'],
  moves: ['serif display', 'mixed-case editorial'],
  mood: ['literary', 'considered', 'warm', 'unhurried'],
  fonts: {
    display: { family: 'Libre Caslon Display', q: 'Libre+Caslon+Display', licence: 'OFL', fallback: '"Iowan Old Style", Georgia, serif' },
    text: { family: 'Libre Caslon Text', q: 'Libre+Caslon+Text:ital,wght@0,400;0,700;1,400', licence: 'OFL', fallback: 'Georgia, serif', role: 'body, deck and the italic swap word' },
  },
  colours: { ground: '#f1ece1', ink: '#1c1915', accent: '#7d2418', line: '#cbbfa8' },
  ladder: [
    ['Display', 112, 54, 0.98, -0.012, 400, 'display', 'A slow <i style="font-family:var(--f-text)">history</i>'],
    ['Section', 44, 30, 1.1, -0.005, 400, 'display', 'The kitchen table'],
    ['Deck', 24, 20, 1.4, 0, 400, 'text', '<i>Four rooms, three tables and the people who kept them</i>'],
    ['Body', 19, 17, 1.6, 0, 400, 'text', 'Set in the text cut, never the display cut: the display hairlines break up below 30 px.'],
    ['Label', 13, 12, 1.3, 0.14, 700, 'text', 'BY THE EDITORS · ESSAY', 'text-transform:uppercase'],
  ],
  case: 'Sentence case for headlines; one word per headline swapped into the italic at the same size; labels in tracked capitals at 13 px.',
  features: { css: 'font-variant-numeric: oldstyle-nums proportional-nums; font-feature-settings: "liga" 1, "dlig" 1', off: 'font-variant-numeric: lining-nums', sample: 'Issue 1924 · pages 36 to 48', note: 'Old-style figures sit inside reading text; switch to lining only in tables.' },
  signature: 'The italic swap: one word of a roman display line set in the text italic at display size, so the line changes voice mid-sentence.',
  use: 'Long reads, essays, publishers, cultural newsletters, any page whose job is to be read slowly.',
  slop: 'When every headline gets an italic word (it becomes a tic), when the italic word is also coloured (the coloured keyword tell), or when it heads a SaaS page that has nothing to say.',
  css: `
  .ed { display: grid; grid-template-columns: 1fr 1fr; gap: 0 56px; padding: 40px 40px 64px; }
  .ed .mast { grid-column: 1 / -1; display: flex; justify-content: space-between; font: 700 13px/1 var(--f-text); letter-spacing: .14em; text-transform: uppercase; padding-bottom: 14px; border-bottom: 3px double var(--ink); }
  .ed h1 { grid-column: 1 / -1; margin: 48px 0 24px; font: 400 112px/.98 var(--f-display); letter-spacing: -.012em; max-width: 13ch; }
  .ed h1 i { font-family: var(--f-text); font-size: .94em; letter-spacing: -.03em; }
  .ed h1 .sc { font-size: .5em; letter-spacing: .12em; vertical-align: .62em; margin-right: .2em; }
  .ed .deck { margin: 0; font: italic 400 24px/1.4 var(--f-text); max-width: 30ch; }
  .ed .cols { columns: 2; column-gap: 32px; font-size: 18px; line-height: 1.6; font-variant-numeric: oldstyle-nums; }
  .ed .cols p { margin: 0 0 12px; }
  .ed .cols p:first-child::first-letter { float: left; font: 400 76px/.8 var(--f-display); padding: 6px 8px 0 0; color: var(--accent); }
  .ed .rule { grid-column: 1 / -1; height: 1px; background: var(--ink); margin: 0 0 24px; }
  @media (max-width: 760px) {
    .ed { grid-template-columns: 1fr; padding: 24px 18px 40px; }
    .ed h1 { font-size: 54px; margin: 28px 0 18px; }
    .ed .deck { font-size: 20px; margin-bottom: 20px; }
    .ed .cols { columns: 1; font-size: 17px; }
  }`,
  hero: `<article class="ed">
  <div class="mast"><span>The Long Table</span><span>Essay</span></div>
  <h1><span class="sc">THE</span>slow <i>history</i> of the kitchen table</h1>
  <div class="rule"></div>
  <p class="deck">Four rooms, three tables and the people who kept them, told in the order the chairs were added.</p>
  <div class="cols">
    <p>Placeholder essay text. Every house in the street had a table before it had a sofa, and most of the arguments that mattered happened across one. This specimen shows the text cut at reading size with old-style figures, as in 1924 or 1968.</p>
    <p>The display cut stays above 40 px. Below that its hairlines thin out, so the deck and the body use the text cut, which was drawn for small sizes.</p>
  </div>
</article>`,
};
