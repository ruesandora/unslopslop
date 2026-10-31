export default {
  id: 'technical-console',
  name: 'Console, tight',
  group: 'technical',
  domains: ['web', 'dashboard'],
  moves: ['mono-led', 'tight setting'],
  mood: ['fast', 'exact', 'dry', 'confident'],
  fonts: {
    display: { family: 'Red Hat Text', q: 'Red+Hat+Text:wght@400..700', licence: 'OFL', fallback: 'system-ui, sans-serif', role: 'headline and prose' },
    text: { family: 'Red Hat Text', q: 'Red+Hat+Text:wght@400..700', licence: 'OFL', fallback: 'system-ui, sans-serif' },
    mono: { family: 'Red Hat Mono', q: 'Red+Hat+Mono:wght@400..700', licence: 'OFL', fallback: 'ui-monospace, Menlo, monospace', role: 'commands, flags, output' },
  },
  colours: { ground: '#101214', ink: '#ebe8e1', accent: '#f0b03c', line: '#33373b', scheme: 'dark' },
  ladder: [
    ['Display', 64, 38, 1.02, -0.025, 650, 'display', 'Ship the build, not the log'],
    ['Command', 22, 16, 1.4, 0, 500, 'mono', '$ deploy --only changed'],
    ['Body', 18, 16, 1.55, 0, 400, 'text', 'Prose in the sans of the same family, so the code inside it lines up in tone.'],
    ['Output', 14, 13, 1.45, 0, 400, 'mono', '✓ 14 files  0.8 s'],
    ['Label', 12, 12, 1.2, 0.04, 600, 'mono', 'STEP 2 OF 3', 'text-transform:uppercase'],
  ],
  case: 'Sentence case everywhere; commands keep their real case; never all-caps prose.',
  features: { css: 'font-variant-numeric: tabular-nums; font-feature-settings: "zero" 1', off: 'font-variant-numeric: normal', sample: '0.80 s · 1040 ms · 0x0F', face: 'mono', note: 'Timings align in columns; the dotted or slashed zero avoids 0/O mistakes.' },
  signature: 'A superfamily pair (sans and mono drawn together) set tight: headline at -0.025 em, output at 13 to 14 px, and the only colour is the prompt mark and the one live state.',
  use: 'CLIs, developer platforms, build and deploy tools, API docs.',
  slop: 'When it dresses as a fake terminal window (dots, title bar), when every line glows, or when code samples are invented outputs posing as real benchmarks.',
  css: `
  .cs { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); gap: 56px; padding: 64px 40px 72px; align-items: center; }
  .cs h1 { margin: 0 0 18px; font: 650 64px/1.02 var(--f-display); letter-spacing: -.025em; max-width: 14ch; }
  .cs h1 code { font: 500 .78em/1 var(--f-mono); letter-spacing: -.02em; }
  .cs p { margin: 0; font-size: 19px; max-width: 42ch; }
  .cs pre { margin: 0; padding: 22px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); font: 400 15px/1.6 var(--f-mono); font-variant-numeric: tabular-nums; white-space: pre-wrap; }
  .cs pre .p { color: var(--accent); }
  .cs pre .c { font-size: 20px; font-weight: 500; }
  .cs pre .s { font: 600 12px/1 var(--f-mono); letter-spacing: .04em; text-transform: uppercase; }
  @media (max-width: 760px) {
    .cs { grid-template-columns: 1fr; gap: 28px; padding: 36px 18px 44px; }
    .cs h1 { font-size: 38px; }
    .cs p { font-size: 17px; }
    .cs pre { font-size: 13px; }
    .cs pre .c { font-size: 16px; }
  }`,
  hero: `<div class="cs">
  <div>
    <h1>Ship the build, not the log. <code>deploy</code> reads it for you.</h1>
    <p>Placeholder product copy for a deploy tool. The sans and mono come from one family, so commands sit inside sentences without a jump in tone.</p>
  </div>
<pre><span class="s">Step 2 of 3 · example output</span>
<span class="c"><span class="p">$</span> deploy --only changed</span>
  reading diff ......... 14 files
  building ............. 0.8 s
  checks ............... 3 passed
<span class="p">→</span> preview ready, waiting for approval</pre>
</div>`,
};
