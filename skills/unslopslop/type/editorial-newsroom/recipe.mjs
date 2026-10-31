export default {
  id: 'editorial-newsroom',
  name: 'Newsroom condensed',
  group: 'editorial',
  domains: ['web', 'dashboard', 'email'],
  moves: ['condensed', 'tight setting'],
  mood: ['urgent', 'factual', 'busy', 'direct'],
  fonts: {
    display: { family: 'Barlow Condensed', q: 'Barlow+Condensed:wght@500;600;700', licence: 'OFL', fallback: '"Arial Narrow", "Roboto Condensed", sans-serif' },
    text: { family: 'Literata', q: 'Literata:ital,opsz,wght@0,7..72,400..700;1,7..72,400', licence: 'OFL', fallback: 'Georgia, serif', role: 'body with optical sizes' },
  },
  colours: { ground: '#f5f4ef', ink: '#121212', accent: '#b8141b', line: '#bdb9ad' },
  ladder: [
    ['Lead headline', 132, 58, 0.9, 0, 600, 'display', 'COUNCIL VOTES TONIGHT', 'text-transform:uppercase'],
    ['Story headline', 34, 26, 1, 0, 600, 'display', 'Bridge closure moved to spring'],
    ['Standfirst', 21, 18, 1.4, 0, 500, 'text', 'What changes for the two bus routes that cross it.'],
    ['Body', 18, 17, 1.55, 0, 400, 'text', 'Literata switches its optical size with the text size, so body copy stays sturdy on cheap screens.'],
    ['Kicker', 15, 14, 1, 0.06, 700, 'display', 'LIVE · TOWN HALL', 'text-transform:uppercase'],
  ],
  case: 'Lead headline in capitals with zero tracking (condensed capitals need no extra space); story headlines in sentence case; kickers in capitals at 15 px.',
  features: { css: 'font-variant-numeric: lining-nums tabular-nums; font-optical-sizing: auto', off: 'font-variant-numeric: oldstyle-nums proportional-nums', sample: 'Updated 21:40 · 12 of 31 seats', face: 'text', note: 'Tabular lining figures for times and counts in a running story; optical sizing on for Literata.' },
  signature: 'Density as the voice: capitals in a condensed face at line height 0.9, stacked over a hard rule, with three columns of briefs right under it. No hero image needed; the page is the story list.',
  use: 'Local news, live updates, election and event coverage, internal status pages written for a wide audience.',
  slop: 'When the condensed capitals are used for a calm product (it shouts for nothing), when tracking is added to the condensed capitals, or when the columns hold filler instead of real items.',
  css: `
  .nw { padding: 28px 40px 48px; }
  .nw .k { font: 700 15px/1 var(--f-display); letter-spacing: .06em; text-transform: uppercase; color: var(--accent); }
  .nw h1 { margin: 10px 0 0; font: 600 132px/.86 var(--f-display); text-transform: uppercase; letter-spacing: 0; }
  .nw .sf { display: flex; justify-content: space-between; align-items: end; gap: 32px; border-bottom: 6px solid var(--ink); padding: 18px 0 16px; }
  .nw .sf p { margin: 0; font: 500 22px/1.4 var(--f-text); max-width: 46ch; }
  .nw .sf time { font: 600 16px/1 var(--f-display); text-transform: uppercase; letter-spacing: .04em; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .nw .grid { display: grid; grid-template-columns: repeat(3, 1fr); }
  .nw .grid article { padding: 16px 20px 0 0; border-right: 1px solid var(--line); margin-right: 20px; }
  .nw .grid article:last-child { border: 0; }
  .nw h2 { font: 600 30px/1 var(--f-display); margin: 0 0 8px; }
  .nw .grid p { margin: 0; font-size: 17px; line-height: 1.5; }
  @media (max-width: 760px) {
    .nw { padding: 20px 18px 32px; }
    .nw h1 { font-size: 58px; }
    .nw .sf { flex-direction: column; align-items: start; gap: 10px; }
    .nw .sf p { font-size: 18px; }
    .nw .grid { grid-template-columns: 1fr; }
    .nw .grid article { border-right: 0; border-bottom: 1px solid var(--line); margin: 0; padding: 14px 0; }
  }`,
  hero: `<div class="nw">
  <span class="k">Live · Town hall</span>
  <h1>Council votes on the bridge tonight</h1>
  <div class="sf"><p>What a yes or a no means for the two bus routes and the Saturday market, explained before the meeting opens.</p><time>Placeholder · 18:30</time></div>
  <div class="grid">
    <article><h2>The two routes that cross it</h2><p>Placeholder brief. Which stops move and for how long, in plain words.</p></article>
    <article><h2>Where the market goes</h2><p>Placeholder brief. The square on the far bank is the only option on the table.</p></article>
    <article><h2>How to follow the vote</h2><p>Placeholder brief. The meeting is streamed; this page updates as items close.</p></article>
  </div>
</div>`,
};
