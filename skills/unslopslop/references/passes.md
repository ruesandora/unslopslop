# Fix passes

Run in this order. Each pass has an exit check: the matching rows of the detector report reach zero. Re-run `scripts/detect.mjs` after every pass and write down the score.

| # | Pass | Do | Exit check |
|---|---|---|---|
| 1 | spacing | Choose a 4 px scale (4, 8, 12, 16, 24, 32, 48, 64). Snap padding and gaps to it. Controls get at least 12/8 px padding, cards 16 to 24, page margin 16 (phone) to 24+ (desktop). | `spacing-*`, `layout-text-at-edge` |
| 2 | color | One accent chosen on purpose, neutrals tinted toward it. Remove purple-to-blue gradients, gradient text, glow, blobs, rainbow charts. Check contrast: 4.5:1 body, 3:1 large. | `color-*`, `image-blur-blob` |
| 3 | icons | One icon set, one size, one stroke. Remove emoji used as icons and coloured icon tiles. Delete icons that add nothing. | `icon-*` |
| 4 | copy | Say the concrete thing. Cut cliche vocabulary, "not X but Y" lines, invented proof, placeholder names, greeting headings, full stops on short UI text, scattered em dashes. Label sample data as sample data. | `copy-*` |
| 5 | typography | Pick families on purpose (write the reason in DESIGN.md). Scale with clear steps (title at least 2x body). Body line-height 1.5 to 1.7, measure 60 to 75 characters, weights 400 and 500, no eyebrow labels, no monospace outside code, no text under 13 px. | `type-*`, `page-*heading` |
| 6 | layout | One focal point per screen. Rank content: one large block, the rest smaller. Replace identical card rows with a list or one dominant block. Remove nested cards, side stripes, stat strips. Left-align long text. Collapse side nav on phones. | `layout-*`, `page-*` |
| 7 | detail | Remove pulse dots, version badges, announcement pills, scroll hints, decorative numbering, arrow glyphs, fake window chrome, heavy shadows, frosted glass. Restore focus rings, give every control a name, use real buttons. | `detail-*`, `a11y-*` |
| 8 | imagery | Replace stand-in images. Real photos or product screenshots where the subject needs them. Add alt text and video posters. | `image-*` |
| 9 | motion | Remove loops and blanket fade-ups. Keep one purposeful moment. Respect reduced motion: content visible by default, animation off. | `motion-*` |

## Rebuild recipe (heavy verdict)

When the verdict is heavy, patching tells one by one produces a cleaner version of the same template. Rebuild instead, in this order, from the DESIGN.md:

1. **Type**: families, scale, weights, measure.
2. **Color**: tokens only (paper, ink, muted, line, one accent).
3. **Layout**: the grid and the ranking of content; decide the focal point first.
4. **States**: hover, focus-visible, active, disabled, empty, loading, error for every control.
5. **Components**: build the few components the page needs from those tokens.

Then run the nine passes as an audit.

## Craft passes (after the slop passes)

Removing slop leaves a bare page. These passes put the craft in. Exit check: craft score at or above 70 and no bland signal left (`bland-*` in the report).

| # | Pass | Do |
|---|---|---|
| A | bolder | Take the strongest move the direction already has and use it at full strength: a display headline at 2.5x body or more, the product view large and early. Quiet everything around it. |
| B | visual | Put the product (or its subject) on the first screen at 20 to 40% of the area: a built UI with real-looking states, a real photo, a meaningful drawing. |
| C | layers | Stack surfaces: one raised panel with a soft layered shadow, one element overlapping its edge, a second and third tone. Not cards inside cards. |
| D | texture | Add one material that suits the project: fine grain, a pattern or watermark in one zone, a directional light behind the subject. Under 10% opacity. |
| E | animate | Write one moment that explains the product, as a pure function of time, then stop. Everything else stays still. Reduced motion shows the final frame. |
| F | identity | Check the type pairing, the colour combination and the signature move against the brief. Run the template test. |

## Recipes

- **Swap with a smear.** When text or a step changes in place: slide 8 to 12 px, 150 to 250 ms, ease-out, with a 2 to 4 px blur at mid-travel. Reduced motion: swap instantly.
- **Texture instead of a blob.** Replace a blurred colour orb with grain, a dithered or ordered pattern, or a 1-bit texture drawn in code. If a gradient stays, add grain on top so it does not band.
- **Live component instead of a screenshot.** When the product is UI, build the real component small and working (a toggle that changes the preview) rather than a picture of it.
- **Subject breaks the headline.** One real subject overlaps oversized display type, with deliberate z-order. A focal point without a blob.
- **Paper plus one.** Warm neutral ground, near-black ink, one accent, one inverted element as the focal point.
- **State ladder.** Too much on one card: pill (glance), card (current step and the last three), popover (details). Colour only for running, needs-you and done.
- **One idea per beat.** In promos and explainers: one idea per beat, about 1 s each, 0.6 s transitions, real content in frame.
- **Tabular figures.** Every number that changes or lines up in a column gets `font-variant-numeric: tabular-nums`.

## Direction rules

- **A bad direction is not patched; restart.** Classify feedback: local (spacing, one value, one detail) means refine; foundational (mood, type system, colour logic, material, hierarchy, price level), or a second refine that creates new drift, means restart. On restart keep only an explicit KEEP list of abstract decisions; never reuse the rejected board as a reference.
- **Split every reference** into (a) transferable principles (composition family, hierarchy, light, material, pacing, white space), (b) things that must not be copied (marks, packaging, proprietary type, characters, patterns, claims), (c) how (a) maps to this brief. The brand system controls identity; the reference never does.
- **Exact fonts.** Name families, not categories ("a bold grotesk" is not a spec).
- **Monochrome needs a drawn layer.** A one-hue page needs grid lines, tint steps or line illustration, or it goes flat.
- **Ornaments carry content.** A repeated device (badge, marquee, highlight) must say something; otherwise remove it.

## Image priority

1. The project's own photos, screenshots, product footage.
2. Generated locally in code (CSS, canvas, SVG data visuals, charts from real data). No paid generation services.
3. Open-licensed images (CC0; CC BY and CC BY-SA with credit on the page or in a credits file).
4. Code-drawn illustration, last: decorative SVG doodles do not count as imagery for `image-poverty`.

## Rounds

Check at 1440, 768 and 390 px. Each round: list the findings, fix the worst three, re-run. Three rounds at most. Anything left is reported as open with the reason, never silenced.

## Keep a record

For each pass write one line: score before, score after, what changed. The final report is that list plus the compare PNG.
