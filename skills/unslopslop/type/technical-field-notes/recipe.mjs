export default {
  id: 'technical-field-notes',
  name: 'Field notes, mono-led',
  group: 'technical',
  domains: ['web', 'dashboard', 'social'],
  moves: ['mono-led', 'width as hierarchy', 'type-only hero, no giant size'],
  mood: ['precise', 'curious', 'scientific', 'quiet'],
  fonts: {
    display: { family: 'Martian Mono', q: 'Martian+Mono:wdth,wght@75..112.5,100..800', licence: 'OFL', fallback: 'ui-monospace, Menlo, Consolas, monospace', role: 'headlines and data, width axis carries rank' },
    text: { family: 'Hanken Grotesk', q: 'Hanken+Grotesk:ital,wght@0,300..800;1,400', licence: 'OFL', fallback: 'system-ui, sans-serif', role: 'paragraphs only' },
    mono: { family: 'Martian Mono', q: 'Martian+Mono:wdth,wght@75..112.5,100..800', licence: 'OFL', fallback: 'ui-monospace, Menlo, monospace' },
  },
  colours: { ground: '#e7eae4', ink: '#111915', accent: '#1d5a3a', line: '#a9b2a8' },
  ladder: [
    ['Display (narrow)', 56, 34, 1.05, -0.02, '300, wdth 75', 'display', 'Soil moisture, week 14', 'font-variation-settings:"wdth" 75'],
    ['Heading (wide)', 22, 18, 1.2, 0, '600, wdth 112', 'display', 'SENSOR 3 · NORTH BED', 'font-variation-settings:"wdth" 112.5'],
    ['Body', 18, 17, 1.6, 0, 400, 'text', 'Paragraphs stay in the grotesk; mono is for the things you would copy or compare.'],
    ['Data', 15, 14, 1.5, 0, 400, 'mono', '06:00  21.4 %  ok'],
    ['Label', 11, 11, 1.3, 0.08, '500, wdth 100', 'mono', 'LAST READ 06:00', 'text-transform:uppercase'],
  ],
  case: 'Sentence case for the narrow display; capitals only in the wide heading cut and labels, where width already separates them.',
  features: { css: 'font-variant-numeric: tabular-nums slashed-zero', off: 'font-variant-numeric: normal', sample: '0.08 · 10.40 · 2026-04-03', face: 'mono', note: 'Slashed zero tells 0 from O in ids and readings.' },
  signature: 'Rank by width, not size: one mono family at width 75 for the display line and width 112 for the heading below it. The headline is only 56 px; the narrow-light against wide-bold contrast does the work.',
  use: 'Research tools, lab and sensor products, developer docs that want warmth, data journalism notes.',
  slop: 'When mono sets whole paragraphs (reading slows), when it is chosen only to look "techy" on a product with no data, or with a terminal-green palette by reflex.',
  css: `
  .fn { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 56px; padding: 56px 40px 64px; align-items: start; }
  .fn .lbl { font: 500 11px/1.3 var(--f-mono); letter-spacing: .08em; text-transform: uppercase; margin: 0 0 18px; }
  .fn h1 { margin: 0 0 22px; font: 300 56px/1.05 var(--f-display); letter-spacing: -.02em; font-variation-settings: "wdth" 75; }
  .fn h1 b { font-weight: 700; font-variation-settings: "wdth" 112.5; letter-spacing: -.03em; }
  .fn p { margin: 0 0 14px; font-size: 19px; line-height: 1.6; max-width: 44ch; }
  .fn table { width: 100%; border-collapse: collapse; font: 400 15px/1.5 var(--f-mono); font-variant-numeric: tabular-nums slashed-zero; }
  .fn caption { text-align: left; font: 600 22px/1.2 var(--f-mono); font-variation-settings: "wdth" 112.5; padding-bottom: 12px; }
  .fn th { text-align: left; font: 500 11px/1 var(--f-mono); letter-spacing: .08em; text-transform: uppercase; padding: 8px 0; border-bottom: 2px solid var(--ink); }
  .fn td { padding: 9px 0; border-bottom: 1px solid var(--line); }
  .fn td:last-child, .fn th:last-child { text-align: right; }
  .fn .lv { display: inline-block; height: 8px; background: var(--accent); vertical-align: 1px; }
  @media (max-width: 760px) {
    .fn { grid-template-columns: 1fr; gap: 32px; padding: 32px 18px 40px; }
    .fn h1 { font-size: 34px; }
    .fn p { font-size: 17px; }
    .fn table { font-size: 14px; }
  }`,
  hero: `<div class="fn">
  <div>
    <p class="lbl">Notebook · north bed · placeholder data</p>
    <h1>Soil moisture held through the dry week, <b>except sensor 3</b></h1>
    <p>A specimen of a mono-led notebook page. The display line is narrow and light; the one phrase that matters goes wide and heavy instead of bigger.</p>
    <p>Readings are example values to show the setting.</p>
  </div>
  <table>
    <caption>SENSOR LOG</caption>
    <thead><tr><th>Time</th><th>Sensor</th><th>Moisture</th></tr></thead>
    <tbody>
      <tr><td>06:00</td><td>S1</td><td><span class="lv" style="width:62px"></span> 31.0 %</td></tr>
      <tr><td>06:00</td><td>S2</td><td><span class="lv" style="width:58px"></span> 29.4 %</td></tr>
      <tr><td>06:00</td><td>S3</td><td><span class="lv" style="width:22px"></span> 10.8 %</td></tr>
      <tr><td>06:00</td><td>S4</td><td><span class="lv" style="width:60px"></span> 30.2 %</td></tr>
    </tbody>
  </table>
</div>`,
};
