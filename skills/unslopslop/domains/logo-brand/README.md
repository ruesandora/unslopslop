# Domain: Logo and brand identity

Status: **early**. Content is thin; extend it as references arrive.

## What good looks like
- A mark that comes from the project (a verb, a material, a local reference), not from a shape library.
- Works in one colour, at 16 px, reversed on dark, and in a long and a stacked lockup.
- A small system around it: the colour combination with roles, the type pairing, one graphic device (pattern, crop, stamp) used sparingly.

## Workflow specifics
1. Brief plus 20 words around the product (nouns, verbs, materials). Sketch 10 directions as rough SVG, keep 3 that differ in idea, not style.
2. Draw in SVG with few points; test at 16, 32, 64, 256 px and in one colour.
3. Show each candidate in use (app icon, header, invoice, social avatar).

## Medium-specific slop signs
Generic swoosh, gradient monogram in a rounded square, AI-blob of overlapping translucent circles, a lightbulb or rocket for "ideas", random letter in a hexagon, text set in the default sans with a coloured dot.

## Craft signals
A clear idea you can say in one sentence, legible at 16 px, distinctive silhouette, sensible geometry, survives one colour.

## Deliverables
`logo.svg`, mono and reversed versions, small-size test PNG (16, 32, 64 px), lockups, a one-page usage sheet.

## Checks the detector runs
Not automated yet. Manual checks: path count, one-colour render, 16 px render.

## Recipes
- **Palette as pairs.** Deliver colours as roles (recognition, contrast, accent, ink, ground) plus the allowed text-on-ground pairs with their contrast ratios, and the pairs forbidden for small text. A row of swatches is not a palette.
- **One signature device.** One shape used whole, cropped, as a pattern and as a counter; show its scale and crop rules on their own page.
- **Exact fonts.** Name families with roles (display, headline, body, caption), two or three at most; flag any render that drifts from the spec.
- **Consistency audit before scaling.** Check every applied piece against the system before making more.
- **Brand book skeleton.** One slide frame for the whole book: title top left with a hairline under it, a text column of about 22% with three or four short paragraphs, a specimen panel of about 58% (corner brackets around type specimens), one italic line bottom left that states the slide's idea, and a footer row of four equal columns (mark, document, section, page). Only the specimen changes. Board `inspiration/boards/brand-deck-slide.html`.
- **Swatches with a tint ladder.** Show each colour as a tall bar that continues above and below in three translucent steps over the slide ground, with its hex, its role in one line ("signature", "spark, use sparingly", "charts and quiet moments") and the approved text pairs.
- **One shape, three jobs.** Write down which job each use of the signature shape does: recognition (flat shape), appetite or proof (a real photo inside the shape), count (the product's real quantity as a grid). Give its geometry as ratios (for example a disc of 1.00 D with a core of 0.44 D, off centre) so anyone can redraw it. Board `inspiration/boards/signature-shape-system.html`.
- **Scale and crop row.** Show the mark complete, as a large crop that becomes artwork, and as a small concept tile, side by side, so designers know how far they may crop.
- **Clear space as a letter.** Define clear space with a measure from the mark itself (for example half the height of the lowercase o) and a smallest digital size in pixels (for example 120 px wide).
- **Cover light.** One generated image (a folded light sheet, a material) that is the book cover, the logo backdrop and a section band. Effect `../../effects/light-ribbon/`; keep a third of the frame empty for the title.
- **Letter window.** A round letter of the wordmark becomes a frame for real use moments in brand films; it flicks through pictures at about 200 ms each, lands, then the line arrives word by word. Recipe `../../recipes/letter-window/`.
- **Mark with a hidden turn.** For product marks with a character: a seasonal or launch costume that appears part by part on hover, never at rest. Recipe `../../recipes/mark-turn/`.

## More slop signs
- A brand book where every page has a different layout and nothing repeats.
- Swatches without roles or contrast pairs; a palette of ten equal colours.
- A signature shape that appears once on the cover and nowhere else.
- Usage rules written as "be bold, be human" with no measurable rule (sizes, ratios, pairs).
