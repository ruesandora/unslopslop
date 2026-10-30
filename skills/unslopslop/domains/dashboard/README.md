# Domain: Dashboards and app screens

Status: **ready**.

## What good looks like
- One question per screen answered at the top (the number that matters, with its comparison base and date).
- Dense but calm: 13 to 15 px UI text, tabular figures, aligned columns, quiet lines, few surfaces.
- Charts drawn from data (SVG or canvas), honest axes, one accent for the key series, example data labelled as example.
- Side navigation with counts on desktop; a header with a menu toggle on phones; tables drop columns instead of scrolling the page.

## Workflow specifics
1. Write the screen's one question and the three things a user does here.
2. Lay out: lead number, main chart, the work queue, the table. Rank by what is acted on most.
3. Make the data consistent across widgets (totals, counts, dates must agree).
4. Detect at 1440 and 390; check `layout-side-nav-mobile`, `layout-uneven-rows`, `type-live-number-proportional`.

## Medium-specific slop signs
Greeting as title ("Welcome back, Alex"), KPI strip of four numbers without comparison, rainbow chart series, glass cards, pulsing live dots, sparkline confetti, emoji icons.

## Craft signals
A lead number with context, a chart that tells one story, a queue of real next actions, states shown as text plus shape, tasteful draw-in once.

## Deliverables
The screen (HTML or components), example dataset clearly marked, PNGs, reports.

## Checks the detector runs
All web checks; app screens are recognised automatically (table on the first screen or side navigation) and judged on density.

## Recipes
- Module or report cards can use the book card in a documentation skin (flat off-white or graphite, a small line diagram, section number over a hairline); timing in `../motion/README.md`.
