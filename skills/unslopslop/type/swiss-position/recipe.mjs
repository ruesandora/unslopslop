export default {
  id: 'swiss-position',
  name: 'Rank by position',
  group: 'calm',
  domains: ['web', 'logo-brand', 'email'],
  moves: ['type-only hero, no giant size', 'hierarchy by position', 'grid'],
  mood: ['ordered', 'cool', 'intelligent', 'restrained'],
  fonts: {
    display: { family: 'Familjen Grotesk', q: 'Familjen+Grotesk:ital,wght@0,400..700;1,400', licence: 'OFL', fallback: '"Helvetica Neue", Arial, sans-serif' },
    text: { family: 'Familjen Grotesk', q: 'Familjen+Grotesk:ital,wght@0,400..700;1,400', licence: 'OFL', fallback: '"Helvetica Neue", Arial, sans-serif' },
  },
  colours: { ground: '#e8e8e3', ink: '#111111', accent: '#d42a1e', line: '#111111' },
  ladder: [
    ['Lead', 30, 24, 1.15, -0.01, 600, 'display', 'An architecture office in a former print shop'],
    ['Column', 18, 17, 1.4, 0, 400, 'text', 'Three columns on a twelve-column grid; every block starts on a line.'],
    ['Index', 15, 15, 1.3, 0, 500, 'text', '01 Housing  02 Schools  03 Repair'],
    ['Small', 13, 13, 1.3, 0, 400, 'text', 'Placeholder city, placeholder year'],
  ],
  case: 'Sentence case, flush left, ragged right; no capitals, no centred text.',
  features: { css: 'font-variant-numeric: tabular-nums; hanging-punctuation: first', off: 'font-variant-numeric: normal', sample: '01 · 02 · 03 · 11', face: 'text', note: 'Tabular figures keep the index numbers in a column.' },
  signature: 'No line is bigger than 30 px. A twelve-column grid, the lead sentence placed at column 5 on the top line, the index at column 1 lower down, and one small red square marking the current item. Position is the hierarchy.',
  use: 'Architects, designers, cultural institutions, consultancies with something precise to say, annual reports.',
  slop: 'When the grid is invisible and the page is just small text (bland), when the red square becomes a decoration repeated everywhere, or when a giant headline is added "for impact".',
  css: `
  .sp { display: grid; grid-template-columns: repeat(12, 1fr); column-gap: 20px; padding: 32px 40px 56px; min-height: 640px; grid-template-rows: auto 1fr auto; row-gap: 40px;
    background-image: repeating-linear-gradient(90deg, transparent 0 calc((100% - 220px) / 12), rgba(17,17,17,.045) calc((100% - 220px) / 12) calc((100% - 220px) / 12 + 20px)); background-origin: content-box; background-clip: content-box; }
  .sp .nm { grid-column: 1 / 4; font: 600 18px/1.3 var(--f-display); }
  .sp .nav { grid-column: 9 / 13; display: flex; gap: 20px; font-size: 15px; }
  .sp h1 { grid-column: 5 / 11; grid-row: 2; align-self: start; margin: 64px 0 0; font: 600 30px/1.15 var(--f-display); letter-spacing: -.01em; }
  .sp .intro { grid-column: 5 / 9; grid-row: 2; align-self: end; margin: 0; font-size: 18px; line-height: 1.4; }
  .sp ol { grid-column: 1 / 4; grid-row: 3; list-style: none; margin: 0; padding: 0; font: 500 15px/1.3 var(--f-text); font-variant-numeric: tabular-nums; }
  .sp li { padding: 7px 0; border-top: 1px solid var(--line); display: flex; gap: 12px; align-items: center; }
  .sp li i { width: 10px; height: 10px; background: var(--accent); display: inline-block; margin-left: auto; }
  .sp .foot { grid-column: 9 / 13; grid-row: 3; align-self: end; font-size: 13px; margin: 0; }
  @media (max-width: 760px) {
    .sp { grid-template-columns: repeat(4, 1fr); padding: 20px 18px 40px; min-height: 0; background: none; row-gap: 24px; }
    .sp .nm { grid-column: 1 / 5; }
    .sp .nav { grid-column: 1 / 5; }
    .sp h1 { grid-column: 2 / 5; grid-row: auto; margin-top: 24px; font-size: 24px; }
    .sp .intro { grid-column: 2 / 5; grid-row: auto; font-size: 17px; }
    .sp ol, .sp .foot { grid-column: 1 / 5; grid-row: auto; }
  }`,
  hero: `<div class="sp">
  <span class="nm">Placeholder Office</span>
  <nav class="nav" aria-label="Specimen"><span>Work</span><span>Office</span><span>Contact</span></nav>
  <h1>An architecture office in a former print shop, working on housing, schools and repair.</h1>
  <p class="intro">Placeholder copy. The page has no large type; the lead sentence is ranked first because it sits alone on the top line of column five.</p>
  <ol><li>01 Housing <i aria-label="current"></i></li><li>02 Schools</li><li>03 Repair</li></ol>
  <p class="foot">Placeholder city · placeholder year</p>
</div>`,
};
