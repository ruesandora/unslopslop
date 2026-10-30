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
