# DESIGN.md template

A DESIGN.md is a short design-system file an AI agent reads before it writes UI. Section order follows the commonly used design.md layout (Overview, Colors, Typography, Layout, Elevation, Shapes, Components, Do/Don't); this template adds a **Motion** section at the end, because timing is where generated UI most often goes wrong.

Keep it under one page. Every value is a decision, not a suggestion. If a value has no reason, it does not belong here.

```markdown
# <Product> design system

## Overview
One paragraph: what the product is, who uses it, the tone in three words.
Signature move: the one thing only this product would do.

## Colors
- paper `#...`, surface `#...`, ink `#...`, muted ink `#...`, line `#...`
- accent (one) `#...`: where it is allowed (primary button, links)
- status colours only if the product has statuses: name, hex, meaning
- Contrast checked: body 4.5:1, large 3:1.

## Typography
- Type recipe: <id from type/>, why it fits the mood (not the recipe of the previous project).
- Display, text and mono families; the ladder at 1440 and 390 from the recipe, adapted. Weights, line heights, tracking, case, numeral features.
- Signature treatment from the recipe, and where it is allowed (one place per screen).

## Layout
- Grid and content width. Spacing scale (4 px rhythm). Alignment rule.
- Breakpoints and what collapses (sidebar becomes ... below 760 px).

## Elevation
- What separates surfaces: lines, tint, or shadow. When a shadow is allowed (floating layers only).

## Shapes
- Radii by component (control, card, chip). Nested radius = outer radius minus padding.

## Components
- For each component: anatomy, states (default, hover, focus-visible, active, disabled), one example of correct use.

## Do / Don't
- Do: three concrete rules.
- Don't: the tells this product must never show (gradients, glow, eyebrow labels, stat strips ...).

## Motion
- Allowed moments (list them). Everything else is still.
- Durations: press 100-160 ms, small reveal 150-250 ms, dialog 200-400 ms. Easing: ease-out for entrances, ease-in-out for moves, never ease-in on UI.
- Animate transform and opacity only.
- Reduced motion: content visible by default; animations off or replaced by a fade under 100 ms.
- Loops: none, except real loading indicators.
```

See `examples/saas-landing/DESIGN.md` and `examples/dashboard/DESIGN.md` for filled-in versions.
