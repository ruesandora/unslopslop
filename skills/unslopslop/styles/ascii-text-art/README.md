# Style: ASCII and text art

Status: **ready**. Demo: `demo.html` (dependency-free).

## Defining traits
Images rendered with characters or character-like cells: typographic halftone. Families:
- **Characters:** a brightness ramp of glyphs (for example ` .:-=+*#%@`).
- **Keycaps:** each cell drawn as a small key with a glyph.
- **Blocks and quadrants:** block elements for chunky, high-contrast images.
- **Dots and braille:** 2x4 dot cells for fine detail.
- **Mixed:** glyph by brightness, colour from the source.
Character sets to choose from: classic ramp, ink (dense strokes), minimal (few glyphs), blocks, quadrants, braille, binary (0 and 1), kana, math symbols. Neighbouring techniques: dither, halftone, LED matrix, CRT and scanline.

## When it fits
Web heroes for developer tools, music and art projects, motion openers, social posters, a large-size logo variant. Not for small body text, not for the main heading without real text.

## How to build it ourselves
1. Draw the source (image, video frame, generated shape) to a small offscreen canvas, for example 80 x 45 cells.
2. Per cell, luminance = 0.2126 R + 0.7152 G + 0.0722 B (linearise first for accuracy).
3. Map luminance to the ramp index; optional ordered (Bayer) or error-diffusion dithering before mapping.
4. Draw glyphs into one output canvas (cell aspect about 0.5, width : height). Do not build a giant `<pre>`; it is slow and inaccessible.
5. Colour modes: mono (one ink on one ground), source colour, or a palette of 2 to 4 colours.
6. Live video or generative mode: requestAnimationFrame plus drawImage per frame; keep the grid small. For large grids use WebGL with a glyph atlas.
7. Accessibility: the canvas gets `role="img"` and an `aria-label`; any real text stays real text. Under `prefers-reduced-motion` render one still frame.

## Palette combinations
| Mood | Set |
|---|---|
| Terminal calm | graphite ground 85%, bone glyphs 13%, one signal colour 2% for the cursor or highlight |
| Print | warm paper ground, ink glyphs, nothing else |
| Night poster | ink blue ground, cyan-white glyphs from source brightness, one warm accent |

## Type
One monospace with an open licence (SIL OFL monospace families are easy to find). Use one face only.

## Do / don't
- Do use one monospace and one or two colours. Don't use green "matrix rain" by reflex.
- Do keep real text (headline, nav, buttons) as text and label the canvas. Don't replace the h1 with ASCII without an aria-label.
- Do confine the effect to one area. Don't animate large areas forever or put ASCII over busy gradients.
- Do keep contrast at 4.5:1 for any glyph that carries meaning.

## Its slop versions (detectable signs)
- Unreadable noise: high-frequency glyphs with no recognisable subject.
- Random green rain on black as decoration.
- ASCII on top of busy gradients.
- The main heading replaced by ASCII without real text or `aria-label` (`a11y-no-name`, `page-no-heading`).
- The same effect in every section.
- Endless animation of a large area (`motion-infinite`).

## Tools (techniques, no specific products)
Browser canvas, a glyph atlas for WebGL, figlet-style banner fonts (check each font's licence), online ASCII converters for exploration only.
