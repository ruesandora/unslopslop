---
name: unslopslop
description: Detect and fix AI-generated-looking ("slop") UI. Use when a page, landing, dashboard or component looks generic, templated or "made by AI", when the user says "unslop", "make this look less AI", "this looks generic", or before shipping any generated front end. Renders the page, scores it with a repeatable detector, then fixes it in a fixed pass order and proves the improvement.
---

# unslopslop

Slop is not "made with AI". It is what remains when no decision was taken: default fonts, default palette, default card grid, filler copy. This skill finds those leftovers with a script, then replaces each with a decision.

Scripts live next to this file (`scripts/`). They need Node 20+ and Playwright with Chromium already installed (nothing is bundled). Paths below are relative to this skill folder.

## Loop

1. **Capture.** Before touching anything, save the current state:
   `node scripts/detect.mjs <file|url> --out .unslop/before`
   (writes report.json, report.md, desktop.png, mobile.png). Look at both PNGs yourself. Audit a production build, not a dev server (rule `env-dev-server` warns).
2. **Read the verdict.** `heavy` (score 35+): rebuild. `light` (10 to 34, or any critical finding): polish. `clean` (under 10): leave it alone and go to step 6.
3. **Direction.** Write the five-line direction contract (what it is, who it is for, tone, the one signature move, what it must never look like), then a `DESIGN.md` (template: `references/design-md-template.md`). Heavy pages only; light pages inherit the existing system.
4. **Fix.**
   - Light: run the nine passes in order, one pass at a time: spacing, color, icons, copy, typography, layout, detail, imagery, motion (`references/passes.md`). Fix only what the report lists.
   - Heavy: rebuild in this order: type, color, layout, states, components (recipe in `references/passes.md`), then run the passes as an audit.
   After each pass re-run the detector and note the score. Stop a pass when its points reach zero.
5. **Rounds.** Check three widths (1440, 768, 390). Fix the worst three issues, re-run, repeat. At most three rounds; if findings remain, report them as open, do not hide them.
6. **Prove it.**
   - `node scripts/detect.mjs <page> --out .unslop/after`
   - `node scripts/compare.mjs <before> <after> --out .unslop/compare.png` (and `--viewport mobile`). Open the PNG.
   - Template test (`references/template-test.md`): swap the brand name; if the page still fits, it is generic, add a signature move.
   - Report: score before and after, verdict, the PNG paths, findings left open and why.

## Rules of the road

- The detector measures tells, not taste. A clean score is necessary, never sufficient: always look at the screenshots.
- Do not copy another site's look. When the user gives a reference, measure its timing with `scripts/motion-probe.mjs` (`references/motion-measurement.md`); take durations, easing and rhythm, never shapes, colours, text or imagery.
- No paid image generation. Image priority: the project's own assets, then generated locally in code, then open-licensed (CC0, CC BY, CC BY-SA, with credit), code-drawn illustration last.
- Never invent proof: user counts, ratings, logos, testimonials. Cite a source or delete the claim.
- Keep every change reversible: do not delete the user's file, write the fixed version next to it or on a branch.
- Disabling a rule (`--disable id`) needs a stated reason in the report.

## Files

- `scripts/detect.mjs`: render at 1440 and 390 (plus a reduced-motion pass), run all rules, scored JSON and markdown. `--fail-on light|heavy` for CI.
- `scripts/compare.mjs`: before/after side-by-side PNG.
- `scripts/motion-probe.mjs`: declared durations and easings, plus frame-sampled measurement of one element.
- `references/rules.md`: the rule catalogue with severities (generated from code).
- `references/passes.md`: the nine passes, rebuild recipe, image priority, rounds.
- `references/design-md-template.md`: DESIGN.md template with a Motion section.
- `references/motion-measurement.md`: measuring motion, and writing animation as a pure function of time.
- `references/template-test.md`: the swap test.
