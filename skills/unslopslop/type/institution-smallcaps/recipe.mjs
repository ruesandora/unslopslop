export default {
  id: 'institution-smallcaps',
  name: 'Small-caps institution',
  group: 'civic',
  domains: ['web', 'email'],
  moves: ['small-caps system', 'serif display', 'old-style figures'],
  mood: ['scholarly', 'warm', 'rooted', 'generous'],
  fonts: {
    display: { family: 'Alegreya', q: 'Alegreya:ital,wght@0,400..800;1,400', licence: 'OFL', fallback: '"Palatino Linotype", Palatino, Georgia, serif' },
    text: { family: 'Alegreya', q: 'Alegreya:ital,wght@0,400..800;1,400', licence: 'OFL', fallback: 'Palatino, Georgia, serif' },
    accent: { family: 'Alegreya Sans SC', q: 'Alegreya+Sans+SC:wght@400;500;700', licence: 'OFL', fallback: 'system-ui, sans-serif', role: 'every label, navigation item and date' },
  },
  colours: { ground: '#1f2b24', ink: '#efe8d8', accent: '#d9b46a', line: '#3e4c43', scheme: 'dark' },
  ladder: [
    ['Display', 76, 44, 1.05, -0.005, 500, 'display', 'Letters from the <i>river</i> house'],
    ['Heading', 32, 26, 1.15, 0, 500, 'display', 'The correspondence, 1887 to 1912'],
    ['Body', 20, 18, 1.6, 0, 400, 'text', 'Old-style figures in running text: 1887, 1912, 34 letters.', 'font-variant-numeric:oldstyle-nums'],
    ['Small caps label', 16, 15, 1.3, 0.06, 500, 'accent', 'gallery four · second floor'],
    ['Small caps nav', 18, 17, 1.2, 0.04, 500, 'accent', 'visit · collection · learn'],
  ],
  case: 'True small caps (a drawn small-caps face, not shrunk capitals) for every label, date line and navigation item; sentence case for headings.',
  features: { css: 'font-variant-numeric: oldstyle-nums proportional-nums', off: 'font-variant-numeric: lining-nums', sample: 'Open 10 to 17 · Gallery 4 · 1887', face: 'text', note: 'Old-style figures blend into the small caps; faked small caps (font-size on capitals) look thin and are the tell to avoid.' },
  signature: 'A second voice made of small caps: a whole navigation, date lines and gallery labels in a drawn small-caps sans, beside a calligraphic serif, both from one superfamily.',
  use: 'Museums, archives, universities, libraries, foundations, publishers with a back catalogue.',
  slop: 'When small caps are faked by shrinking capitals, when every word becomes a small-caps label, or when a crest or seal is drawn in to look old.',
  css: `
  .sc { padding: 32px 40px 64px; }
  .sc nav { display: flex; gap: 28px; font: 500 18px/1.2 var(--f-accent); letter-spacing: .04em; padding-bottom: 18px; border-bottom: 1px solid var(--line); }
  .sc nav b { font-weight: 700; margin-right: auto; }
  .sc .body { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); gap: 56px; margin-top: 64px; align-items: end; }
  .sc .when { font: 500 16px/1.3 var(--f-accent); letter-spacing: .06em; color: var(--accent); margin: 0 0 14px; }
  .sc h1 { margin: 0; font: 500 76px/1.05 var(--f-display); letter-spacing: -.005em; }
  .sc p { margin: 0 0 16px; font-size: 20px; line-height: 1.6; font-variant-numeric: oldstyle-nums; }
  .sc dl { display: grid; grid-template-columns: auto 1fr; gap: 6px 20px; border-top: 1px solid var(--line); padding-top: 14px; }
  .sc dl div { display: contents; }
  .sc dt { font: 500 15px/1.6 var(--f-accent); letter-spacing: .06em; text-transform: none; margin: 0; }
  .sc dd { font-variant-numeric: oldstyle-nums; }
  @media (max-width: 760px) {
    .sc { padding: 20px 18px 40px; }
    .sc nav { gap: 14px; font-size: 16px; flex-wrap: wrap; }
    .sc nav b { width: 100%; }
    .sc .body { grid-template-columns: 1fr; gap: 24px; margin-top: 36px; }
    .sc h1 { font-size: 44px; }
    .sc p { font-size: 18px; }
  }`,
  hero: `<div class="sc">
  <nav aria-label="Specimen navigation"><b>the river house</b><span>visit</span><span>collection</span><span>learn</span></nav>
  <div class="body">
    <div><p class="when">exhibition · placeholder dates</p><h1>Letters from the <i>river</i> house, 1887 to 1912</h1></div>
    <div>
      <p>Placeholder exhibition text. The figures in this sentence are old-style, so 1887 and 34 sit in the line like lowercase letters.</p>
      <dl><div><dt>where</dt><dd>Gallery 4, second floor</dd></div><div><dt>entry</dt><dd>Placeholder</dd></div></dl>
    </div>
  </div>
</div>`,
};
