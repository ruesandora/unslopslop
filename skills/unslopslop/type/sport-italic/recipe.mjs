export default {
  id: 'sport-italic',
  name: 'Matchday italic',
  group: 'culture',
  domains: ['web', 'mobile', 'social'],
  moves: ['condensed', 'true italic', 'width as hierarchy'],
  mood: ['fast', 'competitive', 'loud', 'local'],
  fonts: {
    display: { family: 'Saira', q: 'Saira:ital,wdth,wght@0,50..125,100..900;1,50..125,100..900', licence: 'OFL', fallback: '"Arial Narrow", Impact, sans-serif', role: 'width 50, black italic for headlines' },
    text: { family: 'Saira', q: 'Saira:ital,wdth,wght@0,50..125,100..900;1,50..125,100..900', licence: 'OFL', fallback: 'system-ui, sans-serif', role: 'width 100 for reading' },
  },
  colours: { ground: '#0c3b2e', ink: '#f4f6f1', accent: '#ffd23a', line: '#2a5c4c', scheme: 'dark' },
  ladder: [
    ['Headline', 250, 96, 0.88, -0.01, '900 italic, wdth 50', 'display', 'DERBY DAY', 'font-style:italic;font-variation-settings:"wdth" 50'],
    ['Fixture', 30, 24, 1.1, 0, '700, wdth 75', 'display', 'Placeholder FC v Placeholder Town', 'font-variation-settings:"wdth" 75'],
    ['Body', 18, 17, 1.5, 0, '400, wdth 100', 'text', 'One family: narrow black italic to shout, normal width to read.'],
    ['Label', 14, 13, 1, 0.08, '700, wdth 125', 'text', 'KICK-OFF · PLACEHOLDER', 'font-variation-settings:"wdth" 125;text-transform:uppercase'],
  ],
  case: 'Headlines in capitals, true italic (the drawn italic, not a slanted roman); fixtures and body in sentence case.',
  features: { css: 'font-variant-numeric: tabular-nums lining-nums', off: 'font-variant-numeric: proportional-nums', sample: '15:00 · 19:45 · Row 12', face: 'text', note: 'Kick-off times and seat rows in tabular figures.' },
  signature: 'A narrow black italic headline that leans forward, cut by the right edge of the screen on desktop (it wraps on a phone), with fixtures in the same family at normal width. Speed comes from the drawn italic and the cut, not from motion.',
  use: 'Clubs, leagues, fitness, running events, sports media and betting-free fan sites.',
  slop: 'When the italic is faked with a skew transform, when the score is set as a giant number, or when speed lines and motion blur are added.',
  css: `
  .sp2 { padding: 48px 0 64px 40px; overflow: hidden; }
  .sp2 .lab { font: 700 14px/1 var(--f-text); font-variation-settings: "wdth" 125; letter-spacing: .08em; text-transform: uppercase; color: var(--accent); }
  .sp2 h1 { margin: 10px 0 24px; font: italic 900 250px/.88 var(--f-display); font-variation-settings: "wdth" 50; letter-spacing: -.01em; white-space: nowrap; margin-right: -120px; text-transform: uppercase; }
  .sp2 ul { list-style: none; margin: 0; padding: 0 40px 0 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .sp2 li { border-top: 2px solid var(--ink); padding-top: 12px; }
  .sp2 li b { display: block; font: 700 30px/1.1 var(--f-display); font-variation-settings: "wdth" 75; }
  .sp2 li span { font-size: 17px; font-variant-numeric: tabular-nums; }
  @media (max-width: 760px) {
    .sp2 { padding: 28px 0 40px 18px; }
    .sp2 h1 { font-size: 96px; margin-right: 0; white-space: normal; }
    .sp2 ul { grid-template-columns: 1fr; padding-right: 18px; gap: 14px; }
    .sp2 li b { font-size: 24px; }
  }`,
  hero: `<div class="sp2">
  <span class="lab">Kick-off · placeholder</span>
  <h1>Derby day, Saturday</h1>
  <ul>
    <li><b>Placeholder FC v Placeholder Town</b><span>Sat 15:00 · home</span></li>
    <li><b>Placeholder Rovers v Placeholder FC</b><span>Wed 19:45 · away</span></li>
    <li><b>Placeholder FC v Placeholder United</b><span>Sat 15:00 · home</span></li>
  </ul>
</div>`,
};
