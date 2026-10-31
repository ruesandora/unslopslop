export default {
  id: 'stretch-fit',
  name: 'Fitted by width',
  group: 'culture',
  domains: ['web', 'social', 'motion'],
  moves: ['variable-font axis motion', 'width as hierarchy'],
  mood: ['bold', 'artful', 'elastic', 'confident'],
  fonts: {
    display: { family: 'Anybody', q: 'Anybody:ital,wdth,wght@0,50..150,100..900;1,50..150,100..900', licence: 'OFL', fallback: '"Arial Black", system-ui, sans-serif', role: 'titles fitted to the column by the width axis' },
    text: { family: 'Chivo', q: 'Chivo:ital,wght@0,300..800;1,400', licence: 'OFL', fallback: 'system-ui, sans-serif' },
  },
  colours: { ground: '#2433b5', ink: '#f3f0e8', accent: '#ffb3c7', line: '#4655c8', scheme: 'dark' },
  ladder: [
    ['Fitted title', 176, 72, 0.9, 0, '800, wdth fitted', 'display', 'SLOW RIVER', 'font-variation-settings:"wdth" 110'],
    ['Track', 26, 22, 1.2, 0, '700, wdth 60', 'display', 'Side A, the long version', 'font-variation-settings:"wdth" 60'],
    ['Body', 18, 17, 1.55, 0, 400, 'text', 'Chivo keeps sentences steady while the title changes shape.'],
    ['Label', 13, 12, 1.2, 0.08, '600, wdth 150', 'display', 'PLACEHOLDER RECORDS', 'font-variation-settings:"wdth" 150;text-transform:uppercase'],
  ],
  case: 'Fitted titles in capitals; track names in sentence case at a narrow width; labels wide.',
  features: { css: 'font-variation-settings: "wdth" <fitted>', off: 'font-variation-settings: "wdth" 100', sample: 'SLOW RIVER', face: 'display', note: 'A script measures the line and picks the width (60 to 150; if 60 is still too wide, the size steps down) that fills the column, so short and long titles both sit flush at the same size.' },
  signature: 'Titles are fitted to the column by the width axis, not by size: every release title spans edge to edge at the same 176 px, wide for short names and narrow for long ones. On load the width eases into place once.',
  use: 'Record labels, music releases, galleries, festivals, portfolio indexes with names of different lengths.',
  slop: 'When the width keeps animating, when every heading on the page is fitted, or when fitting squeezes text below width 60 where it stops reading.',
  css: `
  .sf2 { padding: 48px 40px 64px; }
  .sf2 .lab { color: var(--accent); font: 600 13px/1.2 var(--f-display); font-variation-settings: "wdth" 150; letter-spacing: .08em; text-transform: uppercase; display: flex; justify-content: space-between; border-bottom: 1px solid var(--line); padding-bottom: 12px; }
  .sf2 h1 { margin: 0; }
  .sf2 .fit { display: block; font: 800 176px/.9 var(--f-display); white-space: nowrap; text-transform: uppercase; padding: 14px 0 10px; border-bottom: 1px solid var(--line); }
  .sf2 .row { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 22px; }
  .sf2 h2 { margin: 0; font: 700 26px/1.2 var(--f-display); font-variation-settings: "wdth" 60; }
  .sf2 p { margin: 0; font-size: 18px; max-width: 40ch; }
  @media (max-width: 760px) {
    .sf2 { padding: 24px 18px 40px; }
    .sf2 .fit { font-size: 72px; }
    .sf2 .row { grid-template-columns: 1fr; gap: 12px; }
    .sf2 h2 { font-size: 22px; }
  }`,
  hero: `<div class="sf2">
  <div class="lab"><span>Placeholder records</span><span>Three releases</span></div>
  <h1><span class="fit">Slow river</span><span class="fit">Glass harbour</span><span class="fit">Night swimming</span></h1>
  <div class="row"><h2>Side A, the long version</h2><p>Placeholder copy for a record label. Release names are invented for the specimen; each title fills the column at the same size.</p></div>
</div>`,
  js: `
(() => {
  const els = [...document.querySelectorAll('.sf2 .fit')];
  const fit = (el) => {
    const W = el.parentElement.clientWidth;
    el.style.fontSize = '';
    let lo = 60, hi = 150;
    for (let i = 0; i < 14; i++) {
      const mid = (lo + hi) / 2;
      el.style.fontVariationSettings = '"wdth" ' + mid;
      el.style.display = 'inline-block';
      const w = el.getBoundingClientRect().width;
      el.style.display = '';
      if (w > W) hi = mid; else lo = mid;
    }
    // below width 60 the letters stop reading: keep 60 and shrink the size instead
    el.style.fontVariationSettings = '"wdth" 60'; el.style.display = 'inline-block';
    const w60 = el.getBoundingClientRect().width; el.style.display = '';
    if (lo <= 60.5 && w60 > W) el.style.fontSize = (parseFloat(getComputedStyle(el).fontSize) * W / w60).toFixed(1) + 'px';
    return lo;
  };
  const ease = (x) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
  let targets = [];
  // render(t): pure function of time in ms (width eases from 100 to the fitted value)
  const render = (t) => els.forEach((el, i) => { const k = ease(t / 700); el.style.fontVariationSettings = '"wdth" ' + (100 + (targets[i] - 100) * k).toFixed(2); });
  const run = (animate) => {
    targets = els.map(fit);
    if (!animate || matchMedia('(prefers-reduced-motion: reduce)').matches) { render(700); return; }
    let t0; const tick = (now) => { t0 ??= now; const t = now - t0; render(t); if (t < 700) requestAnimationFrame(tick); };
    render(0); requestAnimationFrame(tick);
  };
  document.fonts.ready.then(() => run(true));
  addEventListener('resize', () => run(false));
})();`,
};
