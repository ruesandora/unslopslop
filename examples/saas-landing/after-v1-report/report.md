# unslopslop report

- Target: `examples/saas-landing/after-v1.html`
- Slop score: **90/100** (owner reading: 100 is the worst). It is the worse of "taste not proven" (100 minus the taste proof 10) and the genre-default tells (0 pts), which count less the more taste is proven. Rule-only pattern slop: 21 (raw 21).
- Taste proof: **10/100** (higher is better; pass mark 60). no real subject on the first screen: proof capped at 10; display line under 80 px: proof capped at 55
  - subject 0/30: largest subject 0% of the first screen (none), all subjects 0%
  - display 0/25: display line 56 px
  - overlap 0/15: nothing overlaps the subject
  - ground 15/15: ground colour 90% of the first screen, accents 0.5%
  - keyword 15/15: no coloured headline keyword
- Craft score: **64/100** (higher is better; pass mark 70)
- Overall: **FAIL** (needs a slop verdict that is not HEAVY, craft >= 70, taste proof >= 60; UNPROVEN until a side-by-side reference compare was run: detect --compared <compare.png>)
- Slop verdict: **HEAVY**. Rebuild: the page is carrying a lot of generic patterns. Re-direct (DESIGN.md), then run the fix passes in order and re-run this detector after each pass.
- Rules checked: 97; findings: 2

## Points by fix pass

| Pass | Points |
|---|---|
| spacing | 0 |
| color | 12 |
| icons | 0 |
| copy | 0 |
| typography | 9 |
| layout | 0 |
| detail | 0 |
| imagery | 0 |
| motion | 0 |

## Craft

| Component | Points | Reading |
|---|---|---|
| hierarchy | 14/15 | display 56px / body 17px = 3.29x, 7 sizes |
| focal | 11/15 | headline 3.3x, largest visual 13% of the screen |
| visual | 7/20 | 13% of the first screen is visual (surface) |
| motion | 10/15 | moves outside any visual, 1 moving elements, reduced motion handled |
| identity | 7/20 | no web font, display face differs from text, accent used 12x in 1 hue band(s), 0 shadows, 0 layers, 0 textured areas (none) |
| density | 15/15 | landing, 32% of the first screen holds content |

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

## color

### color-faded-text (major, 12 pts, x7, desktop+mobile)
Faded support text. Light grey support text that passes the bare minimum still reads as faded; it is the "muted subtitle" look of generated pages and tires the eye.
Fix: Readable text at 7:1 or more (4.5:1 from 24 px up). Rank with size and weight, not by greying text out.
- `p.lead`: 6.68:1 "Fluxly sends the polite remin…" [desktop]
- `p`: 6.68:1 "You approve the three templat…" [desktop]
- `p`: 6.68:1 "Bank transactions are matched…" [desktop]
- `p`: 6.68:1 "Yes. Every message waits in a…" [desktop]

## typography

### type-heading-muted-subtitle (major, 9 pts, x3, desktop)
Heading plus grey subtitle, section after section. A heading followed by a smaller, greyed paragraph in every section is the template rhythm of generated landing pages.
Fix: Let the section open with its content (a product view, a table, a list) or write one sentence in the main text colour. Vary how sections start.
- `h1 + p.lead`: "Late invoices, chased for you" with a greyed subtitle [desktop]
- `h3 + p`: "It writes in your voice" with a greyed subtitle [desktop]
- `h3 + p`: "It stops when paid" with a greyed subtitle [desktop]

