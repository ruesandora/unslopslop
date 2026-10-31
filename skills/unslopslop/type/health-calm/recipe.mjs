export default {
  id: 'health-calm',
  name: 'Calm care, tone not size',
  group: 'health',
  domains: ['web', 'mobile', 'email'],
  moves: ['type-only hero, no giant size', 'hierarchy by colour', 'airy setting'],
  mood: ['calm', 'reassuring', 'clear', 'kind'],
  fonts: {
    display: { family: 'Lexend', q: 'Lexend:wght@300..600', licence: 'OFL', fallback: 'system-ui, sans-serif', role: 'headings, light weights' },
    text: { family: 'Source Sans 3', q: 'Source+Sans+3:ital,wght@0,400..700;1,400', licence: 'OFL', fallback: 'system-ui, sans-serif' },
  },
  colours: { ground: '#f2f7f4', ink: '#0f2e27', accent: '#1d5547', line: '#b8cfc6', panel: '#ffffff' },
  ladder: [
    ['Heading', 44, 32, 1.2, -0.01, 300, 'display', 'Your check-up is booked'],
    ['Second line', 44, 32, 1.2, -0.01, 300, 'display', '<span style="color:var(--accent)">Here is what to bring</span>'],
    ['Body', 19, 18, 1.65, 0, 400, 'text', 'Short sentences, one idea each, at a size people can read without their glasses.'],
    ['Detail', 17, 17, 1.5, 0, 600, 'text', 'Placeholder clinic, room 2'],
  ],
  case: 'Sentence case only; no capitals labels in health copy (they read as alarms).',
  features: { css: 'font-variant-numeric: lining-nums proportional-nums', off: 'font-variant-numeric: normal', sample: '09:30 · 2 tablets · room 2', face: 'text', note: 'Times and doses in lining figures inside sentences; never a dose as a giant number.' },
  signature: 'Two lines at the same light 44 px: the first in ink, the second in a deep green tone. Hierarchy by tone, not by size; nothing on the screen is louder than a calm sentence.',
  use: 'Clinics, pharmacies, therapy and wellbeing apps, appointment and results screens, patient letters.',
  slop: 'When the second tone is a pale grey (faded text), when stock smiling-doctor photos are added, or when a pastel gradient blob sits behind the text.',
  css: `
  .hc { padding: 80px 40px 88px; display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: 64px; align-items: start; }
  .hc h1 { margin: 0 0 24px; font: 300 44px/1.2 var(--f-display); letter-spacing: -.01em; }
  .hc h1 span { display: block; color: var(--accent); }
  .hc p { margin: 0 0 16px; font-size: 19px; line-height: 1.65; max-width: 42ch; }
  .hc ul { list-style: none; margin: 0; padding: 0; background: var(--panel); border-radius: 12px; box-shadow: 0 1px 2px rgba(15,46,39,.08), 0 12px 30px -18px rgba(15,46,39,.35); }
  .hc li { padding: 18px 22px; border-bottom: 1px solid var(--line); font-size: 18px; }
  .hc li:last-child { border: 0; }
  .hc li b { display: block; font: 500 20px/1.3 var(--f-display); }
  @media (max-width: 760px) {
    .hc { grid-template-columns: 1fr; padding: 40px 18px 48px; gap: 32px; }
    .hc h1 { font-size: 32px; }
    .hc p { font-size: 18px; }
  }`,
  hero: `<div class="hc">
  <div>
    <h1>Your check-up is booked. <span>Here is what to bring.</span></h1>
    <p>Placeholder patient copy. Arrive ten minutes early. You can bring someone with you.</p>
  </div>
  <ul>
    <li><b>Your current medicines</b>Placeholder detail, in the boxes they came in.</li>
    <li><b>A list of questions</b>Placeholder detail.</li>
    <li><b>Where</b>Placeholder clinic, room 2</li>
  </ul>
</div>`,
};
