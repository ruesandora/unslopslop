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
- **Navigation by job.** Pick the bar from what visitors do: a static bar (three to six links) for small sites; a dropdown when one item has three to eight children; a mega menu only when a section has more than about twelve destinations and each needs a line of explanation; a side bar for documentation and apps with deep trees (never on a phone, rule `layout-side-nav-mobile`); a search bar first when people arrive with a name in mind (catalogues, libraries); a full-screen menu for portfolios with few, large destinations; breadcrumbs for anything three levels deep. An announcement bar only for news that is true today, with a date.
- **Content as the hero's texture.** For products about images (collecting, generating, shopping), let dozens of the product's own small items frame a clear centre (effect `../../effects/card-drift/`), and set one or two pictures inside the headline line at about 0.95 of the cap height, turned plus or minus 6 degrees (board `inspiration/boards/inline-image-headline.html`).
- **Index list reveal.** A list of brands, projects or categories set large; the pointed row keeps full ink and opens a small picture in its line, the rest step back (recipe `../../recipes/index-reveal/`). At rest every row is fully readable.
- **Delight with written timings.** Small, specific motion on controls: a selection indicator that stretches then settles (`../../recipes/stretch-settle/`), icons that move their own lines (`../../recipes/morph-icons/`), a status pill that rolls between true lines (`../../recipes/rolling-pill/`). One kind per control type, durations 160 to 620 ms, overshoot only on small elements.
- **Definition hero.** A quiet product can lead with a short ordered list ("Name is / a. ... / b. ... / c. +") in one text size and one real dated fact; no display type at all (catalogue C28).
- **Giant light display.** One display line at about 160 px, weight 400, tracking about -3.75%, flush left, with a small mono paragraph beside it and an image offset below (board `inspiration/boards/giant-tight-display.html`).

## Newer slop signs
- **Pale heading half:** a heading whose second clause or last word is set in pale grey at the same size (rule `color-faded-heading-part`).
- **Countdown urgency:** a ticking "hh:mm:ss left" beside a claim button (rule `detail-urgency-timer`).
- **Live placeholder:** "Your Sponsor Here", "Lorem", "Company name" visible on a live page (rule `copy-placeholder`).

## Craft signals
Display type at 2.5x body or more; product visual on the first screen; overlapping layers; grain or tonal light; tabular figures; real interaction (a control that changes a preview). Measured ranges and reviewer checks: `../../references/craft-recipes.md`; references to pick from: `../../../../inspiration/catalog.md`.

## Deliverables
`index.html` (or the framework's page), DESIGN.md, before/after PNGs at 1440 and 390, detector reports.

## Checks the detector runs
All slop rules, bland rules and the craft score (`scripts/detect.mjs`).
