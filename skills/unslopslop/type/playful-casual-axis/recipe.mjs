export default {
  id: 'playful-casual-axis',
  name: 'Casual axis',
  group: 'playful',
  domains: ['web', 'mobile', 'social', 'motion'],
  moves: ['variable-font axis motion', 'kinetic type'],
  mood: ['playful', 'friendly', 'curious', 'bright'],
  fonts: {
    display: { family: 'Recursive', q: 'Recursive:slnt,wght,CASL,CRSV,MONO@-15..0,300..1000,0..1,0..1,0..1', licence: 'OFL', fallback: 'system-ui, sans-serif', role: 'one family, axes do all the work' },
    text: { family: 'Recursive', q: 'Recursive:slnt,wght,CASL,CRSV,MONO@-15..0,300..1000,0..1,0..1,0..1', licence: 'OFL', fallback: 'system-ui, sans-serif' },
    mono: { family: 'Recursive', q: 'Recursive:slnt,wght,CASL,CRSV,MONO@-15..0,300..1000,0..1,0..1,0..1', licence: 'OFL', fallback: 'ui-monospace, monospace', role: 'MONO axis at 1' },
  },
  colours: { ground: '#f7e7a8', ink: '#1d1936', accent: '#d8402a', line: '#c9b56f' },
  ladder: [
    ['Display', 116, 56, 0.95, -0.02, '850, CASL 1', 'display', 'Wobble on purpose', 'font-variation-settings:"CASL" 1'],
    ['Heading', 32, 24, 1.1, -0.01, '700, CASL 0.6', 'display', 'Pick a card, any card', 'font-variation-settings:"CASL" .6'],
    ['Body', 19, 17, 1.55, 0, '400, CASL 0', 'text', 'Body text stays linear (CASL 0) so it reads calmly next to the loose headline.', 'font-variation-settings:"CASL" 0'],
    ['Code', 15, 14, 1.5, 0, '400, MONO 1', 'mono', 'score += 1', 'font-variation-settings:"MONO" 1'],
    ['Label', 13, 12, 1.2, 0.02, '700, CASL 1, slnt -10', 'display', 'Round 3', 'font-variation-settings:"CASL" 1,"slnt" -10'],
  ],
  case: 'Sentence case; the loose (casual) setting only on display lines and labels, the strict one on body.',
  features: { css: 'font-variation-settings: "CASL" 1, "CRSV" 1, "slnt" -12', off: 'font-variation-settings: "CASL" 0, "CRSV" 0, "slnt" 0', sample: 'Ready, set, a g y', face: 'display', note: 'Cursive forms (CRSV) swap in single-storey a and g once slant passes -14.' },
  signature: 'One play of the axes: on load the headline letters ease from strict to casual (CASL 0 to 1) and lean in one by one over 900 ms, then hold still. Hover on a label repeats it for that label only.',
  use: 'Games, toys, learning apps for older kids and adults, creative tools, friendly consumer products.',
  slop: 'When the axes loop forever, when every element wobbles, or when the casual setting is used for body text and forms.',
  css: `
  .ca { padding: 72px 40px 80px; display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); gap: 48px; align-items: end; }
  .ca h1 { margin: 0; font: 850 116px/.95 var(--f-display); letter-spacing: -.02em; }
  .ca p { margin: 0 0 18px; font-size: 20px; line-height: 1.55; font-variation-settings: "CASL" 0; max-width: 36ch; }
  .ca code { font: 400 16px/1.5 var(--f-mono); font-variation-settings: "MONO" 1; background: #fff6cf; padding: 2px 6px; }
  .ca .tag { display: inline-block; font: 700 14px/1 var(--f-display); font-variation-settings: "CASL" 1, "slnt" -10; border: 2px solid var(--ink); border-radius: 999px; padding: 9px 14px; margin: 0 6px 6px 0; }
  .ca .tag:first-of-type { background: var(--ink); color: var(--ground); }
  @media (max-width: 760px) {
    .ca { grid-template-columns: 1fr; padding: 40px 18px 48px; gap: 28px; }
    .ca h1 { font-size: 56px; }
    .ca p { font-size: 17px; }
  }`,
  hero: `<div class="ca">
  <h1 id="ca-h">Wobble on purpose, then sit still.</h1>
  <div>
    <p>Placeholder copy for a card game. The headline moves once from strict to casual; the paragraph stays strict so it reads.</p>
    <p><code>score += 1</code> is the same family with the mono axis on.</p>
    <span class="tag">Round 3</span><span class="tag">Two players</span>
  </div>
</div>`,
  js: `
(() => {
  const h = document.getElementById('ca-h');
  const letters = [];
  const wrap = (node) => {
    for (const n of [...node.childNodes]) {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        for (const ch of n.textContent) { if (!ch.trim()) { frag.appendChild(document.createTextNode(ch)); continue; } const s = document.createElement('span'); s.textContent = ch; frag.appendChild(s); letters.push(s); }
        n.replaceWith(frag);
      } else wrap(n);
    }
  };
  wrap(h);
  const ease = (x) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
  // render(t): pure function of time in ms
  const render = (t) => letters.forEach((s, i) => {
    const k = ease((t - i * 28) / 520);
    s.style.fontVariationSettings = '"CASL" ' + k.toFixed(3) + ', "slnt" ' + (-8 * k).toFixed(2);
  });
  const end = letters.length * 28 + 560;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { render(end); return; }
  let t0;
  const tick = (now) => { t0 ??= now; const t = now - t0; render(t); if (t < end) requestAnimationFrame(tick); };
  render(0);
  document.fonts.ready.then(() => requestAnimationFrame(tick));
})();`,
};
