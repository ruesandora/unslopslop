# unslopslop report

- Target: `examples/dashboard/after-v1.html`
- Slop score: **0/100** (lower is better; raw points before the 100 cap: 0)
- Craft score: **62/100** (higher is better; pass mark 70)
- Overall: **FAIL** (needs a clean slop verdict and craft >= 70)
- Slop verdict: **CLEAN**. Clean: do not touch it. Run the template test (swap the brand name; if it still fits, add one signature move).
- Rules checked: 85; findings: 0

## Points by fix pass

| Pass | Points |
|---|---|
| spacing | 0 |
| color | 0 |
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
| hierarchy | 14/15 | display 32px / body 14px = 2.29x, 6 sizes |
| focal | 14/15 | headline 2.3x, largest visual 20% of the screen |
| visual | 13/20 | 20% of the first screen is visual (surface) |
| motion | 10/15 | moves outside any visual, 1 moving elements, reduced motion handled |
| identity | 7/20 | no web font, display face differs from text, accent used 14x in 2 hue band(s), 0 shadows, 0 layers, 0 textured areas (none) |
| density | 4/15 | app screen, 31 text items on the first screen |

### Bland signals (the opposite failure: stripped too far)

- **bland-no-depth** (minor): No depth at all. No shadow, no layered surface, one flat colour everywhere: the page looks like printed paper, not an interface. Fix: Add one layer system: a raised surface for the product view (soft layered shadow), a second surface tone, or one overlapping element.
  - `body`: 0 shadows, 2 surface tone(s)
- **bland-no-texture** (minor): No texture, pattern or tonal light anywhere. Every surface is one flat fill. Good pages carry a material: grain, a faint pattern or watermark, a tonal light behind the product. Fix: Add one material that suits the project: fine grain, a subtle pattern in one zone, a watermark, or a soft light behind the main visual. Keep it quiet (under 10% opacity).
  - `body`: no background image, gradient, mask or noise on any large area
- **bland-static** (minor): Nothing moves, even where a demo would explain the product. A product page with a call to action but no motion leaves the reader to guess how the product behaves over time. Fix: Animate the product view once: one short sequence (render(t) or a few keyframes) that shows what happens, then stops. Respect reduced motion.
  - `body`: no animation, 0 animation frames, 1 DOM changes after load
- **bland-default-serif** (major): Default system serif. Georgia, Times and other built-in serifs are what a browser shows when nobody chose a type face. Fix: Choose a face on purpose (a real web font with a licence that allows self-hosting) and pair it with one text face.
  - `h1`: Charter, "Iowan Old Style", Georgia, serif
  - `h2`: Charter, "Iowan Old Style", Georgia, serif

No slop findings.

