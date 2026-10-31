export default {
  id: 'retro-arcade',
  name: 'Arcade pixel',
  group: 'retro',
  domains: ['web', 'mobile', 'social'],
  moves: ['bitmap display', 'tight setting'],
  mood: ['nostalgic', 'playful', 'crisp', 'competitive'],
  fonts: {
    display: { family: 'Silkscreen', q: 'Silkscreen:wght@400;700', licence: 'OFL', fallback: '"Courier New", monospace', role: 'titles, scores and labels; snap to multiples of 8 px' },
    text: { family: 'Rubik', q: 'Rubik:wght@400..700', licence: 'OFL', fallback: 'system-ui, sans-serif' },
    mono: { family: 'Pixelify Sans', q: 'Pixelify+Sans:wght@400..700', licence: 'OFL', fallback: 'monospace', role: 'mid-size headings where Silkscreen is too blocky' },
  },
  colours: { ground: '#17122b', ink: '#f4f0ff', accent: '#ffd23f', line: '#3b3166', scheme: 'dark' },
  ladder: [
    ['Title', 96, 48, 1, 0, 700, 'display', 'PRESS START'],
    ['Heading', 32, 24, 1.15, 0, 600, 'mono', 'Level select'],
    ['Body', 18, 17, 1.55, 0, 400, 'text', 'Paragraphs never go pixel; Rubik keeps the round corners of the era without the blur.'],
    ['Label', 16, 16, 1, 0.02, 400, 'display', 'HI SCORE'],
  ],
  case: 'Pixel titles in capitals at 8 px multiples (16, 32, 48, 96); headings in sentence case in the softer pixel face; body in Rubik.',
  features: { css: 'font-smooth: never; -webkit-font-smoothing: none; font-variant-numeric: tabular-nums', off: 'font-variant-numeric: normal', sample: 'P1 001200 · P2 000800', face: 'display', note: 'Pixel faces only look crisp at whole multiples of their grid; set sizes on 8 px steps and turn smoothing off.' },
  signature: 'A pixel title that steps in once like a cartridge boot (a hard 4-frame reveal, no easing), then holds; everything readable stays in Rubik.',
  use: 'Games, game tools, indie software, music and club nights, nostalgia campaigns.',
  slop: 'When body copy is set in pixels, when the pixel face is scaled to odd sizes and blurs, or when a CRT glow and scanlines are added by reflex.',
  css: `
  .ar { padding: 72px 40px 80px; display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); gap: 48px; align-items: center; -webkit-font-smoothing: none; }
  .ar h1 { margin: 0 0 24px; font: 700 96px/1 var(--f-display); color: var(--accent); }
  .ar h1 span { display: block; }
  .ar h2 { margin: 0 0 10px; font: 600 32px/1.15 var(--f-mono); }
  .ar p { margin: 0 0 16px; font-size: 19px; max-width: 38ch; }
  .ar table { border-collapse: collapse; font: 400 16px/1 var(--f-display); font-variant-numeric: tabular-nums; }
  .ar td { padding: 8px 24px 8px 0; }
  .ar td:last-child { text-align: right; padding-right: 0; }
  .ar .boot { animation: boot 400ms steps(4, end) both; }
  @keyframes boot { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
  @media (prefers-reduced-motion: reduce) { .ar .boot { animation: none; } }
  @media (max-width: 760px) {
    .ar { grid-template-columns: 1fr; padding: 40px 18px 48px; gap: 28px; }
    .ar h1 { font-size: 48px; }
    .ar h2 { font-size: 24px; }
    .ar p { font-size: 17px; }
  }`,
  hero: `<div class="ar">
  <div>
    <h1 class="boot"><span>PRESS</span><span>START</span></h1>
    <table aria-label="Example scores"><tr><td>HI SCORE</td><td>001200</td></tr><tr><td>P2</td><td>000800</td></tr></table>
  </div>
  <div>
    <h2>Level select</h2>
    <p>Placeholder copy for a small game studio. The pixel face holds titles and scores; sentences stay in a round, readable sans.</p>
    <p>Scores in the table are example values.</p>
  </div>
</div>`,
};
