---
name: unslopslop
description: Design anything (web page, app screen, dashboard, email, logo, motion, social visual) so it looks like a strong studio made it for this specific project, and prove it with two numbers: slop (default moves, lower is better) and craft (hierarchy, focal point, real visual, purposeful motion, identity, density; higher is better). Use when building or redesigning UI, when something "looks AI-made", "looks generic", "looks bland", or when the user says "unslop". Reads the project first, picks a direction, palette combination, texture and motion for it, loads the matching domain and style packs, then detects, compares with references and iterates.
---

# unslopslop

Two failures, one goal. **Slop** is what is left when nothing was decided (default gradient, card grid, filler copy). **Bland** is what is left when slop is stripped and nothing is put back (beige document, default serif, no visual, no motion). The goal is the third thing: a design made for this project, with layers, tones, texture, depth, a real visual and purposeful motion. Read `../../PHILOSOPHY.md` once if this folder sits inside the unslopslop repo.

Scripts need Node 20+ and Playwright with Chromium installed (nothing is bundled). Paths are relative to this folder.

## Before anything: load context

1. `references/project-read.md`: read the project, write the direction brief. No brief, no design.
2. Pick the **domain pack** from the request: `domains/web`, `domains/dashboard`, `domains/mobile`, `domains/email`, `domains/logo-brand`, `domains/motion`, `domains/social`. Read its README.
3. If a style is named ("retro pixel", "swiss", "ASCII art") or clearly fits, load `styles/<style>/README.md` and combine it with the domain pack (style decides look, domain decides constraints). Styles marked *early* are thin; say so.
4. If `../../inspiration/catalog.md` exists, pick 2 or 3 references whose tags match (domain, style, mood, palette, motion). Measure them, never copy them.
5. Colour: `references/palette-combinations.md`. Sets of two to four with roles and shares, chosen for the mood.

## Loop

1. **Capture** the current state (if there is one): `node scripts/detect.mjs <file|url> --out .unslop/before`. Open both PNGs.
2. **Read both numbers.** Slop verdict: `heavy` (35+) rebuild, `light` polish, `clean` keep. Craft: below 70 means the page is missing qualities; the `bland-*` signals say which.
3. **Build or rebuild** from the brief: first screen first, with real content. Heavy slop: rebuild in the order type, colour, layout, states, components (`references/passes.md`).
4. **Slop passes** (spacing, color, icons, copy, typography, layout, detail, imagery, motion), then **craft passes** (bolder, visual, layers, texture, animate, identity). Re-run the detector after each.
5. **Kapı R (reference gate).** Put your first screen next to the strongest reference at the same size (`node scripts/compare.mjs <reference> <yours> --out cmp.png`). Write the differences in light, texture, depth, card anatomy, type, density and motion. Ask honestly: would a picky designer call it bland? Fix, re-run. At most three rounds.
6. **Prove it.** `detect.mjs` after, `compare.mjs` before/after at desktop and `--viewport mobile`, the template test (`references/template-test.md`). Report slop and craft before and after, the PNG paths, and what is still open.

A page passes only with a clean slop verdict **and** craft at 70 or more (`--min-craft 70` in CI).

## Rules of the road

- The numbers measure tells and presence, not taste. Always look at the screenshots at 1440 and 390.
- Do not copy another site's look. From references take timing, proportion and ideas; never shapes, copy, imagery or palettes as-is (`references/motion-measurement.md`).
- No paid generation without the user's approval of the cost. Image priority in `references/passes.md`.
- Never invent proof: user counts, ratings, logos, testimonials. Example data is labelled as such.
- Keep changes reversible: write next to the user's file or on a branch.
- Disabling a rule (`--disable id`) needs a reason in the report.

## Files

- `scripts/detect.mjs`: renders at 1440 and 390 (plus a reduced-motion pass), runs slop rules, bland rules and the craft probe; JSON and markdown; hides consent banners (`--keep-consent` to keep). `--fail-on`, `--min-craft`.
- `scripts/compare.mjs`: side-by-side PNG (`--wait` lets a one-shot demo finish).
- `scripts/motion-probe.mjs`: declared and measured timing of one element.
- `scripts/intake.mjs`: capture a reference URL into `inspiration/` (screenshot, palette, fonts, motion timings).
- `references/`: project read, palette combinations, passes and recipes, rule catalogue (generated), DESIGN.md template, motion measurement, template test.
- `domains/`, `styles/`: packs, loaded on demand.
