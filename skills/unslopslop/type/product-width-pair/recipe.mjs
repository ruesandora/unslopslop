export default {
  id: 'product-width-pair',
  name: 'Two widths, one line',
  group: 'technical',
  domains: ['web', 'mobile', 'dashboard'],
  moves: ['width as hierarchy', 'mixed widths in one line'],
  mood: ['modern', 'precise', 'friendly', 'efficient'],
  fonts: {
    display: { family: 'Mona Sans', q: 'Mona+Sans:ital,wdth,wght@0,75..125,200..900;1,75..125,200..900', licence: 'OFL', fallback: 'system-ui, sans-serif', role: 'width 75 and 125 in one headline, same weight' },
    text: { family: 'Onest', q: 'Onest:wght@400..700', licence: 'OFL', fallback: 'system-ui, sans-serif' },
    mono: { family: 'Fragment Mono', q: 'Fragment+Mono:ital@0;1', licence: 'OFL', fallback: 'ui-monospace, monospace', role: 'shortcuts and ids' },
  },
  colours: { ground: '#f5f4ef', ink: '#0f1013', accent: '#e8530e', line: '#cfccc2', panel: '#ffffff' },
  ladder: [
    ['Display', 88, 48, 1, -0.02, '500, wdth 75 + 125', 'display', 'Plan the <span style="font-variation-settings:\'wdth\' 125">week</span>', 'font-variation-settings:"wdth" 75'],
    ['Heading', 28, 22, 1.15, -0.01, '600, wdth 100', 'display', 'Drag a task onto a day'],
    ['Body', 18, 17, 1.55, 0, 400, 'text', 'Onest is a calm text face with open shapes; it never competes with the headline.'],
    ['Shortcut', 14, 14, 1.3, 0, 400, 'mono', 'Cmd K · new task'],
  ],
  case: 'Sentence case; the noun that matters goes wide, the rest stays narrow. Same weight throughout the line.',
  features: { css: 'font-variation-settings: "wdth" 75 / 125', off: 'font-variation-settings: "wdth" 100', sample: 'Plan the week', face: 'display', note: 'The contrast is horizontal, not vertical: no heavy/thin weight pair, no colour.' },
  signature: 'One headline, one weight, two widths: the verb phrase in width 75, the noun in width 125. It replaces the usual heavy-plus-thin weight pair and the coloured keyword.',
  use: 'Product sites and apps that would otherwise get the default wide grotesk: planners, editors, team tools.',
  slop: 'When every heading gets the width swap, when the wide word is also coloured, or when the whole line is set wide at 800 with tight tracking (that is the house default this recipe replaces).',
  css: `
  .pw { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 56px; padding: 72px 40px 80px; align-items: center; }
  .pw h1 { margin: 0 0 22px; font: 500 88px/1 var(--f-display); letter-spacing: -.02em; font-variation-settings: "wdth" 75; }
  .pw h1 span { font-variation-settings: "wdth" 125; letter-spacing: -.03em; }
  .pw p { margin: 0 0 22px; font-size: 19px; max-width: 40ch; }
  .pw .btn { display: inline-block; background: var(--ink); color: var(--ground); font: 600 16px/1 var(--f-text); padding: 15px 20px; text-decoration: none; border-radius: 8px; }
  .pw .btn kbd { font: 400 13px/1 var(--f-mono); border: 1px solid #55565b; padding: 3px 5px; border-radius: 4px; margin-left: 10px; }
  .pw .board { background: var(--panel); border-radius: 12px; padding: 20px; box-shadow: 0 1px 2px rgba(15,16,19,.08), 0 20px 40px -24px rgba(15,16,19,.4); display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .pw .day h2 { margin: 0 0 10px; font: 600 15px/1 var(--f-display); font-variation-settings: "wdth" 125; }
  .pw .t { font-size: 15px; padding: 10px; border: 1px solid var(--line); border-radius: 8px; margin-bottom: 8px; }
  .pw .t.now { border-color: var(--accent); box-shadow: inset 0 0 0 1px var(--accent); }
  @media (max-width: 760px) {
    .pw { grid-template-columns: 1fr; padding: 40px 18px 48px; gap: 32px; }
    .pw h1 { font-size: 48px; }
    .pw p { font-size: 17px; }
    .pw .board { grid-template-columns: 1fr 1fr; }
    .pw .day:last-child { display: none; }
  }`,
  hero: `<div class="pw">
  <div>
    <h1>Plan the <span>week</span>, not the backlog</h1>
    <p>Placeholder copy for a planning app. Drag a task onto a day; the board shows only this week.</p>
    <a class="btn" href="#">New task <kbd>Cmd K</kbd></a>
  </div>
  <div class="board" aria-label="Example board">
    <div class="day"><h2>Mon</h2><div class="t">Placeholder task</div><div class="t now">Placeholder task</div></div>
    <div class="day"><h2>Tue</h2><div class="t">Placeholder task</div></div>
    <div class="day"><h2>Wed</h2><div class="t">Placeholder task</div><div class="t">Placeholder task</div></div>
  </div>
</div>`,
};
