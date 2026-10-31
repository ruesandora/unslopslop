export default {
  id: 'brutalist-raw',
  name: 'Raw system',
  group: 'brutalist',
  domains: ['web', 'dashboard'],
  moves: ['tight setting', 'visible structure', 'type-only hero, no giant size'],
  mood: ['raw', 'honest', 'fast', 'unpolished'],
  fonts: {
    display: { family: 'Arimo', q: 'Arimo:ital,wght@0,400..700;1,400', licence: 'Apache 2.0', fallback: 'Arial, Helvetica, sans-serif', role: 'metric-compatible with the system default, on purpose' },
    text: { family: 'Arimo', q: 'Arimo:ital,wght@0,400..700;1,400', licence: 'Apache 2.0', fallback: 'Arial, sans-serif' },
    mono: { family: 'Cutive Mono', q: 'Cutive+Mono', licence: 'OFL', fallback: '"Courier New", monospace', role: 'dates, file sizes, indexes' },
  },
  colours: { ground: '#ffffff', ink: '#000000', accent: '#0000ee', line: '#000000' },
  ladder: [
    ['Title', 44, 30, 1.05, -0.01, 700, 'display', 'INDEX OF WORKS'],
    ['Entry', 22, 18, 1.25, 0, 400, 'text', 'Concrete, cast, untitled'],
    ['Body', 16, 16, 1.4, 0, 400, 'text', 'Default-looking on purpose: the browser blue for links, underlines left on.'],
    ['Index', 15, 14, 1.3, 0, 400, 'mono', '014  2026-03  2.4 MB'],
  ],
  case: 'Title in capitals, everything else as written. No tracking added anywhere.',
  features: { css: 'font-variant-numeric: tabular-nums', off: 'font-variant-numeric: proportional-nums', sample: '014 · 2.4 MB · 18 KB', face: 'mono', note: 'Columns line up because the index is mono; the sans gets tabular figures for sizes.' },
  signature: 'The structure is the type: a 44 px bold title in a system-metric face, a hard-ruled index table, browser-blue underlined links. Hierarchy from weight and position; nothing is large.',
  use: 'Artists and architects, archives, protest and zine sites, internal tools that should look like what they are.',
  slop: 'When it is applied to a consumer product as a costume, when a single rotated sticker or neon accent is added to "spice it up", or when the table is fake.',
  css: `
  .br { padding: 28px 40px 56px; }
  .br h1 { margin: 0 0 4px; font: 700 44px/1.05 var(--f-display); letter-spacing: -.01em; text-transform: uppercase; }
  .br .meta { font: 400 16px/1.3 var(--f-mono); margin: 0 0 24px; }
  .br table { width: 100%; border-collapse: collapse; border: 2px solid var(--ink); }
  .br th, .br td { text-align: left; border: 1px solid var(--ink); padding: 8px 10px; vertical-align: top; }
  .br th { font: 700 14px/1.2 var(--f-text); background: var(--ink); color: var(--ground); }
  .br td { font: 400 20px/1.25 var(--f-text); }
  .br td.m { font: 400 16px/1.5 var(--f-mono); font-variant-numeric: tabular-nums; white-space: nowrap; }
  .br a { color: var(--accent); }
  .br p { font-size: 16px; margin: 16px 0 0; max-width: 70ch; }
  @media (max-width: 760px) {
    .br { padding: 20px 12px 40px; }
    .br h1 { font-size: 30px; }
    .br td { font-size: 17px; }
    .br .hide { display: none; }
  }`,
  hero: `<div class="br">
  <h1>Index of works</h1>
  <p class="meta">placeholder studio / last change placeholder</p>
  <table>
    <thead><tr><th>No.</th><th>Work</th><th class="hide">Material</th><th>File</th></tr></thead>
    <tbody>
      <tr><td class="m">014</td><td><a href="#">Untitled (cast)</a></td><td class="hide">Concrete</td><td class="m">2.4 MB</td></tr>
      <tr><td class="m">013</td><td><a href="#">Stair study</a></td><td class="hide">Pine, steel</td><td class="m">1.1 MB</td></tr>
      <tr><td class="m">012</td><td><a href="#">Wall, second state</a></td><td class="hide">Brick</td><td class="m">3.0 MB</td></tr>
    </tbody>
  </table>
  <p>Placeholder entries. The page looks like a directory listing because that is what it is.</p>
</div>`,
};
