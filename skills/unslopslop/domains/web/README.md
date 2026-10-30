# Domain: Web pages (landing, marketing, product, portfolio)

Status: **ready**.

## What good looks like
- The first screen states the job in one display line and **shows** the product doing it (a built UI, a photo, a drawing with a subject) at 20 to 40% of the screen.
- One direction from the brief carried through: type pairing, colour combination with roles, one texture, one signature move.
- Sections that change rhythm (dense, airy, dark band, light band), each with a heading, ranked content, not identical card rows.
- One written motion moment (a demo as `render(t)`), the rest still; reduced motion shows the final frame.

## Workflow specifics
1. Project read and brief (`../../references/project-read.md`).
2. Build the first screen alone; screenshot 1440 and 390; the reference gate against the strongest reference.
3. Add sections one at a time; each must earn its place (a fact, a proof, an interaction).
4. `detect.mjs` until slop is clean and craft is 70+; then the template test.

## Medium-specific slop signs
Purple-blue gradient hero, announcement pill, coloured headline keyword, avatar stack with "10,000+ teams", stat strip, three identical icon cards, blurred orb, fade-up on everything, fake window dots.

## More slop and bland signs
- **Stock dark launch:** black hero, centred two-line headline, one orange or red pill button, an install-command chip, for a product that is not a developer tool (rule `layout-stock-dark-launch`).
- **Showcase ornament:** a library "wow" component (glow orb, beam, spotlight, shimmer border, particle field) with no job; delete it and nothing is lost (rule `detail-showcase-ornament`).
- **Neutral commerce template:** white, grey and a stock blue button, products on white, no brand ink, no type with weight.
- **Hover that only scales:** cards where hover changes shadow or scale and reveals nothing.

## Recipes
- **Explaining mega menu:** two text columns (label plus one plain line each) and a preview tile; each item owns one drawing that redraws on hover in under 500 ms.
- **Commerce ink:** a brand ink replaces black for headings and full-bleed bands; one saturated action colour only for buttons, arrows and the "us" column.
- **Devices with jobs:** every repeated graphic device carries content (badge = promise, marquee = proof, table highlight = our offer). Remove the ones that carry none.

## Craft signals
Display type at 2.5x body or more; product visual on the first screen; overlapping layers; grain or tonal light; tabular figures; real interaction (a control that changes a preview).

## Deliverables
`index.html` (or the framework's page), DESIGN.md, before/after PNGs at 1440 and 390, detector reports.

## Checks the detector runs
All slop rules, bland rules and the craft score (`scripts/detect.mjs`).
