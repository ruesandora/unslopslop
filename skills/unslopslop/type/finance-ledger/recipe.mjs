export default {
  id: 'finance-ledger',
  name: 'Ledger, weight not size',
  group: 'finance',
  domains: ['web', 'dashboard', 'email'],
  moves: ['type-only hero, no giant size', 'hierarchy by weight', 'serif display', 'tabular figures'],
  mood: ['calm', 'exact', 'trustworthy', 'grown-up'],
  fonts: {
    display: { family: 'Spectral', q: 'Spectral:ital,wght@0,300;0,400;0,600;0,700;1,300', licence: 'OFL', fallback: 'Georgia, serif', role: 'statements, light with one heavy phrase' },
    text: { family: 'IBM Plex Sans', q: 'IBM+Plex+Sans:wght@400;500;600', licence: 'OFL', fallback: 'system-ui, sans-serif' },
    mono: { family: 'Azeret Mono', q: 'Azeret+Mono:wght@400..600', licence: 'OFL', fallback: 'ui-monospace, monospace', role: 'amounts and ids in tables' },
  },
  colours: { ground: '#f6f4ef', ink: '#10171f', accent: '#1d3f8f', line: '#c9c5bb' },
  ladder: [
    ['Statement', 44, 30, 1.25, -0.005, '300 with 600 phrase', 'display', 'Six invoices are <b style="font-weight:600">waiting on a reminder</b>'],
    ['Heading', 22, 20, 1.3, 0, 600, 'text', 'Open invoices'],
    ['Body', 18, 17, 1.55, 0, 400, 'text', 'Numbers live in sentences with their comparison, never alone at display size.'],
    ['Amount', 16, 15, 1.4, 0, 500, 'mono', '1 240.00 EUR'],
    ['Label', 13, 13, 1.3, 0.04, 500, 'text', 'Due date'],
  ],
  case: 'Sentence case throughout; no capitals except currency codes.',
  features: { css: 'font-variant-numeric: tabular-nums lining-nums; font-feature-settings: "zero" 1', off: 'font-variant-numeric: proportional-nums oldstyle-nums', sample: '1 240.00 · 18 460.50 · 307.10', face: 'mono', note: 'Amounts right-aligned with tabular figures; the serif statement uses proportional old-style figures inside sentences.' },
  signature: 'The headline is a 44 px light serif sentence with one phrase in semibold; the largest thing on screen is a statement, not a figure. Weight replaces size and colour.',
  use: 'Invoicing, accounting, banking, payroll, any money screen where calm accuracy beats excitement.',
  slop: 'When the figure is pulled out and set at 96 px (the hero-number tell), when green and red colour every amount, or when the light serif is used under 20 px.',
  css: `
  .fl { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); gap: 64px; padding: 72px 40px 80px; align-items: start; }
  .fl h1 { margin: 0 0 20px; font: 300 44px/1.25 var(--f-display); letter-spacing: -.005em; font-variant-numeric: oldstyle-nums; max-width: 20ch; }
  .fl h1 b { font-weight: 600; }
  .fl p { margin: 0 0 22px; font-size: 18px; max-width: 42ch; }
  .fl .btn { font: 600 16px/1 var(--f-text); background: var(--accent); color: #fff; padding: 14px 18px; text-decoration: none; display: inline-block; }
  .fl table { width: 100%; border-collapse: collapse; }
  .fl caption { text-align: left; font: 600 22px/1.3 var(--f-text); padding-bottom: 10px; }
  .fl th { text-align: left; font: 500 13px/1.3 var(--f-text); letter-spacing: .04em; padding: 8px 0; border-bottom: 2px solid var(--ink); }
  .fl td { padding: 12px 0; border-bottom: 1px solid var(--line); font-size: 17px; }
  .fl td.n, .fl th.n { text-align: right; font-family: var(--f-mono); font-variant-numeric: tabular-nums; font-feature-settings: "zero" 1; font-size: 16px; }
  .fl td.id { font: 400 15px/1 var(--f-mono); }
  @media (max-width: 760px) {
    .fl { grid-template-columns: 1fr; gap: 36px; padding: 40px 18px 48px; }
    .fl h1 { font-size: 30px; }
    .fl .hide { display: none; }
  }`,
  hero: `<div class="fl">
  <div>
    <h1>Six invoices are <b>waiting on a reminder</b>, two of them since the 3rd.</h1>
    <p>Placeholder copy for an invoicing tool. The statement is the hero; amounts stay in the table where they can be compared.</p>
    <a class="btn" href="#">Review reminders</a>
  </div>
  <table>
    <caption>Open invoices · example data</caption>
    <thead><tr><th>Invoice</th><th>Client</th><th class="hide">Due</th><th class="n">Amount</th></tr></thead>
    <tbody>
      <tr><td class="id">INV-0418</td><td>Placeholder client</td><td class="hide">3 Nov</td><td class="n">1 240.00</td></tr>
      <tr><td class="id">INV-0421</td><td>Placeholder client</td><td class="hide">3 Nov</td><td class="n">307.10</td></tr>
      <tr><td class="id">INV-0430</td><td>Placeholder client</td><td class="hide">9 Nov</td><td class="n">2 016.50</td></tr>
    </tbody>
  </table>
</div>`,
};
