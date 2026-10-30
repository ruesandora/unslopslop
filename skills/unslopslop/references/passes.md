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

## Image priority

1. The project's own photos, screenshots, product footage.
2. Generated locally in code (CSS, canvas, SVG data visuals, charts from real data). No paid generation services.
3. Open-licensed images (CC0; CC BY and CC BY-SA with credit on the page or in a credits file).
4. Code-drawn illustration, last: decorative SVG doodles do not count as imagery for `image-poverty`.

## Rounds

Check at 1440, 768 and 390 px. Each round: list the findings, fix the worst three, re-run. Three rounds at most. Anything left is reported as open with the reason, never silenced.

## Keep a record

For each pass write one line: score before, score after, what changed. The final report is that list plus the compare PNG.
