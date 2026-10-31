export default {
  id: 'warmcraft-hand',
  name: 'Bakehouse, one hand note',
  group: 'warm-craft',
  domains: ['web', 'email', 'social'],
  moves: ['serif display', 'script or hand-drawn accent'],
  mood: ['warm', 'homely', 'honest', 'generous'],
  fonts: {
    display: { family: 'Corben', q: 'Corben:wght@400;700', licence: 'OFL', fallback: '"Cooper Black", Georgia, serif', role: 'soft, round serif for titles' },
    text: { family: 'Crimson Pro', q: 'Crimson+Pro:ital,wght@0,400..700;1,400', licence: 'OFL', fallback: 'Georgia, serif' },
    accent: { family: 'Caveat', q: 'Caveat:wght@500..700', licence: 'OFL', fallback: '"Segoe Print", cursive', role: 'one handwritten note per screen, never rotated' },
  },
  colours: { ground: '#f6ecdc', ink: '#2b1d14', accent: '#93371a', line: '#dcc7a6', panel: '#efe0c6' },
  ladder: [
    ['Title', 92, 52, 1, -0.015, 700, 'display', 'Bread, from Thursday'],
    ['Heading', 30, 24, 1.15, 0, 400, 'display', 'This week’s loaves'],
    ['Body', 21, 19, 1.5, 0, 400, 'text', 'Crimson Pro at 21 px: a book face for the story of the flour and the oven.'],
    ['Hand note', 30, 26, 1.1, 0, 600, 'accent', 'still warm at eight'],
    ['Price', 20, 18, 1.2, 0, 600, 'text', '4.20', 'font-variant-numeric:lining-nums tabular-nums'],
  ],
  case: 'Sentence case; the hand note in lowercase, as written.',
  features: { css: 'font-variant-numeric: oldstyle-nums proportional-nums', off: 'font-variant-numeric: lining-nums', sample: 'Since 1998 · 36 hours · 4.20', face: 'text', note: 'Old-style figures in the story, lining tabular figures in the price list.' },
  signature: 'One handwritten line in the margin of a bookish page: a soft round serif title, book text, and a single note in a hand face set straight, as if added at the counter that morning.',
  use: 'Bakeries, cafés, small producers, farm shops, craft workshops, recipe newsletters.',
  slop: 'When the note is tilted, taped or stuck on as a sticker, when there are hand notes everywhere, or when kraft-paper and string props are drawn in.',
  css: `
  .wc { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); gap: 56px; padding: 64px 40px 72px; align-items: start; }
  .wc h1 { margin: 0 0 20px; font: 700 92px/1 var(--f-display); letter-spacing: -.015em; }
  .wc p { margin: 0 0 14px; font: 400 21px/1.5 var(--f-text); max-width: 40ch; font-variant-numeric: oldstyle-nums; }
  .wc .list { background: var(--panel); padding: 26px 28px; position: relative; }
  .wc h2 { margin: 0 0 12px; font: 400 30px/1.15 var(--f-display); }
  .wc ul { list-style: none; margin: 0; padding: 0; }
  .wc li { display: flex; justify-content: space-between; padding: 10px 0; border-top: 1px solid var(--line); font: 400 20px/1.3 var(--f-text); }
  .wc li b { font-weight: 600; font-variant-numeric: lining-nums tabular-nums; }
  .wc .hand { display: block; margin-top: 14px; font: 600 30px/1.1 var(--f-accent); color: var(--accent); }
  @media (max-width: 760px) {
    .wc { grid-template-columns: 1fr; padding: 36px 18px 44px; gap: 28px; }
    .wc h1 { font-size: 52px; }
    .wc p { font-size: 19px; }
    .wc .list { padding: 20px 18px; }
  }`,
  hero: `<div class="wc">
  <div>
    <h1>Bread, from Thursday</h1>
    <p>Placeholder copy for a small bakery. The dough rests for 36 hours; the oven is lit before five.</p>
    <p>Order by Wednesday, collect from the side door.</p>
  </div>
  <div class="list">
    <h2>This week’s loaves</h2>
    <ul><li>Country white<b>4.20</b></li><li>Rye and caraway<b>4.80</b></li><li>Seeded spelt<b>5.10</b></li></ul>
    <span class="hand">still warm at eight</span>
  </div>
</div>`,
};
