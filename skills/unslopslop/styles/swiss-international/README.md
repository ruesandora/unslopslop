# Style: swiss international

Status: **growing** (first full pass, from measured references C27, C22 and C28).

## Defining traits
- A strict column grid with flush-left, ragged-right text; nothing centred except by intent.
- One grotesk family carries everything; hierarchy comes from size steps and position, not from colour or many weights. The display line is large and light (weight 300 to 400) with tight tracking (-3 to -4%), set in two lines.
- A second voice in small mono capitals for facts, labels and short paragraphs (10 to 12 px, tracked +0.02 em).
- One neutral ground (paper white, putty, light grey) at 55 to 90% of the first screen; ink near black; at most one signal colour (red, orange or a deep blue) under 3%.
- Photography in hard rectangular crops, often bleeding off one edge, never in rounded cards with shadows.
- Lists and tables as the main layout device: services, projects and facts set as rows with rules between them.

## When it fits
Architecture, engineering, design studios, typefoundries, research groups, product pages for exact tools, annual reports. Not for playful consumer brands unless the brief asks for restraint.

## Palette combinations (our method, see `../../references/palette-combinations.md`)
- Putty and ink: ground about #F2F1EE 60%, ink #191919 10%, photograph 25%, white panels 5%.
- White, ink and one red: white 80%, ink 15%, signal red under 3% (only the mark or one rule).
- Cool grey field: grey #E9EAEC 70%, ink 20%, one blue for links only.

## Type
- One neo-grotesk or grotesk with a light and a regular weight; the display weight is the light one. Check the family against `../../references/ai-default-fonts.md` and write a reason if it is a default.
- One mono for labels and facts.
- Sizes in a clear ratio: for example 160 / 62 / 16 / 11 px on desktop (display, section, body, label); 40 / 34 / 15 / 11 on a phone.
- Line height 0.9 for the display, 1.4 to 1.5 for body; tracking negative only on the display.

## Build notes
- Put the display line at the left edge of the grid (about 20 px from the viewport on desktop), not centred in a container.
- Give the mono paragraph its own column of about one fifth of the width beside the display line.
- Offset the first image: let it start at about 40% of the width and bleed to the right edge (board `../../../../inspiration/boards/giant-tight-display.html`).
- Rows for services and projects: a bullet or index, a large name (about 60 px), a mono line, one small action at the end of the row.
- Motion is almost absent: colour and underline transitions of 200 to 300 ms; no entrances.

## Do / don't
- Do: let the grid and the white space carry the page; use real project photos with dates and places.
- Do: write facts as small mono labels in corners (year, location, project type).
- Don't: grey half of a heading to fake hierarchy (rule `color-faded-heading-part`); use size or a line break instead.
- Don't: round corners and drop shadows on photos; centred hero; three feature cards with icons.
- Don't: invent figures ("230 projects completed") or repeat one FAQ question to fill a template.

## Its slop versions (detectable signs)
- A "swiss" page that is only a centred bold headline and a grid of identical cards (`layout-identical-cards`, `type-flat-hierarchy`).
- Mono used for whole paragraphs of body copy (`type-mono-outside-code` where it is not a label).
- Pale grey second words in headings (`color-faded-heading-part`).
- Display type under about 6% of the screen height on a page with no image (`bland-timid-display`).

## Tools (techniques)
Baseline grid overlay while building (a repeating 4 or 8 px background), column guides, a type scale written as CSS custom properties, tabular figures for dates and numbers.
