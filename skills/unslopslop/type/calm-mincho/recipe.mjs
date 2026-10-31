export default {
  id: 'calm-mincho',
  name: 'Mincho, vertical and airy',
  group: 'calm',
  lang: 'en',
  domains: ['web', 'mobile', 'logo-brand'],
  moves: ['airy setting', 'vertical type', 'serif display'],
  mood: ['calm', 'poetic', 'airy', 'precise'],
  fonts: {
    display: { family: 'Shippori Mincho', q: 'Shippori+Mincho:wght@400;500;600', licence: 'OFL', fallback: '"Hiragino Mincho ProN", "Yu Mincho", serif', role: 'Japanese and Latin titles' },
    text: { family: 'Zen Kaku Gothic New', q: 'Zen+Kaku+Gothic+New:wght@400;500;700', licence: 'OFL', fallback: '"Hiragino Sans", "Yu Gothic", system-ui, sans-serif' },
  },
  colours: { ground: '#efeae0', ink: '#23201b', accent: '#2e3f6b', line: '#cdc4b3' },
  ladder: [
    ['Vertical title', 64, 44, 1.6, 0.18, 500, 'display', '<span lang="ja">静かな朝</span>'],
    ['Latin title', 40, 30, 1.3, 0.04, 400, 'display', 'A quiet morning'],
    ['Body', 18, 17, 1.9, 0.04, 400, 'text', 'Line height near 1.9 and a little tracking: the page breathes like a printed poem.'],
    ['Label', 13, 12, 1.4, 0.2, 500, 'text', 'TEA · PLACEHOLDER', 'text-transform:uppercase'],
  ],
  case: 'Latin in sentence case; Japanese title set vertically (writing-mode: vertical-rl) with +0.18 em tracking.',
  features: { css: 'font-feature-settings: "palt" 1; text-orientation: mixed', off: 'font-feature-settings: "palt" 0', sample: '<span lang="ja">静かな朝、お茶を一杯。</span>', face: 'display', note: 'palt tightens Japanese punctuation to proportional widths in horizontal lines; leave it off in vertical setting.' },
  signature: 'A vertical Japanese title standing at the right edge, a short Latin line far away at the lower left, and 60 percent of the screen left empty on purpose.',
  use: 'Tea, ceramics, ryokan and small hotels, meditation, poetry and slow-living brands, Japanese bilingual sites.',
  slop: 'When Japanese is used as decoration on a product that has no Japanese link, when cherry blossoms and torii are drawn in, or when the vertical text is a fake rotated image.',
  css: `
  .mc { position: relative; height: 680px; padding: 48px 40px; }
  .mc .v { position: absolute; right: 120px; top: 64px; margin: 0; writing-mode: vertical-rl; font: 500 64px/1.6 var(--f-display); letter-spacing: .18em; }
  .mc .seal { position: absolute; right: 64px; top: 72px; writing-mode: vertical-rl; font: 500 13px/1.4 var(--f-text); letter-spacing: .3em; color: var(--accent); }
  .mc .lat { position: absolute; left: 40px; bottom: 56px; max-width: 30ch; }
  .mc .lat h2 { margin: 0 0 14px; font: 400 40px/1.3 var(--f-display); letter-spacing: .04em; }
  .mc .lat p { margin: 0; font-size: 18px; line-height: 1.9; letter-spacing: .04em; }
  .mc .lab { position: absolute; left: 40px; top: 48px; font: 500 13px/1.4 var(--f-text); letter-spacing: .2em; text-transform: uppercase; }
  @media (max-width: 760px) {
    .mc { height: 700px; padding: 24px 18px; }
    .mc .v { right: 56px; top: 64px; font-size: 44px; }
    .mc .seal { right: 18px; top: 70px; }
    .mc .lab { left: 18px; top: 24px; }
    .mc .lat { left: 18px; right: 18px; bottom: 36px; }
    .mc .lat h2 { font-size: 30px; }
    .mc .lat p { font-size: 17px; }
  }`,
  hero: `<div class="mc">
  <span class="lab">Tea · placeholder</span>
  <h1 class="v" lang="ja">静かな朝</h1>
  <span class="seal" lang="ja">見本の文章</span>
  <div class="lat"><h2>A quiet morning</h2><p>Placeholder copy for a tea house. The Japanese title reads top to bottom; the English sits far from it, small and unhurried.</p></div>
</div>`,
};
