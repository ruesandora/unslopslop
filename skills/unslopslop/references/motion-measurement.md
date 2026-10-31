# Measuring motion

Use this when the user points at an animation they like ("make it feel like this"). Measure the timing; never copy the look.

## What you may take, and what you may not
- Take: duration, delay, easing class, stagger interval, order, direction, distance relative to the element size.
- Do not take: shapes, colours, copy, imagery, icons, illustrations. Those come from your own design system. If asked for "the same look", stop and ask the person who requested it; that is an imitation question, not a motion one.
- Pages that need a login cannot be recorded; ask for a screen recording.

## Method
1. **Same conditions for both.** Same viewport, same trigger (load, scroll, hover, click), starting from rest. Cold-loaded vs warmed-up pages measure differently.
2. **Read what is declared.** `node scripts/motion-probe.mjs <url|file> --trigger hover:.card` lists running animations and transitions with property, duration, delay, easing, iterations. Declared values beat estimates.
3. **Sample what happens.** `node scripts/motion-probe.mjs <url|file> --trigger click:#go --sample "#panel" --ms 1200` samples opacity and the bounding box on every frame, then reports start, end, duration, overshoot and an easing class (ease-out, ease-in, ease-in-out or linear, overshoot).
4. **Write the spec** before writing code, one row per element and property:

   | Element | Property | From | To | Duration ms | Delay ms | Easing | Note |
   |---|---|---|---|---|---|---|---|

   A "?" left in a row means the frames were not read well; do not code yet.
5. **Build, then probe your own build with the same command**, compare timing (not pixels), change the one thing that reduces the gap most (duration first, then delay, then easing). Five rounds at most; report any row still off by more than 80 ms.
6. Look at a contact sheet of frames. Numbers say something is wrong; frames say what.

## Limits
- Spring physics is approximated by overshoot and settle time; call it "approximate".
- Scroll-linked motion depends on scroll position, not time; compare per scroll offset.
- Canvas and WebGL scenes drop frames in a headless browser; measure with a stepped clock, or ask for a recording.

## Writing animation as a pure function of time
Prefer `render(t, state)` that returns what to draw, with no hidden clock, randomness or accumulated state. Benefits: unit-testable (same input, same output), loops exactly (`render(t) == render(t + period)`), and frame-exact video export (step `t` by 1/30 s, screenshot each frame, encode). See `examples/motion-pure/render.mjs` and its tests.

A hover-reactive texture is the same idea with the pointer as input: one dependency-free file, a swelling dot grid, one smooth falloff, a still frame under reduced motion.

## Typical ranges (starting points, not laws)
Press feedback 100 to 160 ms; small reveals and menus 150 to 250 ms; dialogs and sheets 200 to 400 ms; ease-out for things entering, ease-in-out for things moving on screen; transform and opacity only.
