# unslopslop report

- Target: `examples/dashboard/after.html`
- Slop score: **10/100** (owner reading: 100 is the worst). It is the worse of "taste not proven" (100 minus the taste proof 90) and the genre-default tells (0 pts), which count less the more taste is proven. Rule-only pattern slop: 6 (raw 6).
- Taste proof: **90/100** (higher is better; pass mark 60)
  - subject 30/30: largest subject 42% of the first screen (media), all subjects 42%
  - display 15/25: display line 40 px (app screen)
  - overlap 15/15: 25 layers overlap the subject
  - ground 15/15: ground colour 61% of the first screen, accents 0.6%
  - keyword 15/15: no coloured headline keyword
- Craft score: **95/100** (higher is better; pass mark 70)
- Overall: **PASS** (needs a slop verdict that is not HEAVY, craft >= 70, taste proof >= 60; UNPROVEN until a side-by-side reference compare was run: detect --compared <compare.png>)
- Slop verdict: **CLEAN**. Clean: do not touch it. Run the template test (swap the brand name; if it still fits, add one signature move).
- Rules checked: 97; findings: 2

## Points by fix pass

| Pass | Points |
|---|---|
| spacing | 2 |
| color | 4 |
| icons | 0 |
| copy | 0 |
| typography | 0 |
| layout | 0 |
| detail | 0 |
| imagery | 0 |
| motion | 0 |

## Craft

| Component | Points | Reading |
|---|---|---|
| hierarchy | 15/15 | display 40px / body 14px = 2.86x, 6 sizes |
| focal | 15/15 | headline 2.9x, largest visual 41% of the screen |
| visual | 20/20 | 67% of the first screen is visual (surface, media, surface) |
| motion | 15/15 | moves inside the visual, 21 moving elements, reduced motion handled |
| identity | 15/20 | web font, display face differs from text, accent used 20x in 2 hue band(s), 1 shadows, 1 layers, 0 textured areas (none) |
| density | 15/15 | app screen, 74 text items on the first screen |

### Bland signals (the opposite failure: stripped too far)

- **bland-no-texture** (minor): No texture, pattern or tonal light anywhere. Every surface is one flat fill. Good pages carry a material: grain, a faint pattern or watermark, a tonal light behind the product. Fix: Add one material that suits the project: fine grain, a subtle pattern in one zone, a watermark, or a soft light behind the main visual. Keep it quiet (under 10% opacity).
  - `body`: no background image, gradient, mask or noise on any large area

## spacing

### spacing-cramped (minor, 2 pts, x1, desktop+mobile)
Text sits against the edge of its box. Buttons and cards with almost no inner padding read as unfinished.
Fix: Give buttons at least 12 px horizontal and 8 px vertical padding (anything under 8 px horizontal is flagged), cards at least 16 px.
- `span.today`: padding 6/8/6/8px [desktop]
- `span.today`: padding 6/8/6/8px [mobile]

## color

### color-accent-decorative (minor, 4 pts, x5, desktop)
Accent colour spent on decoration. When the accent paints rules, tags and ornaments, it no longer tells the reader what to press or what changed.
Fix: Keep the accent for actions, selection, focus, live state and the key data series. Decoration goes neutral.
- `span.today`: accent on a non-interactive, non-state element [desktop]
- `i`: accent on a non-interactive, non-state element [desktop]
- `i`: accent on a non-interactive, non-state element [desktop]
- `i`: accent on a non-interactive, non-state element [desktop]

