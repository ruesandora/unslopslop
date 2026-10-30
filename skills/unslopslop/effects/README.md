# Effects library

Texture, light and glass for real websites, rebuilt by hand in plain CSS, SVG and WebGL. Each effect is one self-contained HTML file with live parameters, a still frame under reduced motion and a fallback. No packages.

Open [`index.html`](index.html) for the gallery. Every effect folder has `demo.html` (live, with sliders and "try your own image"), `README.md` (how it works, parameters, cost, when it becomes slop) and `screenshot.jpg`.

## When to reach for this folder

The direction brief (`../references/project-read.md`) names a texture, a material or a light. Then:

1. Pick **one** effect from the table below that matches the brief's material and the place it will live (hero, card media, section band, image treatment).
2. Open its `demo.html`, set the project palette and, if there is one, the project's real image. Tune until it serves the content rather than competing with it.
3. Copy the demo's `<script>` blocks (runtime plus effect) into the page, or export one still frame as WebP when the effect does not move.
4. Run the detector on the page and look at 1440 and 390. If the effect sits behind text, check the contrast against its brightest spot.

One signature effect per screen. Grain may join any of them as a finish.

## The set

| Effect | Group | Fits | Moves | Cost |
|---|---|---|---|---|
| [Ribbed glass](ribbed-glass/) | Glass | hero background, card media, product behind glass | no | low |
| [Frosted glass](frosted-glass/) | Glass | one soft hero visual, one pane over a photo | no | medium |
| [Frosted panel](frosted-panel/) | Glass | one UI pane over a scene, CSS only | no | low to medium (backdrop repaint) |
| [Glass tiles](glass-tiles/) | Glass | material brands, hero background | no | low |
| [Ripple lens](ripple-lens/) | Glass | water or sound story, a reveal moment | yes | low |
| [RGB split](rgb-split/) | Optics | photo heroes, a short glitch on a state change | yes (glitch) | low |
| [Ordered dither](ordered-dither/) | Print and retro | one hero image, a 1-bit texture band | no | low |
| [Halftone](halftone/) | Print and retro | editorial and print-led brands, photo heroes | no | low |
| [ASCII render](ascii-render/) | Print and retro | developer tools, an image made of type | no | low |
| [Pixel mosaic](pixel-mosaic/) | Print and retro | game, toy, LED and signage stories | no | lowest |
| [Scanlines](scanlines/) | Print and retro | video and broadcast brands | yes (roll) | low |
| [Plaid weave](plaid-weave/) | Pattern | textile, heritage, packaging | no | low |
| [Mesh gradient](mesh-gradient/) | Light and colour | calm hero background with content on top | yes | low |
| [Warped field](warped-field/) | Light and colour | organic, painterly backgrounds | yes | highest here |
| [Caustics](caustics/) | Light and colour | water, glass, drinks, skincare | yes | medium |
| [Light rays](light-rays/) | Light and colour | a real light source behind a product | yes | low |
| [Iridescence](iridescence/) | Light and colour | foil, pearl, cosmetics; one object or band | yes | low to medium |
| [Soft blobs](soft-blobs/) | Light and colour | an aura behind a product or portrait | yes | low |
| [Duotone](duotone/) | Image treatment | photo grids from mixed sources | no | low (SVG filter) |
| [Film grain](film-grain/) | Finish | every gradient and flat hero | flicker | lowest |
| [Grain overlay](grain-overlay/) | Finish | the same, with no canvas at all | optional | near zero |

The three that pay off most often on real sites: **grain** (fixes banding and flatness for almost nothing), **ribbed glass** (one strong material for a hero or card media) and **duotone** (makes a set of unrelated photos belong to one palette).

## Rules every effect follows

- **Reduced motion:** `prefers-reduced-motion: reduce` renders one still frame and never loops. The play button stays available for people who choose motion.
- **Off screen:** animation pauses when the canvas leaves the viewport or the tab is hidden.
- **Pixel ratio:** capped at 2 (1.5 on narrow screens). A full-screen shader at 3x on a phone costs a lot and shows nothing more.
- **Fallback:** no WebGL means a CSS gradient in the palette. Context loss on phones recovers on its own.
- **Units:** dot, cell, line and glyph sizes are in CSS pixels, so a pattern looks the same on every screen.
- **No invented content:** demos run on a generated gradient or a generated test scene. Text in demos is labelled as placeholder.

## When any effect becomes slop

- It is there because it is available, not because the brief asked for a material.
- Two or more strong effects on one screen (glass plus halftone plus rays).
- It sits behind body text and the text drops under 4.5:1 at the brightest spot.
- Purple-to-blue palette by default. Take the palette from the project.
- It loops forever in a place where nothing is happening.
- The detector already treats a blurred colour orb and frosted cards as default moves (`../references/rules.md`); these effects do not exempt a page from that.

## Building and checking

```
node effects/build.mjs           # rebuild every demo.html from effect.js, and index.html from the READMEs
node effects/capture.mjs         # fresh screenshot.jpg for every effect; fails on a shader error
node effects/capture.mjs halftone --ui out/   # one effect, plus the demo page at 1440 and 390
```

Shader effects keep their source in `effect.js` (parameters, notes and the fragment shader); `demo.html` is generated from it and the shared runtime in `_runtime/fx.js`. CSS and SVG effects (`frosted-panel`, `grain-overlay`, `duotone`) are hand-written `demo.html` files. The gallery uses Schibsted Grotesk (SIL Open Font License, text in `_assets/fonts/`).

To add an effect: make a folder, write `effect.js` with the same shape as the others, run both scripts, then add a README (the existing ones are the template) and a row in the table above.
