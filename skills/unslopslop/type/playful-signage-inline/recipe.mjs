export default {
  id: 'playful-signage-inline',
  name: 'Layered sign, inline',
  group: 'playful',
  domains: ['web', 'social', 'logo-brand'],
  moves: ['outline or inline', 'layered type'],
  mood: ['playful', 'loud', 'nocturnal', 'street'],
  fonts: {
    display: { family: 'Bungee Inline', q: 'Bungee+Inline', licence: 'OFL', fallback: 'Impact, "Arial Black", sans-serif', role: 'top layer' },
    text: { family: 'Work Sans', q: 'Work+Sans:wght@400..700', licence: 'OFL', fallback: 'system-ui, sans-serif' },
    accent: { family: 'Bungee', q: 'Bungee', licence: 'OFL', fallback: 'Impact, sans-serif', role: 'solid shadow layer under the inline, same metrics, never alone' },
  },
  colours: { ground: '#12343b', ink: '#f6efe2', accent: '#f2a541', line: '#2f5a61', scheme: 'dark' },
  ladder: [
    ['Sign', 128, 60, 1, 0, 400, 'display', 'OPEN LATE'],
    ['Heading', 36, 26, 1.05, 0.01, 400, 'display', 'FRIDAY ROOMS'],
    ['Body', 18, 17, 1.55, 0, 400, 'text', 'Work Sans carries every sentence; the sign faces never set more than three words.'],
    ['Small', 14, 13, 1.4, 0.02, 600, 'text', 'Doors at nine'],
  ],
  case: 'The sign faces are capitals only by design; three words at most. Everything else in sentence case in the text face.',
  features: { css: 'font-variant-numeric: lining-nums; font-feature-settings: "ss01" 1', off: 'font-variant-numeric: normal', sample: 'Doors 21:00 · Room 4', face: 'text', note: 'The display faces have no figures worth setting small; times and rooms go in the text face.' },
  signature: 'Two layers of one sign system stacked in register: the solid cut in the accent below, nudged 0.05 em down and right, the inline face in light on top, offset by nothing. It reads like a painted shop sign at night.',
  use: 'Bars, arcades, venues, food trucks, street festivals, playful product launches that want a sign rather than a slogan.',
  slop: 'When the layers drift out of register, when more than one sign appears per screen, when it sets a sentence, or when neon glow is added on top.',
  css: `
  .sg { padding: 64px 40px 72px; display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); gap: 48px; align-items: center; }
  .sg .sign { position: relative; font-size: 128px; line-height: 1; }
  .sg .sign span { display: block; }
  .sg .sign .shade { font-family: var(--f-accent); color: var(--accent); transform: translate(.05em, .05em); }
  .sg .sign .inl { position: absolute; inset: 0; font-family: var(--f-display); color: var(--ink); }
  .sg h1 { margin: 0; font-weight: 400; }
  .sg h2 { margin: 0 0 12px; font: 400 36px/1.05 var(--f-display); color: var(--accent); }
  .sg p { margin: 0 0 14px; font-size: 19px; max-width: 34ch; }
  .sg dl { margin-top: 20px; display: grid; grid-template-columns: auto 1fr; gap: 6px 16px; font-size: 16px; }
  .sg dl div { display: contents; }
  .sg dt { font: 600 14px/1.5 var(--f-text); text-transform: none; letter-spacing: 0; margin: 0; }
  @media (max-width: 760px) {
    .sg { grid-template-columns: 1fr; padding: 40px 18px 48px; gap: 28px; }
    .sg .sign { font-size: 60px; }
    .sg h2 { font-size: 26px; }
    .sg p { font-size: 17px; }
  }`,
  hero: `<div class="sg">
  <h1 class="sign" aria-label="Open late"><span class="shade" aria-hidden="true">OPEN<br>LATE</span><span class="inl" aria-hidden="true">OPEN<br>LATE</span></h1>
  <div>
    <h2>FRIDAY ROOMS</h2>
    <p>Placeholder copy for a late-night venue. The sign is two faces of one system printed in register; the sentences stay in a plain text face.</p>
    <dl><div><dt>Doors</dt><dd>Placeholder time</dd></div><div><dt>Where</dt><dd>Placeholder address</dd></div></dl>
  </div>
</div>`,
};
