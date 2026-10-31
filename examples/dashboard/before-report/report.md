# unslopslop report

- Target: `examples/dashboard/before.html`
- Slop score: **92/100** (owner reading: 100 is the worst). It is the worse of "taste not proven" (100 minus the taste proof 10) and the genre-default tells (124 pts), which count less the more taste is proven. Rule-only pattern slop: 100 (raw 183.5).
- Taste proof: **10/100** (higher is better; pass mark 60). no real subject on the first screen: proof capped at 10
  - subject 0/30: largest subject 0% of the first screen (none), all subjects 0%
  - display 15/25: display line 32 px (app screen)
  - overlap 0/15: nothing overlaps the subject
  - ground 10/15: ground colour 46% of the first screen, accents 5.6%
  - keyword 15/15: no coloured headline keyword
- Craft score: **49/100** (higher is better; pass mark 70)
- Overall: **FAIL** (needs a slop verdict that is not HEAVY, craft >= 70, taste proof >= 60; UNPROVEN until a side-by-side reference compare was run: detect --compared <compare.png>)
- Slop verdict: **HEAVY**. Rebuild: the page is carrying a lot of generic patterns. Re-direct (DESIGN.md), then run the fix passes in order and re-run this detector after each pass.
- Rules checked: 97; findings: 26

## Points by fix pass

| Pass | Points |
|---|---|
| spacing | 4 |
| color | 80.5 |
| icons | 12 |
| copy | 23 |
| typography | 20 |
| layout | 19.5 |
| detail | 20.5 |
| imagery | 0 |
| motion | 4 |

## Craft

| Component | Points | Reading |
|---|---|---|
| hierarchy | 15/15 | display 32px / body 13px = 2.46x, 8 sizes |
| focal | 11/15 | headline 2.5x, largest visual 9% of the screen |
| visual | 4/20 | 9% of the first screen is visual (surface) |
| motion | 7/15 | moves outside any visual, 6 moving elements, reduced motion not handled |
| identity | 6/20 | no web font, one face, accent used 27x in 5 hue band(s), 7 shadows, 0 layers, 0 textured areas (none) |
| density | 6/15 | app screen, 38 text items on the first screen |

### Bland signals (the opposite failure: stripped too far)

- **bland-no-texture** (minor): No texture, pattern or tonal light anywhere. Every surface is one flat fill. Good pages carry a material: grain, a faint pattern or watermark, a tonal light behind the product. Fix: Add one material that suits the project: fine grain, a subtle pattern in one zone, a watermark, or a soft light behind the main visual. Keep it quiet (under 10% opacity).
  - `body`: no background image, gradient, mask or noise on any large area

## spacing

### spacing-off-grid (minor, 4 pts, x8, desktop)
Padding and gaps ignore a 4 px rhythm. Values like 13, 18 or 22 px show that spacing was typed, not chosen from a scale.
Fix: Pick a 4 px scale (4, 8, 12, 16, 24, 32, 48, 64) and snap every padding and gap to the nearest step.
- `aside`: paddingTop 22px [desktop]
- `aside`: paddingRight 14px [desktop]
- `aside`: paddingBottom 22px [desktop]
- `aside`: paddingLeft 14px [desktop]

## color

### color-purple-gradient (critical, 24 pts, x11, desktop)
Violet / indigo gradient. The purple-to-blue gradient is the most recognisable AI-product colour move.
Fix: Replace with one flat brand colour. If depth is needed, use a surface step and a 1 px line, not a gradient.
- `b`: linear-gradient(90deg, rgb(129, 140, 248), rgb(192, 132, 252)) [desktop]
- `b`: linear-gradient(90deg, rgb(129, 140, 248), rgb(192, 132, 252)) [desktop]
- `b`: linear-gradient(90deg, rgb(129, 140, 248), rgb(192, 132, 252)) [desktop]
- `b`: linear-gradient(90deg, rgb(129, 140, 248), rgb(192, 132, 252)) [desktop]

### color-low-contrast (major, 12 pts, x14, desktop+mobile)
Text below WCAG contrast. Grey-on-tint and pale-on-white text fails readers and audits alike.
Fix: Darken the text (or lighten the surface) until body text reaches 4.5:1 and large text 3:1.
- `p.sub`: 2.36:1 "Here's what's happening with …" [desktop]
- `small`: 1.93:1 "Total revenue" [desktop]
- `small`: 1.93:1 "Overdue" [desktop]
- `small`: 1.93:1 "Paid invoices" [desktop]

### color-framework-default (major, 12 pts, x6, desktop)
Stock framework palette. Untouched indigo/violet/slate swatches from popular utility palettes make unrelated products look alike.
Fix: Derive the palette from the brand: one accent chosen on purpose, neutrals tinted toward it.
- `a.more`: #a78bfa [desktop]
- `div.panel`: #1e293b [desktop]
- `b`: #818cf8 [desktop]
- `i`: #6366f1 [desktop]

### color-gradient-text (major, 10.5 pts, x4, desktop)
Gradient-filled text. Headings or numbers clipped to a colour ramp are a stock "AI landing" signature.
Fix: Set the text in one solid colour; emphasise with size, weight or position instead.
- `b`: $48,920 [desktop]
- `b`: $4,820 [desktop]
- `b`: 128 [desktop]
- `b`: 11.4 [desktop]

### color-glow (major, 10.5 pts, x4, desktop)
Coloured glow shadow. Large zero-offset shadows in a saturated colour fake "energy" and hurt legibility.
Fix: Use a neutral, low-alpha shadow with a real offset, or no shadow and a 1 px border.
- `div.kpi`: boxShadow rgba(99, 102, 241, 0.18) 0px 8px 30px 0px [desktop]
- `div.kpi`: boxShadow rgba(99, 102, 241, 0.18) 0px 8px 30px 0px [desktop]
- `div.kpi`: boxShadow rgba(99, 102, 241, 0.18) 0px 8px 30px 0px [desktop]
- `div.kpi`: boxShadow rgba(99, 102, 241, 0.18) 0px 8px 30px 0px [desktop]

### color-faded-text (major, 7.5 pts, x2, desktop+mobile)
Faded support text. Light grey support text that passes the bare minimum still reads as faded; it is the "muted subtitle" look of generated pages and tires the eye.
Fix: Readable text at 7:1 or more (4.5:1 from 24 px up). Rank with size and weight, not by greying text out.
- `p.sub`: 2.36:1 "Here's what's happening with …" [desktop]
- `small`: 1.93:1 "Avg. days to pay" [desktop]
- `p.sub`: 2.36:1 "Here's what's happening with …" [mobile]
- `small`: 1.93:1 "Avg. days to pay" [mobile]

### color-accent-decorative (minor, 4 pts, x22, desktop)
Accent colour spent on decoration. When the accent paints rules, tags and ornaments, it no longer tells the reader what to press or what changed.
Fix: Keep the accent for actions, selection, focus, live state and the key data series. Decoration goes neutral.
- `div.eyebrow`: accent on a non-interactive, non-state element [desktop]
- `b`: accent on a non-interactive, non-state element [desktop]
- `span`: accent on a non-interactive, non-state element [desktop]
- `i`: accent on a non-interactive, non-state element [desktop]

## icons

### icon-emoji-ui (major, 12 pts, x6, desktop)
Emoji used as interface icons. Emoji in headings, buttons and list items render differently per platform and signal a quick draft.
Fix: Use one consistent line-icon set (one size, one stroke width) or remove the glyph.
- `a.on`: 📊 Dashboard [desktop]
- `a`: 🧾 Invoices [desktop]
- `a`: 👥 Clients [desktop]
- `a`: 💬 Reminders [desktop]

## copy

### copy-emoji (major, 12 pts, x6, desktop)
Emoji in the page. Emoji in headings, buttons, labels or body copy are the most visible AI tell.
Fix: Remove them. Use words, or one icon set drawn for the product. Keep emoji only if the brief says the user asked for them (<meta name="unslop-brief" content="emoji: reason">).
- `a.on`: 📊 Dashboard [desktop]
- `a`: 🧾 Invoices [desktop]
- `a`: 👥 Clients [desktop]
- `a`: 💬 Reminders [desktop]

### copy-fake-data (major, 9 pts, x3, desktop)
Stock fake names and data. Acme, Globex, John Doe and "User 1" are the placeholder cast of generated demos.
Fix: Use plausible, specific sample entries, and label them as sample data.
- `td`: Acme Inc. [desktop]
- `td`: John Doe [desktop]
- `td`: Globex Corp [desktop]

### copy-greeting (minor, 2 pts, x1, desktop)
Greeting as a page heading. "Welcome back, Sam" names no context; the heading should say what this screen is.
Fix: Name the content ("This month's scans"), not the visitor.
- `h1`: Welcome back, Alex 👋 [desktop]

## typography

### type-eyebrow (major, 6 pts, x1, desktop)
Eyebrow label above the heading. A small, spaced, uppercase tag above every heading is a template habit.
Fix: Delete it, or fold the information into the heading. Keep at most one, and only if it carries a fact.
- `div.eyebrow`: Overview [desktop]

### type-ai-default-font (major, 6 pts, x1, desktop)
AI-default font. Display serifs and text faces that agents pick by reflex (the list in references/ai-default-fonts.md) make every generated page sound the same.
Fix: Choose a face for this project and write why in the brief. To keep a listed face on purpose, add <meta name="unslop-brief" content="font: Family, reason">.
- `body`: inter [desktop]

### type-heavy-weight (minor, 4 pts, x8, desktop)
Heavy weights carry the hierarchy. Weights of 800 to 900, or bold on most text, flatten emphasis. Hierarchy should come from size and colour.
Fix: Use 400 and 500 (600 sparingly). Let size and tone do the ranking.
- `div.logo`: weight 800 [desktop]
- `h1`: weight 800 [desktop]
- `b`: weight 900 [desktop]
- `b`: weight 900 [desktop]

### type-small-text (minor, 4 pts, x14, desktop+mobile)
Several text elements under 13 px. Three or more small text elements make a page tiring to read, especially on phones.
Fix: Raise captions and labels to at least 13 px (body 16 px).
- `div.live`: 12px [desktop]
- `div.eyebrow`: 11px [desktop]
- `small`: 12px [desktop]
- `span`: 12px [desktop]

## layout

### layout-side-stripe (major, 7.5 pts, x2, desktop)
Coloured stripe down one side of a box. A thick left border on a card, alert or quote is a common AI shortcut for emphasis.
Fix: Emphasise with a tinted surface, a heading or an icon. Do not use a one-sided accent border.
- `a.on`: 3px left border [desktop]
- `div.alert`: 4px left border [desktop]

### layout-nested-cards (major, 6 pts, x1, desktop)
Card inside a card. Boxes within boxes add borders and shadows but no information.
Fix: Keep one container. Group inside it with spacing, a divider or a heading.
- `div.panel > div.inner`: nested card [desktop]

### layout-stat-strip (major, 6 pts, x1, desktop)
Row of big numbers with small labels. A strip of three or four headline metrics without a comparison is the standard hero-metric template.
Fix: Show one number that matters most, with its comparison base and date; move the rest into a table or chart.
- `div.kpis`: 4 stat blocks, 0 with a comparison [desktop]

## detail

### detail-pulse-dot (major, 6 pts, x1, desktop)
Pulsing status dot. A blinking "live" dot on a status that never changes pretends the product is alive.
Fix: Show status only when it comes from data, as text plus colour, without animation.
- `i`: animation pulse [desktop]

### detail-focus-ring (major, 6 pts, x1, desktop)
Focus outline removed without a replacement. Keyboard users cannot see where they are.
Fix: Add :focus-visible with a 2 px outline (or ring) in an accent colour; never leave outline: none alone.
- `stylesheet`: outline: none with no :focus-visible style [desktop]

### detail-card-triple (minor, 4 pts, x7, desktop)
Border, soft shadow and tint on every card. Stacking a border, a diffuse shadow and a different fill on the same surface is three signals for one idea.
Fix: Pick one separator per surface: a border, or a tint, or (for floating layers only) a shadow.
- `div.kpi`: border + shadow + tint [desktop]
- `div.kpi`: border + shadow + tint [desktop]
- `div.kpi`: border + shadow + tint [desktop]
- `div.kpi`: border + shadow + tint [desktop]

### detail-heavy-shadow (minor, 2.5 pts, x2, desktop)
Heavy resting shadows. Large dark shadows on elements at rest make the page look puffy and dated.
Fix: Keep shadows only on floating layers (menus, dialogs) and make them subtle: low alpha, small blur.
- `div.panel`: rgba(0, 0, 0, 0.35) 0px 8px 30px 0px [desktop]
- `div.panel`: rgba(0, 0, 0, 0.35) 0px 8px 30px 0px [desktop]

### detail-hover-lift (minor, 2 pts, x1, desktop)
Cards lift or grow on hover. translateY(-4px) and scale(1.05) on hover is a stock micro-interaction.
Fix: Change tone or border colour on hover, only inside @media (hover: hover).
- `stylesheet`: :hover { transform: translateY(-5px) [desktop]

## motion

### motion-no-reduced (minor, 2 pts, x1, desktop)
No prefers-reduced-motion handling. People who ask the system for less motion still get all of it.
Fix: Add @media (prefers-reduced-motion: reduce) that removes or shortens animations and transitions.
- `stylesheet`: animations present, no reduced-motion query [desktop]

### motion-transition-all (minor, 2 pts, x1, desktop)
transition: all. Animating every property triggers layout work and surprising effects.
Fix: List the properties you mean (opacity, transform, background-color) with a duration and easing.
- `stylesheet`: transition: all .3s [desktop]

