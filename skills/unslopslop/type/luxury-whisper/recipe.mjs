export default {
  id: 'luxury-whisper',
  name: 'Whisper, no display size',
  group: 'luxury',
  domains: ['web', 'mobile', 'logo-brand'],
  moves: ['type-only hero, no giant size', 'hierarchy by position', 'airy setting'],
  mood: ['hushed', 'exclusive', 'nocturnal', 'precise'],
  fonts: {
    display: { family: 'Italiana', q: 'Italiana', licence: 'OFL', fallback: '"Didot", Georgia, serif', role: 'the name and one line' },
    text: { family: 'Tenor Sans', q: 'Tenor+Sans', licence: 'OFL', fallback: '"Gill Sans", "Optima", system-ui, sans-serif' },
  },
  colours: { ground: '#0c0b0a', ink: '#ece6da', accent: '#b9a27a', line: '#3a3530', scheme: 'dark' },
  ladder: [
    ['Name', 40, 30, 1.2, 0.22, 400, 'display', 'NOCTURNE', 'text-transform:uppercase'],
    ['Line', 24, 20, 1.45, 0.02, 400, 'display', 'A hotel of eleven rooms'],
    ['Body', 17, 16, 1.75, 0.02, 400, 'text', 'One weight in each face. Hierarchy comes from where a line sits and how much air it has.'],
    ['Corner', 12, 11, 1.3, 0.24, 400, 'text', 'RESERVATIONS', 'text-transform:uppercase'],
  ],
  case: 'The name in tracked capitals (+0.22 em); everything else sentence case; corner labels in capitals +0.24 em.',
  features: { css: 'font-kerning: normal; font-variant-numeric: lining-nums', off: 'font-kerning: none', sample: 'AVAILABLE · WAVE · TAVOLA', face: 'display', note: 'Kerning matters more than features at this size; check the capitals pairs (AV, WA, TA).' },
  signature: 'No display size at all: the largest text is 40 px, centred in an empty dark field, with four 12 px corner labels holding the frame. Rank comes from position and silence.',
  use: 'Small hotels, private members clubs, fragrance, a launch teaser where restraint is the message.',
  slop: 'On a landing page that needs to sell or explain (it reads as empty), with a blurred photo behind it, or when the corners hold filler like "Est. 2024" without a reason.',
  css: `
  .wh { position: relative; height: 720px; display: grid; place-items: center; text-align: center; }
  .wh h1 { margin: 0 0 18px; font: 400 40px/1.2 var(--f-display); letter-spacing: .22em; text-transform: uppercase; padding-left: .22em; }
  .wh p { margin: 0 auto; font: 400 24px/1.45 var(--f-display); max-width: 26ch; color: var(--accent); }
  .wh .k { position: absolute; font: 400 12px/1.3 var(--f-text); letter-spacing: .24em; text-transform: uppercase; }
  .wh .tl { top: 32px; left: 40px; } .wh .tr { top: 32px; right: 40px; } .wh .bl { bottom: 32px; left: 40px; } .wh .br { bottom: 32px; right: 40px; }
  .wh .rule { width: 1px; height: 64px; background: var(--accent); margin: 28px auto 0; }
  @media (max-width: 760px) {
    .wh { height: 640px; padding: 0 18px; }
    .wh h1 { font-size: 30px; }
    .wh p { font-size: 20px; }
    .wh .k { font-size: 11px; letter-spacing: .18em; }
    .wh .tl, .wh .bl { left: 18px; } .wh .tr, .wh .br { right: 18px; }
  }`,
  hero: `<div class="wh">
  <span class="k tl">Placeholder</span><span class="k tr">Reservations</span>
  <div><h1>Nocturne</h1><p>A hotel of eleven rooms, open after dark</p><div class="rule"></div></div>
  <span class="k bl">Old town</span><span class="k br">Placeholder copy</span>
</div>`,
};
