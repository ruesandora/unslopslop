export default {
  id: 'luxury-didone-airy',
  name: 'Didone, airy',
  group: 'luxury',
  domains: ['web', 'email', 'social'],
  moves: ['serif display', 'airy setting', 'tracked capitals'],
  mood: ['luxurious', 'poised', 'quiet', 'sharp'],
  fonts: {
    display: { family: 'Bodoni Moda', q: 'Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900', licence: 'OFL', fallback: '"Didot", "Bodoni 72", Georgia, serif', role: 'optical size axis follows the size' },
    text: { family: 'Jost', q: 'Jost:wght@300..600', licence: 'OFL', fallback: 'Futura, "Century Gothic", system-ui, sans-serif', role: 'labels and short copy' },
  },
  colours: { ground: '#ece6dc', ink: '#15120f', accent: '#5c1a1f', line: '#bfb5a5' },
  ladder: [
    ['Display', 96, 48, 1.08, -0.01, '400, opsz 96', 'display', 'The <i>evening</i> line'],
    ['Heading', 40, 30, 1.15, 0, '400 italic, opsz 40', 'display', '<i>Silk, cut on the bias</i>'],
    ['Body', 18, 17, 1.7, 0.01, 400, 'text', 'Short paragraphs with generous line height; never more than three in a row.'],
    ['Label', 12, 11, 1.2, 0.32, 500, 'text', 'AUTUMN · PLACEHOLDER', 'text-transform:uppercase'],
  ],
  case: 'Display in sentence case with one italic word; labels in capitals tracked +0.3 em at 11 to 12 px; no bold anywhere.',
  features: { css: 'font-optical-sizing: auto; font-variant-numeric: lining-nums proportional-nums', off: 'font-optical-sizing: none; font-variation-settings: "opsz" 6', sample: 'No. 12 · 1992', face: 'display', note: 'With optical sizing on, the hairlines thin out at display size and thicken in captions; switching it off shows why it matters.' },
  signature: 'Air as the luxury: the display line sits low and left with half the screen empty above it, labels pinned to the corners in tracked Jost, and the opsz axis keeps hairlines sharp at 96 px.',
  use: 'Fashion, jewellery, hotels, fragrance, galleries; anywhere a few words and a lot of space are the point.',
  slop: 'When used for a product that needs to explain itself (it hides the information), when gold gradients or shimmer join it, or when the tracking is added to lowercase text.',
  css: `
  .dd { position: relative; min-height: 640px; padding: 40px; display: grid; grid-template-rows: auto 1fr auto; }
  .dd .c { display: flex; justify-content: space-between; font: 500 12px/1.2 var(--f-text); letter-spacing: .32em; text-transform: uppercase; }
  .dd h1 { align-self: end; margin: 0 0 32px; font: 400 96px/1.08 var(--f-display); letter-spacing: -.01em; max-width: 12ch; font-optical-sizing: auto; }
  .dd h1 i { color: var(--accent); }
  .dd .foot { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 40px; border-top: 1px solid var(--ink); padding-top: 18px; }
  .dd .foot p { margin: 0; font: 400 17px/1.7 var(--f-text); max-width: 34ch; }
  .dd .foot .c { display: block; }
  @media (max-width: 760px) {
    .dd { min-height: 0; padding: 22px 18px 36px; }
    .dd h1 { font-size: 48px; margin: 120px 0 24px; }
    .dd .foot { grid-template-columns: 1fr; gap: 16px; }
    .dd .c { font-size: 11px; }
  }`,
  hero: `<div class="dd">
  <div class="c"><span>Maison placeholder</span><span>Autumn</span></div>
  <h1>The <i>evening</i> line, cut on the bias</h1>
  <div class="foot">
    <span class="c">Collection · placeholder</span>
    <p>Placeholder copy for a fashion house. Few words, long line height, no bold weight anywhere.</p>
    <span class="c">View the pieces</span>
  </div>
</div>`,
};
