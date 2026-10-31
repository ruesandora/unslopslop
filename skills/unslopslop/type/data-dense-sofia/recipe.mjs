export default {
  id: 'data-dense-sofia',
  name: 'Dense, three widths',
  group: 'data-dense',
  domains: ['dashboard', 'mobile'],
  moves: ['condensed', 'tight setting', 'width as hierarchy'],
  mood: ['busy', 'exact', 'operational', 'calm under load'],
  fonts: {
    display: { family: 'Sofia Sans Extra Condensed', q: 'Sofia+Sans+Extra+Condensed:wght@400..800', licence: 'OFL', fallback: '"Arial Narrow", sans-serif', role: 'headers and column titles' },
    text: { family: 'Sofia Sans', q: 'Sofia+Sans:wght@400..700', licence: 'OFL', fallback: 'system-ui, sans-serif' },
    mono: { family: 'Sofia Sans Semi Condensed', q: 'Sofia+Sans+Semi+Condensed:wght@400..700', licence: 'OFL', fallback: 'system-ui, sans-serif', role: 'table cells (tabular figures, no mono needed)' },
  },
  colours: { ground: '#eef0f2', ink: '#0d1117', accent: '#b8400b', line: '#c4c9cf', panel: '#e3e6ea' },
  ladder: [
    ['Screen title', 34, 28, 1, -0.005, 700, 'display', 'Dispatch, morning shift'],
    ['Column title', 15, 14, 1.1, 0.03, 700, 'display', 'ETA · DRIVER · STOP', 'text-transform:uppercase'],
    ['Cell', 15, 14, 1.3, 0, 500, 'mono', 'Route 14 · 07:42 · 3 of 9'],
    ['Body', 15, 15, 1.45, 0, 400, 'text', 'Prose is rare on this screen; when it appears it is the normal width.'],
    ['Badge', 13, 13, 1, 0.02, 700, 'mono', 'Needs you'],
  ],
  case: 'Column titles in capitals (condensed, +0.03 em); everything else sentence case.',
  features: { css: 'font-variant-numeric: tabular-nums lining-nums', off: 'font-variant-numeric: proportional-nums', sample: '07:42 · 11:08 · 3 of 9', face: 'mono', note: 'Times and counts line up in columns; the semi-condensed width saves a column on a laptop.' },
  signature: 'One family in three widths sets the rank: extra condensed for titles and headers, semi condensed for cells, normal for prose. Dense, but every row breathes at 1.3.',
  use: 'Operations dashboards, dispatch, logistics, support queues, trading screens, admin tables.',
  slop: 'When a landing page borrows it to look "data-driven", when KPI tiles with giant numbers sit on top, or when every row gets a coloured pill.',
  css: `
  .dd2 { padding: 28px 40px 44px; }
  .dd2 header { display: flex; justify-content: space-between; align-items: baseline; gap: 20px; margin-bottom: 14px; }
  .dd2 h1 { margin: 0; font: 700 34px/1 var(--f-display); letter-spacing: -.005em; }
  .dd2 header p { margin: 0; font-size: 15px; }
  .dd2 table { width: 100%; border-collapse: collapse; font: 500 15px/1.3 var(--f-mono); font-variant-numeric: tabular-nums; }
  .dd2 th { text-align: left; font: 700 15px/1.1 var(--f-display); letter-spacing: .03em; text-transform: uppercase; padding: 8px 10px; background: var(--panel); border-bottom: 2px solid var(--ink); }
  .dd2 td { padding: 9px 10px; border-bottom: 1px solid var(--line); white-space: nowrap; }
  .dd2 tr.hot td { background: #fbe9df; }
  .dd2 .b { font: 700 13px/1 var(--f-mono); color: var(--accent); border: 1.5px solid var(--accent); padding: 3px 6px; }
  .dd2 .num { text-align: right; }
  @media (max-width: 760px) {
    .dd2 { padding: 18px 12px 32px; }
    .dd2 header { flex-direction: column; gap: 6px; }
    .dd2 h1 { font-size: 28px; }
    .dd2 table { font-size: 14px; }
    .dd2 .hide { display: none; }
    .dd2 td, .dd2 th { padding: 8px 6px; }
  }`,
  hero: `<div class="dd2">
  <header><h1>Dispatch, morning shift</h1><p>Example data · placeholder depot</p></header>
  <table>
    <thead><tr><th>Route</th><th>Driver</th><th class="hide">Next stop</th><th class="num">Stops</th><th class="num">ETA</th><th>State</th></tr></thead>
    <tbody>
      <tr><td>14</td><td>Placeholder A</td><td class="hide">Mill Lane</td><td class="num">3 of 9</td><td class="num">07:42</td><td>On time</td></tr>
      <tr class="hot"><td>09</td><td>Placeholder B</td><td class="hide">North Yard</td><td class="num">1 of 12</td><td class="num">08:15</td><td><span class="b">Needs you</span></td></tr>
      <tr><td>22</td><td>Placeholder C</td><td class="hide">Quay Road</td><td class="num">6 of 7</td><td class="num">07:58</td><td>On time</td></tr>
      <tr><td>05</td><td>Placeholder D</td><td class="hide">Station Hill</td><td class="num">0 of 10</td><td class="num">09:04</td><td>Loading</td></tr>
      <tr><td>31</td><td>Placeholder E</td><td class="hide">Park Row</td><td class="num">4 of 8</td><td class="num">08:31</td><td>On time</td></tr>
      <tr><td>17</td><td>Placeholder F</td><td class="hide">Canal Street</td><td class="num">2 of 6</td><td class="num">08:02</td><td>On time</td></tr>
    </tbody>
  </table>
</div>`,
};
