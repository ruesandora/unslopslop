# Domain: Website and UI animation

Status: **early**. Content is thin; extend it as references arrive.

## What good looks like
- Every movement has a reason (explain, confirm, guide) and a written duration and curve.
- Entrances 300 to 900 ms ease-out, state changes 150 to 250 ms, exits shorter than entrances; nothing starts from scale 0.
- One focus per moment; choreography in sequence, not everything at once.
- Written as a pure function of time (`render(t)`) when it is a sequence, so it can be tested, scrubbed and frozen for reduced motion.

## Workflow specifics
1. Write the storyboard as beats (one idea per beat, about 1 s each).
2. Implement `render(t)`; drive it with requestAnimationFrame; stop at the end.
3. Measure with `scripts/motion-probe.mjs`; compare timing with the reference; export a frame strip.

## Medium-specific slop signs
Infinite floating shapes, everything fading up on scroll, bouncy easing on large surfaces, typewriter cursors that never stop, parallax for its own sake.

## Craft signals
A demo that explains the product, interruptible transitions, consistent curve family, reduced motion that still shows the final state.

## Deliverables
The animated component, a frame strip PNG, optional webm/mp4, measured timings.

## Checks the detector runs
`motion-*` rules, the craft motion component (does something move inside the visual, is reduced motion handled), `motion-probe.mjs` for timing.

## Recipes
- **Geometric decay.** Layers move by a ratio, not a constant: layer n angle = A x 0.7^n, delay = 28 ms x n; close runs in reverse (innermost first). Depth reads without decoration.
- **Book card.** Cover, 2 to 6 leaves and a fixed back board behind an ordinary card. Perspective about 1100 px on the static parent, origin at the hinge. Fan about 42, 29, 21, 14, 10 degrees (A = 24 subtle, 42 default, 60 dramatic), 28 ms stagger. Spring that settles in about 0.3 s, or 420 ms `cubic-bezier(.3, 1.2, .5, 1)`. Transform and opacity only. Rest state looks exactly like the plain card. Reduced motion: lift 2 px plus a shadow crossfade.
- **Two-pass shadow.** Never animate `box-shadow` or blur radius. Put two pre-blurred shapes behind the element (contact: tight and dark; ambient: wide and faint) for rest and for open, and crossfade their opacity with one progress value. One light source for everything.
- **One path for clip and edge.** The same path clips the layer and is stroked as its hairline; nested radius = outer radius minus inset. Do not mix a CSS border with a clip-path corner.
- **Static hit area.** Hover and focus live on the non-moving parent; moving children get `pointer-events: none`. `:focus-visible` opens it like hover.
- **Radial picker.** 8 to 10 chips on a ring around the trigger. Open: scale up from the centre while the ring rotates from about -90 degrees to 0 with a per-item stagger, about 600 ms with gentle overshoot, then a slow settle of about 0.7 s. Close: about 400 ms back to the centre, reversed stagger. Hover darkens the icon only.
- **Stretch and settle.** A selection indicator first stretches to cover the old and the new choice (190 ms, cubic-bezier(.32, .72, .24, 1)), then lets go and settles on the new one with a small overshoot (420 ms, cubic-bezier(.28, 1.28, .36, 1)). Demo: `../../recipes/stretch-settle/`.
- **Part-by-part costume.** A character mark changes in a sequence of parts, each with its own origin, delay (0 to 120 ms) and overshoot (cubic-bezier(.34, 1.56, .5, 1)); a flicker uses step-end so it never looks like a fade. Demo: `../../recipes/mark-turn/`.
- **Point morph.** Two icon states share stroke and point counts; vanishing strokes collapse to a point and fade; ease from the current points so reversals are smooth. Spring about 500 ms, two-step morphs 620 ms. Demo: `../../recipes/morph-icons/`.
- **Letter window.** A round letter of the mark as a picture window: hard cuts every 200 ms, land, then words 300 ms apart. Demo: `../../recipes/letter-window/`.
- **Product film by commands.** Beats of one label pill, one window and one command chip typing at about 40 characters per second; checklist lines every 400 ms that arrive dim and settle; a title that darkens word by word. Demo: `../../recipes/prompt-reel/`.
- **Streaming tail.** New words arrive in the accent and settle to ink in about 600 ms; no cursor, no blur. Demo: `../../recipes/streaming-tail/`.
- **Drifting field.** Three depths (0.45, 0.7, 1) for size, speed and opacity; 20 to 30 px per second; a clear ellipse around the content. Effect: `../../effects/card-drift/`.

## More slop signs
Stagger by index only (same distance, constant delay, nothing else changes); shadows that stay on a layer after it lifts away; animated blur or box-shadow; the moving element is also the hover target, so it flickers at the edge.
