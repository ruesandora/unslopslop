export default {
  id: 'retro-diner',
  name: 'Diner script, one word',
  group: 'retro',
  domains: ['web', 'social', 'logo-brand', 'email'],
  moves: ['script or hand-drawn accent', 'warm display'],
  mood: ['cheerful', 'generous', 'retro', 'hungry'],
  fonts: {
    display: { family: 'Shrikhand', q: 'Shrikhand', licence: 'OFL', fallback: '"Cooper Black", Georgia, serif', role: 'one word or a name, never a sentence' },
    text: { family: 'Karla', q: 'Karla:ital,wght@0,400..800;1,400', licence: 'OFL', fallback: 'system-ui, sans-serif' },
  },
  colours: { ground: '#fff4e3', ink: '#2a1610', accent: '#c8361d', line: '#e3c9a6', panel: '#fbe7c9' },
  ladder: [
    ['Name', 168, 88, 1, -0.01, 400, 'display', 'Rosie’s'],
    ['Menu heading', 30, 24, 1.15, 0.12, 800, 'text', 'ALL DAY BREAKFAST', 'text-transform:uppercase'],
    ['Item', 22, 19, 1.35, 0, 700, 'text', 'Buttermilk pancakes, maple'],
    ['Body', 18, 17, 1.55, 0, 400, 'text', 'Karla does the reading; the script face is a sign over the door.'],
    ['Price', 22, 19, 1, 0, 700, 'text', '9.50', 'font-variant-numeric:tabular-nums'],
  ],
  case: 'Script word in title case; menu headings in heavy tracked capitals; items in sentence case.',
  features: { css: 'font-variant-numeric: tabular-nums lining-nums', off: 'font-variant-numeric: proportional-nums', sample: '9.50 · 11.00 · 7.25', face: 'text', note: 'Prices align in a column with tabular figures; dot leaders done with a flex gap, not typed dots.' },
  signature: 'One fat script word as the sign, tilted by nothing, followed by a dense, heavy-capitals menu in a plain grotesk: the contrast is the warmth.',
  use: 'Diners, bakeries, ice cream, food trucks, small brands with a name worth shouting.',
  slop: 'When the script sets a whole headline, when it is tilted or given a sticker, or when it is paired with another decorative face.',
  css: `
  .dn { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 56px; padding: 56px 40px 64px; align-items: start; }
  .dn h1 { margin: 0; font: 400 168px/1 var(--f-display); letter-spacing: -.01em; color: var(--accent); }
  .dn .sub { font: 800 20px/1.2 var(--f-text); letter-spacing: .14em; text-transform: uppercase; margin: 8px 0 18px; }
  .dn p { margin: 0; font-size: 19px; max-width: 36ch; }
  .dn .menu { background: var(--panel); padding: 28px 32px; }
  .dn h2 { margin: 0 0 14px; font: 800 30px/1.15 var(--f-text); letter-spacing: .12em; text-transform: uppercase; }
  .dn ul { list-style: none; margin: 0; padding: 0; }
  .dn li { display: flex; gap: 12px; align-items: baseline; padding: 10px 0; border-top: 1px solid var(--line); font: 700 22px/1.35 var(--f-text); }
  .dn li span { flex: 1; }
  .dn li small { display: block; font: 400 16px/1.4 var(--f-text); }
  .dn li b { font-variant-numeric: tabular-nums; }
  @media (max-width: 760px) {
    .dn { grid-template-columns: 1fr; padding: 32px 18px 40px; gap: 28px; }
    .dn h1 { font-size: 88px; }
    .dn .menu { padding: 20px 18px; }
    .dn h2 { font-size: 24px; }
    .dn li { font-size: 19px; }
  }`,
  hero: `<div class="dn">
  <div>
    <h1>Rosie’s</h1>
    <p class="sub">Diner · open early</p>
    <p>Placeholder copy for a diner. The script is the sign over the door; everything you read to order is in a plain, heavy grotesk.</p>
  </div>
  <div class="menu">
    <h2>All day breakfast</h2>
    <ul>
      <li><span>Buttermilk pancakes<small>Placeholder description</small></span><b>9.50</b></li>
      <li><span>Eggs, two ways<small>Placeholder description</small></span><b>11.00</b></li>
      <li><span>Hash browns<small>Placeholder description</small></span><b>7.25</b></li>
    </ul>
  </div>
</div>`,
};
