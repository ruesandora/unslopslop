---
name: unslopslop
description: Design anything (web page, app screen, dashboard, email, logo, motion, social visual) so it looks like a strong studio made it for this specific project, and prove it with two numbers: slop (owner reading, 100 is the worst: taste not proven plus genre-default tells) and craft (hierarchy, focal point, real visual, purposeful motion, identity, density; higher is better). Use when building or redesigning UI, when something "looks AI-made", "looks generic", "looks bland", or when the user says "unslop". Reads the project first, picks a direction, palette combination, texture and motion for it, loads the matching domain and style packs, then detects, compares with references and iterates.
---

# unslopslop

Two failures, one goal. **Slop** is what is left when nothing was decided (default gradient, card grid, filler copy). **Bland** is what is left when slop is stripped and nothing is put back (beige document, default serif, no visual, no motion). The goal is the third thing: a design made for this project, with layers, tones, texture, depth, a real visual and purposeful motion. Read `../../PHILOSOPHY.md` once if this folder sits inside the unslopslop repo.

Scripts need Node 20+ and Playwright with Chromium installed (nothing is bundled). Paths are relative to this folder.

## Before anything: load context

1. `references/project-read.md`: read the project, write the direction brief. No brief, no design.
2. Pick the **domain pack** from the request: `domains/web`, `domains/dashboard`, `domains/mobile`, `domains/email`, `domains/logo-brand`, `domains/motion`, `domains/social`. Read its README.
3. If a style is named ("retro pixel", "swiss", "ASCII art") or clearly fits, load `styles/<style>/README.md` and combine it with the domain pack (style decides look, domain decides constraints). Styles marked *early* are thin; say so.
4. **Pick references (required).** Open `../../inspiration/catalog.md` and pick 2 or 3 entries whose tags match the brief (domain, style, mood, palette, motion), at least one `role:gold`. Write their ids in the brief's `References:` line, each with the one thing you take from it (a proportion, a layer order, a timing). Open the matching board in `../../inspiration/boards/`. Read `references/craft-recipes.md`: it holds the measured ranges (hero scale, subject area, colour shares, depth, texture, motion) your page must meet. No ids in the brief, no build. If the catalogue is missing (the skill was copied alone), measure 2 or 3 strong references yourself with `scripts/intake.mjs` first.
5. Colour: `references/palette-combinations.md`. Sets of two to four with roles and shares, chosen for the mood.
6. **Type (required).** Pick one recipe id from `type/` (gallery: `type/index.html`, text: `type/recipes.md`) by the procedure in `type/README.md`: the brief's mood words, a shortlist of 2 or 3, a test at 1440 and 390. Write `Type: <recipe-id>, <reason tied to the mood>` in the brief and `<meta name="unslop-type" content="<recipe-id>">` in the page. Do not reuse the recipe or pairing of the previous project or of the repo examples (`scripts/lib/used-type.mjs`; rule `type-house-pairing`). A wide grotesk display over a plain sans body with a giant headline and a heavy/thin weight pair is this repo's own house default: it needs a written reason like any other default. No recipe id in the brief, no build.

## Loop

1. **Capture** the current state (if there is one): `node scripts/detect.mjs <file|url> --out .unslop/before`. Open both PNGs.
2. **Read both numbers.** Slop (100 is the worst) is the worse of "taste not proven" and the genre-default tells: `heavy` (35+) rebuild, `light` polish, `clean` (under 20) keep. The report lists the taste proof components (real subject at 25-60% of the first screen, display line 80 px+, deliberate overlap, one ground colour with accents under 3%, no coloured headline keyword): a page with zero slop patterns but no proof still scores 90. Craft: below 70 means the page is missing qualities; the `bland-*` signals say which.
3. **Build or rebuild** from the brief: first screen first, with real content, following recipe 1 of `references/craft-recipes.md` (decide the subject, then the display scale, then the layer order, then corner facts, then colour shares). Heavy slop: rebuild in the order type, colour, layout, states, components (`references/passes.md`). When the direction brief calls for texture or depth, pick one texture or effect from `effects/` (gallery: `effects/index.html`) instead of improvising one. When it calls for an interaction or a short sequence (a selection control, an icon state, a hover index, a brand opener, a product film), start from `recipes/`.
4. **Slop passes** (spacing, color, icons, copy, typography, layout, detail, imagery, motion), then **craft passes** (bolder, visual, layers, texture, animate, identity). Re-run the detector after each.
5. **Reference gate (required).** Put your first screen next to each picked reference board at 1440 (`node scripts/compare.mjs ../../inspiration/boards/<board>.html <yours> --out ref-gate-<id>.png --labels "Reference,Mine" --max-height 900`); if the user gave a live reference, compare against it too. Then fill a table, one row per picked id: the entry's measured number vs yours for display size, cap height share, subject area, overlap (yes/no), colour shares, depth layers, corner labels, motion. Every **Check** line in `references/craft-recipes.md` sections 1 to 4 is answered yes, or the brief says why not. Ask honestly: would a picky designer put yours on the same wall as the reference? Fix, re-run. At most three rounds.
6. **Independent review (mandatory).** Before anything is shown to the user, a different agent with fresh context reviews it with the fixed checklist in `references/independent-review.md`, using the detector report, screenshots at 1440 and 390, and zoomed crops (`node scripts/review-crops.mjs <page> --out <dir>/crops`). Fix every blocker, let the reviewer re-check; at most three rounds. Report the reviewer's verdict.
7. **Prove it.** `detect.mjs` after, `compare.mjs` before/after at desktop and `--viewport mobile`, the template test (`references/template-test.md`). Report slop and craft before and after, the PNG paths, and what is still open.

A page passes only with slop under 35, craft at 70 or more **and** taste proof at 60 or more. It stays **UNPROVEN** until step 7's side-by-side compare was run and attested with `detect.mjs --compared <compare.png>`. Never report a pass without that.

## Rules of the road

- The numbers measure tells and presence, not taste. Always look at the screenshots at 1440 and 390.
- Do not copy another site's look. From references take timing, proportion and ideas; never shapes, copy, imagery or palettes as-is (`references/motion-measurement.md`).
- No paid generation without the user's approval of the cost. Image priority in `references/passes.md`.
- Never invent proof: user counts, ratings, logos, testimonials. Example data is labelled once per page, not under every element.
- Hard no's (detector rules, each with a fix): AI-default fonts without a project reason (`references/ai-default-fonts.md`), the repo examples' own type pairing reused (`type-house-pairing`), giant display numbers, captions under every block, paper / letter / receipt props, stamps and tilted stickers, emoji (unless the user asked), coloured side stripes on boxes, faded grey text (readable text 7:1, 4.5:1 from 24 px), heading + grey subtitle as the section template, rainbow tiles, floating chat pills.
- Keep changes reversible: write next to the user's file or on a branch.
- Disabling a rule (`--disable id`) needs a reason in the report.

## Files

- `scripts/detect.mjs`: renders at 1440 and 390 (plus a reduced-motion pass), runs slop rules, bland rules and the craft probe; JSON and markdown; hides consent banners (`--keep-consent` to keep). `--fail-on`, `--min-craft`.
- `scripts/compare.mjs`: side-by-side PNG (`--wait` lets a one-shot demo finish).
- `scripts/motion-probe.mjs`: declared and measured timing of one element.
- `scripts/intake.mjs`: capture a reference URL into `inspiration/` (screenshot, palette, fonts, motion timings).
- `references/`: project read, palette combinations, passes and recipes, measured craft recipes (`craft-recipes.md`), rule catalogue (generated), DESIGN.md template, motion measurement, template test.
- `../../inspiration/catalog.md` and `../../inspiration/boards/`: measured references and composition boards for the reference gate.
- `domains/`, `styles/`: packs, loaded on demand.
- `recipes/`: interaction and motion recipes with measured timings, each a live single-file demo (stretch-and-settle selection, rolling status pill, mark with a hidden turn, morphing icons, index list reveal, letter window, prompt-led product reel, streaming tail).
- `type/`: typography recipes by mood (27, each with faces, ladder at 1440 and 390, OpenType settings, a signature treatment, a slop warning and a live specimen); `type/README.md` holds the selection procedure.
- `effects/`: texture, light and glass effects (grain, ribbed and frosted glass, dither, halftone, ASCII, mesh gradient, caustics and more), each a live single-file demo with parameters, cost and a slop warning.
