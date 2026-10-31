# unslopslop report

- Target: `examples/saas-landing/after.html`
- Slop score: **8/100** (owner reading: 100 is the worst). It is the worse of "taste not proven" (100 minus the taste proof 92) and the genre-default tells (0 pts), which count less the more taste is proven. Rule-only pattern slop: 28 (raw 28).
- Taste proof: **92/100** (higher is better; pass mark 60)
  - subject 30/30: largest subject 31% of the first screen (media), all subjects 31%
  - display 25/25: display line 167 px
  - overlap 15/15: 15 layers overlap the subject
  - ground 7/15: ground colour 52% of the first screen, accents 30.8%
  - keyword 15/15: no coloured headline keyword
- Craft score: **98/100** (higher is better; pass mark 70)
- Overall: **PASS** (needs a slop verdict that is not HEAVY, craft >= 70, taste proof >= 60; UNPROVEN until a side-by-side reference compare was run: detect --compared <compare.png>)
- Slop verdict: **CLEAN**. Clean: do not touch it. Run the template test (swap the brand name; if it still fits, add one signature move).
- Rules checked: 97; findings: 7

## Points by fix pass

| Pass | Points |
|---|---|
| spacing | 6 |
| color | 4 |
| icons | 0 |
| copy | 0 |
| typography | 10.5 |
| layout | 7.5 |
| detail | 0 |
| imagery | 0 |
| motion | 0 |

## Craft

| Component | Points | Reading |
|---|---|---|
| hierarchy | 15/15 | display 167px / body 20px = 8.35x, 13 sizes |
| focal | 15/15 | headline 8.4x, largest visual 31% of the screen |
| visual | 20/20 | 31% of the first screen is visual (media) |
| motion | 15/15 | moves inside the visual, 8 moving elements, reduced motion handled |
| identity | 18/20 | web font, display face differs from text, accent used 9x in 2 hue band(s), 0 shadows, 8 layers, 1 textured areas (image) |
| density | 15/15 | landing, 64% of the first screen holds content |

## spacing

### spacing-off-grid (minor, 4 pts, x8, desktop)
Padding and gaps ignore a 4 px rhythm. Values like 13, 18 or 22 px show that spacing was typed, not chosen from a scale.
Fix: Pick a 4 px scale (4, 8, 12, 16, 24, 32, 48, 64) and snap every padding and gap to the nearest step.
- `div.actions`: rowGap 22px [desktop]
- `div.actions`: columnGap 22px [desktop]
- `a.btn`: paddingRight 22px [desktop]
- `a.btn`: paddingLeft 22px [desktop]

### spacing-cramped (minor, 2 pts, x1, desktop)
Text sits against the edge of its box. Buttons and cards with almost no inner padding read as unfinished.
Fix: Give buttons at least 12 px horizontal and 8 px vertical padding (anything under 8 px horizontal is flagged), cards at least 16 px.
- `p.corner.right`: padding 0/0/0/0px [desktop]

## color

### color-accent-decorative (minor, 4 pts, x7, desktop)
Accent colour spent on decoration. When the accent paints rules, tags and ornaments, it no longer tells the reader what to press or what changed.
Fix: Keep the accent for actions, selection, focus, live state and the key data series. Decoration goes neutral.
- `nav.nav`: accent on a non-interactive, non-state element [desktop]
- `#field`: accent on a non-interactive, non-state element [desktop]
- `p.corner.right`: accent on a non-interactive, non-state element [desktop]
- `td`: accent on a non-interactive, non-state element [desktop]

## typography

### type-tight-leading (minor, 4 pts, x7, desktop+mobile)
Body text set too tight. Multi-line paragraphs under 1.3 line-height, or letter-spacing below -0.04em, are hard to read.
Fix: Body line-height 1.5 to 1.7; keep tight leading for headings only and never track tighter than -0.03em.
- `span.heavy`: letter-spacing -0.045em [desktop]
- `span.p`: letter-spacing -0.045em [desktop]
- `span.heavy`: letter-spacing -0.045em [desktop]
- `span.p`: letter-spacing -0.045em [desktop]

### type-heavy-weight (minor, 4 pts, x11, desktop)
Heavy weights carry the hierarchy. Weights of 800 to 900, or bold on most text, flatten emphasis. Hierarchy should come from size and colour.
Fix: Use 400 and 500 (600 sparingly). Let size and tone do the ranking.
- `a.brand`: weight 800 [desktop]
- `span.heavy`: weight 820 [desktop]
- `span.p`: weight 820 [desktop]
- `span.heavy`: weight 820 [desktop]

### type-long-headline (minor, 2.5 pts, x2, desktop)
Headline longer than two lines. A headline that needs three lines or more is a paragraph in disguise.
Fix: Cut it to one clear statement of at most two lines at desktop width.
- `#faq-title`: 7 lines [desktop]
- `#close-title`: 4 lines [desktop]

## layout

### layout-text-overlap (major, 7.5 pts, x2, desktop+mobile)
Text drawn on top of other text. Two pieces of text sharing the same spot cannot be read. It is usually an absolutely positioned label or a fixed height that broke on a narrow screen.
Fix: Give the elements their own space (grid, gap, wrapping), or put an opaque surface under the top layer if the overlap is intended.
- `span.heavy / span.heavy`: "Late invoices" over "Late invoices" [desktop]
- `span.thin / span.thin`: "chased politely" over "chased politely" [desktop]
- `span.heavy / span.heavy`: "Late invoices" over "Late invoices" [mobile]

