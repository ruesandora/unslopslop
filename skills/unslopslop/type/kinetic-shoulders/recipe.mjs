export default {
  id: 'kinetic-shoulders',
  name: 'Kinetic shoulders',
  group: 'culture',
  domains: ['web', 'social', 'motion'],
  moves: ['kinetic type', 'variable-font axis motion', 'condensed'],
  mood: ['energetic', 'loud', 'urban', 'nightlife'],
  fonts: {
    display: { family: 'Big Shoulders Display', q: 'Big+Shoulders+Display:wght@100..900', licence: 'OFL', fallback: 'Impact, "Arial Narrow", sans-serif', role: 'the lineup lines; weight axis carries the motion' },
    text: { family: 'Archivo', q: 'Archivo:wdth,wght@62..125,400..800', licence: 'OFL', fallback: 'system-ui, sans-serif' },
  },
  colours: { ground: '#0d0d0c', ink: '#f2f1ea', accent: '#c8f53c', line: '#2c2c29', scheme: 'dark' },
  ladder: [
    ['Line', 150, 72, 0.86, 0, '900 (animated from 100)', 'display', 'NIGHT TRAIN', 'text-transform:uppercase'],
    ['Heading', 32, 24, 1.05, 0.01, '800, wdth 75', 'text', 'Three stages, one ticket', 'font-variation-settings:"wdth" 75'],
    ['Body', 18, 17, 1.5, 0, 400, 'text', 'Archivo reads well at body size and narrows to match the display when it needs to.'],
    ['Label', 14, 13, 1, 0.06, '700, wdth 125', 'text', 'STAGE B · PLACEHOLDER', 'font-variation-settings:"wdth" 125;text-transform:uppercase'],
  ],
  case: 'Lineup lines in capitals; headings and body in sentence case.',
  features: { css: 'font-variation-settings: "wght" var(--w)', off: 'font-weight: 100', sample: 'NIGHT TRAIN', face: 'display', note: 'Weight is animated through the variable axis, so the width of each line changes and the lines push against each other.' },
  signature: 'Lineup lines arrive once in sequence: each slides 40 px from the left while its weight climbs from hairline 100 to black 900, the line before it settling as the next starts. About 1.4 s in total, then still.',
  use: 'Festivals, club nights, sport fixtures, launch teasers, social video title cards.',
  slop: 'When the motion loops or reacts to every scroll tick, when it delays content people need (tickets, dates), or when it is used on a calm product.',
  css: `
  .kn { padding: 48px 40px 64px; display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr); gap: 40px; align-items: end; }
  .kn h1 { margin: 0; font: 900 150px/.86 var(--f-display); text-transform: uppercase; }
  .kn h1 span { display: block; }
  .kn h2 { margin: 0 0 12px; font: 800 32px/1.05 var(--f-text); font-variation-settings: "wdth" 75; }
  .kn p { margin: 0 0 16px; font-size: 18px; max-width: 34ch; }
  .kn .lab { color: var(--accent); font: 700 14px/1 var(--f-text); font-variation-settings: "wdth" 125; letter-spacing: .06em; text-transform: uppercase; }
  @media (max-width: 760px) {
    .kn { grid-template-columns: 1fr; padding: 28px 18px 40px; gap: 24px; }
    .kn h1 { font-size: 72px; }
    .kn h2 { font-size: 24px; }
  }`,
  hero: `<div class="kn">
  <h1 id="kn-h"><span>Night train</span><span>Low tide</span><span>Sister ray</span></h1>
  <div>
    <p class="lab">Placeholder lineup</p>
    <h2>Three stages, one ticket</h2>
    <p>Placeholder copy for a city festival. Act names are invented for the specimen.</p>
  </div>
</div>`,
  js: `
(() => {
  const lines = [...document.querySelectorAll('#kn-h span')];
  const ease = (x) => { x = Math.min(1, Math.max(0, x)); return 1 - Math.pow(1 - x, 4); };
  // render(t): pure function of time in ms
  const render = (t) => lines.forEach((s, i) => {
    const k = ease((t - i * 260) / 620);
    s.style.fontVariationSettings = '"wght" ' + Math.round(100 + 800 * k);
    s.style.transform = 'translateX(' + (-40 * (1 - k)).toFixed(1) + 'px)';
    s.style.opacity = String(0.25 + 0.75 * k);
  });
  const end = (lines.length - 1) * 260 + 640;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { render(end); return; }
  let t0;
  const tick = (now) => { t0 ??= now; const t = now - t0; render(t); if (t < end) requestAnimationFrame(tick); };
  render(0);
  document.fonts.ready.then(() => requestAnimationFrame(tick));
})();`,
};
