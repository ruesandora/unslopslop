# Composition boards

Thirteen 1440 x 900 diagrams re-drawn from the measurements in `../catalog.md`. Each shows proportion, layer order (z), corner labels and colour share (the strip at the bottom) for one composition family. No source image, wording or shape is reproduced; the subjects are placeholder shapes.

| Board | Family | Catalogue ids |
|---|---|---|
| `subject-over-type.html` | one subject and a screen-wide display word, type in front | C04, C06, C02 |
| `object-and-light.html` | dark stage, one lit object, serif display | C09, C01, C15 |
| `product-on-photo.html` | product card on a photograph, third layer crossing the edge | C10, C17 |
| `product-panel-hero.html` | product output fills 55% of the hero, weight contrast headline | C11, C13 |
| `pattern-hero.html` | code-drawn 1-bit pattern as the image | C12, C16 |
| `tracked-serif-calm.html` | thin tracked serif, painted element cut by the edge | C03 |
| `portrait-corners.html` | full-bleed image, display bottom left, facts in four corners | C05, C23 |
| `object-in-landscape.html` | product object standing in a real place | C17, C01 |
| `brand-deck-slide.html` | one slide skeleton for a whole brand book: title and rule, text column, specimen panel with corner brackets, italic tagline, four-column footer | C24 |
| `signature-shape-system.html` | one geometric shape doing three jobs (recognition, appetite, count) on a two-field palette | C25 |
| `giant-tight-display.html` | two-line display at 160 px with tight tracking, a mono caps column beside it, image offset below | C27 |
| `inline-image-headline.html` | centred headline with picture tiles inside the line, a drifting card field around a clear centre | C26, W34 |
| `window-and-chip.html` | label pill, product window, a command chip on the window edge (one frame of a product film) | C30 |

Use at desktop width only (they are not responsive):

```bash
node skills/unslopslop/scripts/compare.mjs inspiration/boards/subject-over-type.html my-page.html --out ref-gate.png --labels "Reference board,Mine" --max-height 900
```

Rebuild after editing: `node inspiration/boards/build.mjs`.
