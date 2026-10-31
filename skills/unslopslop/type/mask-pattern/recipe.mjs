export default {
  id: 'mask-pattern',
  name: 'Letters as windows',
  group: 'culture',
  domains: ['web', 'social', 'logo-brand'],
  moves: ['text as image or mask', 'heavy display'],
  mood: ['graphic', 'sunny', 'bold', 'pop'],
  fonts: {
    display: { family: 'Dela Gothic One', q: 'Dela+Gothic+One', licence: 'OFL', fallback: '"Arial Black", Impact, sans-serif', role: 'one word, filled with a picture or pattern' },
    text: { family: 'Rethink Sans', q: 'Rethink+Sans:ital,wght@0,400..800;1,400', licence: 'OFL', fallback: 'system-ui, sans-serif' },
  },
  colours: { ground: '#f4eee2', ink: '#1a1a1a', accent: '#e4502a', line: '#d6cbb7' },
  ladder: [
    ['Masked word', 200, 92, 0.9, -0.02, 400, 'display', 'SUN'],
    ['Heading', 34, 26, 1.1, -0.01, 800, 'text', 'Open-air cinema, every Friday'],
    ['Body', 18, 17, 1.55, 0, 400, 'text', 'The word is the picture; the text beside it does the explaining.'],
    ['Label', 14, 13, 1.2, 0.04, 700, 'text', 'Season · placeholder'],
  ],
  case: 'One masked word in capitals; everything else sentence case.',
  features: { css: 'background-clip: text; color: transparent', off: 'color: currentColor', sample: 'SUMMER', face: 'display', note: 'The fill must be a real image or a drawn pattern, never a two-colour gradient (that is the gradient-text tell). Keep a solid fallback colour for print and forced colours.' },
  signature: 'One heavy word used as a window: its letters are filled with a code-drawn stripe-and-sun pattern (or a real photograph), so the type becomes the picture of the page.',
  use: 'Event posters, seasonal campaigns, travel and food brands, social cards, record covers.',
  slop: 'When the fill is a purple-to-pink gradient, when two words are masked, or when the masked word carries information people must read (it loses contrast).',
  css: `
  .mk { padding: 40px 40px 64px; }
  .mk h1 { margin: 0; font: 400 220px/.9 var(--f-display); letter-spacing: -.02em; color: var(--accent);
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300' viewBox='0 0 600 300'%3E%3Crect width='600' height='300' fill='%23e4502a'/%3E%3Cg fill='%231a1a1a'%3E%3Crect y='170' width='600' height='14'/%3E%3Crect y='200' width='600' height='12'/%3E%3Crect y='226' width='600' height='10'/%3E%3Crect y='248' width='600' height='8'/%3E%3Crect y='266' width='600' height='6'/%3E%3Crect y='282' width='600' height='4'/%3E%3C/g%3E%3Ccircle cx='300' cy='150' r='92' fill='%23ffd166'/%3E%3Crect y='150' width='600' height='20' fill='%23e4502a'/%3E%3C/svg%3E") center / cover;
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
  .mk .row { display: grid; grid-template-columns: auto 1fr 1fr; gap: 40px; align-items: start; border-top: 2px solid var(--ink); padding-top: 18px; }
  .mk .lab { font: 700 14px/1.2 var(--f-text); letter-spacing: .04em; }
  .mk h2 { margin: 0; font: 800 34px/1.1 var(--f-text); letter-spacing: -.01em; }
  .mk p { margin: 0; font-size: 18px; max-width: 40ch; }
  @media (forced-colors: active) { .mk h1 { -webkit-text-fill-color: CanvasText; background: none; } }
  @media (max-width: 760px) {
    .mk { padding: 24px 18px 40px; }
    .mk h1 { font-size: 92px; }
    .mk .row { grid-template-columns: 1fr; gap: 12px; }
    .mk h2 { font-size: 26px; }
  }`,
  hero: `<div class="mk">
  <h1>SUMMER</h1>
  <div class="row"><span class="lab">Season · placeholder</span><h2>Open-air cinema, every Friday</h2><p>Placeholder copy for an outdoor film season. The word is filled with a drawn sunset; the details sit in plain text beside it.</p></div>
</div>`,
};
