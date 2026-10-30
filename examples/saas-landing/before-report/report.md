# unslopslop report

- Target: `examples/saas-landing/before.html`
- Slop score: **100/100** (0 = clean)
- Verdict: **HEAVY**. Rebuild: the page is carrying a lot of generic patterns. Re-direct (DESIGN.md), then run the fix passes in order and re-run this detector after each pass.
- Rules checked: 45; findings: 35

## Points by fix pass

| Pass | Points |
|---|---|
| spacing | 6 |
| color | 57 |
| icons | 19.5 |
| copy | 37.5 |
| typography | 18 |
| layout | 39 |
| detail | 33.5 |
| imagery | 12 |
| motion | 14 |

## spacing

### spacing-off-grid (minor, 4 pts, x8, desktop)
Padding and gaps ignore a 4 px rhythm. Values like 13, 18 or 22 px show that spacing was typed, not chosen from a scale.
Fix: Pick a 4 px scale (4, 8, 12, 16, 24, 32, 48, 64) and snap every padding and gap to the nearest step.
- `div.wrap`: paddingRight 22px [desktop]
- `div.wrap`: paddingLeft 22px [desktop]
- `nav`: paddingTop 18px [desktop]
- `nav`: paddingBottom 18px [desktop]

### spacing-cramped (minor, 2 pts, x1, desktop+mobile)
Text sits against the edge of its box. Buttons and cards with almost no inner padding read as unfinished.
Fix: Give buttons at least 12 px horizontal and 8 px vertical padding (anything under 8 px horizontal is flagged), cards at least 16 px.
- `span.pill`: padding 6/14/6/14px [desktop]
- `span.pill`: padding 6/14/6/14px [mobile]

## color

### color-purple-gradient (critical, 21 pts, x4, desktop)
Violet / indigo gradient. The purple-to-blue gradient is the most recognisable AI-product colour move.
Fix: Replace with one flat brand colour. If depth is needed, use a surface step and a 1 px line, not a gradient.
- `a.btn`: linear-gradient(90deg, rgb(99, 102, 241), rgb(168, 85, 247)) [desktop]
- `span`: linear-gradient(90deg, rgb(129, 140, 248), rgb(192, 132, 252), rgb(244, 114, 18… [desktop]
- `a.btn`: linear-gradient(90deg, rgb(99, 102, 241), rgb(168, 85, 247)) [desktop]
- `#s`: linear-gradient(135deg, rgb(79, 70, 229), rgb(124, 58, 237)) [desktop]

### color-low-contrast (major, 12 pts, x12, desktop+mobile)
Text below WCAG contrast. Grey-on-tint and pale-on-white text fails readers and audits alike.
Fix: Darken the text (or lighten the surface) until body text reaches 4.5:1 and large text 3:1.
- `p.sub`: 3.75:1 "Fluxly empowers modern teams …" [desktop]
- `small`: 2.14:1 "Active users" [desktop]
- `small`: 2.14:1 "Uptime" [desktop]
- `small`: 2.14:1 "Rating" [desktop]

### color-framework-default (major, 12 pts, x10, desktop)
Stock framework palette. Untouched indigo/violet/slate swatches from popular utility palettes make unrelated products look alike.
Fix: Derive the palette from the brand: one accent chosen on purpose, neutrals tinted toward it.
- `div.blob`: #8b5cf6 [desktop]
- `div.n`: #6366f1 [desktop]
- `i`: #a855f7 [desktop]
- `div.eyebrow`: #a78bfa [desktop]

### color-gradient-text (major, 6 pts, x1, desktop)
Gradient-filled text. Headings or numbers clipped to a colour ramp are a stock "AI landing" signature.
Fix: Set the text in one solid colour; emphasise with size, weight or position instead.
- `span`: seamless workflows [desktop]

### color-glow (major, 6 pts, x1, desktop)
Coloured glow shadow. Large zero-offset shadows in a saturated colour fake "energy" and hurt legibility.
Fix: Use a neutral, low-alpha shadow with a real offset, or no shadow and a 1 px border.
- `a.btn`: boxShadow rgba(139, 92, 246, 0.55) 0px 0px 40px 0px [desktop]

## icons

### icon-emoji-ui (major, 10.5 pts, x4, desktop)
Emoji used as interface icons. Emoji in headings, buttons and list items render differently per platform and signal a quick draft.
Fix: Use one consistent line-icon set (one size, one stroke width) or remove the glyph.
- `span.pill`: ✨ Introducing Fluxly 2.0 — no… [desktop]
- `div.ico`: ⚡ [desktop]
- `div.ico`: 🔒 [desktop]
- `div.ico`: 🚀 [desktop]

### icon-tile (major, 9 pts, x3, desktop)
Icon in a rounded coloured tile, repeated. A tinted square with a glyph above a heading is the default feature-card opener.
Fix: Drop the tile. Use a bare icon at one size, or no icon and let the heading carry the card.
- `div.ico`: icon tile [desktop]
- `div.ico`: icon tile [desktop]
- `div.ico`: icon tile [desktop]

## copy

### copy-cliche (major, 12 pts, x8, desktop)
Stock marketing vocabulary. Words such as "seamless", "elevate" or "unleash" carry no information and mark the text as generated.
Fix: Say the concrete thing: what the product does, for whom, with what number or example.
- `h1`: "Unleash" [desktop]
- `span`: "seamless" [desktop]
- `p.sub`: "empowers" [desktop]
- `p`: "all-in-one" [desktop]

### copy-placeholder (critical, 12 pts, x1, desktop)
Placeholder or filler text left in. Lorem ipsum, "Acme", "John Doe" and [bracketed] gaps show the page was never finished.
Fix: Write the real text, or remove the block. Never ship a stand-in name.
- `div.quote`: "Fluxly changed how we work." — Jane Doe, CEO at … [desktop]

### copy-unverified-proof (major, 7.5 pts, x2, desktop)
Social proof with no source. Round user counts, star scores and "trusted by" lines that cannot be checked read as invented.
Fix: Cite the source and date, link to the real logo or review, or delete the claim.
- `span`: Trusted by 10,000+ teams worldwide [desktop]
- `b`: 4.9★ [desktop]

### copy-contrast-formula (major, 6 pts, x1, desktop)
"Not X, but Y" headline formula. Defining the product by what it is not ("not just a tool, it's a partner") is a reflex of generated copy.
Fix: State the claim directly: say what it is and what the reader gets.
- `h1`: Unleash . Not just a tool, it's a partner. [desktop]

## typography

### type-eyebrow (major, 9 pts, x3, desktop)
Eyebrow label above the heading. A small, spaced, uppercase tag above every heading is a template habit.
Fix: Delete it, or fold the information into the heading. Keep at most one, and only if it carries a fact.
- `div.eyebrow`: Workflow automation [desktop]
- `div.eyebrow`: Features [desktop]
- `div.eyebrow`: How it works [desktop]

### type-heavy-weight (minor, 4 pts, x10, desktop)
Heavy weights carry the hierarchy. Weights of 800 to 900, or bold on most text, flatten emphasis. Hierarchy should come from size and colour.
Fix: Use 400 and 500 (600 sparingly). Let size and tone do the ranking.
- `span.logo`: weight 800 [desktop]
- `h1`: weight 900 [desktop]
- `span`: weight 900 [desktop]
- `b`: weight 900 [desktop]

### type-reflex-font (minor, 2.5 pts, x2, desktop)
Reflex font family. Inter, Poppins, Space Grotesk and a few others are what models pick without a reason.
Fix: Choose a family on purpose and write the reason in DESIGN.md. A system stack is better than an unexamined default.
- `body`: inter [desktop]
- `h1`: inter [desktop]

### type-tight-leading (minor, 2.5 pts, x2, desktop+mobile)
Body text set too tight. Multi-line paragraphs under 1.3 line-height, or letter-spacing below -0.04em, are hard to read.
Fix: Body line-height 1.5 to 1.7; keep tight leading for headings only and never track tighter than -0.03em.
- `h1`: letter-spacing -0.050em [desktop]
- `span`: letter-spacing -0.050em [desktop]
- `h1`: letter-spacing -0.050em [mobile]
- `span`: letter-spacing -0.050em [mobile]

## layout

### layout-overflow-x (critical, 21 pts, x4, mobile)
Page scrolls sideways. Horizontal overflow is a bug, most often on phones.
Fix: Find the widest element, give it max-width: 100% or let it wrap; do not hide the overflow on body.
- `div.blob`: scrollWidth 795 > 390 [mobile]
- `div.stat`: scrollWidth 795 > 390 [mobile]
- `b`: scrollWidth 795 > 390 [mobile]
- `small`: scrollWidth 795 > 390 [mobile]

### layout-side-stripe (major, 9 pts, x3, desktop)
Coloured stripe down one side of a box. A thick left border on a card, alert or quote is a common AI shortcut for emphasis.
Fix: Emphasise with a tinted surface, a heading or an icon. Do not use a one-sided accent border.
- `div.step`: 4px left border [desktop]
- `div.step`: 4px left border [desktop]
- `div.step`: 4px left border [desktop]

### layout-identical-cards (major, 6 pts, x1, desktop)
Row of identical icon + title + text cards. Three or four same-size feature cards in a row say nothing about which point matters.
Fix: Rank the points: one larger block for the main idea, the rest as a list or table.
- `div.cards`: 3 identical cards [desktop]

### layout-tap-target (minor, 3 pts, x3, mobile)
Touch targets under 32 px. Small buttons and links are hard to hit on a phone.
Fix: Make every control at least 44 px tall (minimum 32 px) with padding rather than larger text.
- `a`: 61x26px [mobile]
- `a`: 50x26px [mobile]
- `a`: 38x26px [mobile]

## detail

### detail-pulse-dot (major, 6 pts, x1, desktop)
Pulsing status dot. A blinking "live" dot on a status that never changes pretends the product is alive.
Fix: Show status only when it comes from data, as text plus colour, without animation.
- `i`: animation pulse [desktop]

### detail-announce-pill (major, 6 pts, x1, desktop)
Announcement pill above the hero heading. A rounded "New: ..." badge above the h1 is on nearly every generated landing page.
Fix: Remove it. If there is real news, link it in the header or footer.
- `span.pill`: ✨ Introducing Fluxly 2.0 — now with AI [desktop]

### detail-focus-ring (major, 6 pts, x1, desktop)
Focus outline removed without a replacement. Keyboard users cannot see where they are.
Fix: Add :focus-visible with a 2 px outline (or ring) in an accent colour; never leave outline: none alone.
- `stylesheet`: outline: none with no :focus-visible style [desktop]

### detail-arrow-links (minor, 4 pts, x5, desktop)
Arrow glyph on many links. Appending "→" to every link and button is decoration.
Fix: Keep an arrow only on the single primary action, if direction carries meaning.
- `a.btn`: Get started for free → [desktop]
- `a.more`: Learn more → [desktop]
- `a.more`: Learn more → [desktop]
- `a.more`: Learn more → [desktop]

### detail-glass (minor, 3.5 pts, x4, desktop)
Frosted glass on several surfaces. Backdrop blur on many elements costs performance and rarely has anything meaningful behind it.
Fix: Use solid surfaces. Keep blur for at most one overlay that really sits over content.
- `div.stat`: backdrop-filter [desktop]
- `div.stat`: backdrop-filter [desktop]
- `div.stat`: backdrop-filter [desktop]
- `div.stat`: backdrop-filter [desktop]

### detail-numbered (minor, 3 pts, x3, desktop)
Decorative section numbers. "01 / 02 / 03" on content that has no sequence is ornament.
Fix: Number only real steps (use an ordered list). Otherwise drop the numbers.
- `div.n`: 01 [desktop]
- `div.n`: 02 [desktop]
- `div.n`: 03 [desktop]

### detail-card-triple (minor, 3 pts, x3, desktop)
Border, soft shadow and tint on every card. Stacking a border, a diffuse shadow and a different fill on the same surface is three signals for one idea.
Fix: Pick one separator per surface: a border, or a tint, or (for floating layers only) a shadow.
- `div.card`: border + shadow + tint [desktop]
- `div.card`: border + shadow + tint [desktop]
- `div.card`: border + shadow + tint [desktop]

### detail-hover-lift (minor, 2 pts, x1, desktop)
Cards lift or grow on hover. translateY(-4px) and scale(1.05) on hover is a stock micro-interaction.
Fix: Change tone or border colour on hover, only inside @media (hover: hover).
- `stylesheet`: :hover { transform: translateY(-4px) scale(1.05) [desktop]

## imagery

### image-blur-blob (major, 6 pts, x1, desktop)
Blurred colour blob behind the content. Soft coloured orbs in the hero background are decoration without subject.
Fix: Remove the blob. If the hero needs an image, use a real photo, product screen or diagram.
- `div.blob`: filter blur(120px) [desktop]

### image-avatar-stack (major, 6 pts, x1, desktop)
Overlapping avatar row. A stack of round faces beside "trusted by" is the stock proof device, and the faces are rarely real.
Fix: Replace with a named customer quote that can be checked, or remove.
- `div.avatars`: 4 overlapping circles [desktop]

## motion

### motion-infinite (major, 6 pts, x1, desktop)
Ornament that animates forever. Endless loops (floating shapes, shimmering text, tickers) compete with content and drain batteries.
Fix: Animate in response to an action and then stop. Keep infinite loops for real loading indicators only.
- `div.blob`: animation float [desktop]

### motion-entrance-everywhere (minor, 4 pts, x12, desktop)
Everything fades up on load or scroll. Six or more elements entering with the same fade-and-rise turns motion into wallpaper.
Fix: Animate one moment (the hero, or one key reveal). Leave the rest still.
- `h1`: entrance animation [desktop]
- `p.sub`: entrance animation [desktop]
- `div.stat`: entrance animation [desktop]
- `div.stat`: entrance animation [desktop]

### motion-no-reduced (minor, 2 pts, x1, desktop)
No prefers-reduced-motion handling. People who ask the system for less motion still get all of it.
Fix: Add @media (prefers-reduced-motion: reduce) that removes or shortens animations and transitions.
- `stylesheet`: animations present, no reduced-motion query [desktop]

### motion-transition-all (minor, 2 pts, x1, desktop)
transition: all. Animating every property triggers layout work and surprising effects.
Fix: List the properties you mean (opacity, transform, background-color) with a duration and easing.
- `stylesheet`: transition: all .3s ease [desktop]

