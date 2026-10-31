# unslopslop: instructions for coding agents

This repo is a design skill plus a detector. It helps an agent design things that look like a strong human studio made them, and proves it with two numbers: **slop** (default moves, lower is better) and **craft** (hierarchy, focal point, real visual, purposeful motion, identity, density; higher is better). Slop and bland are both failures. Read `PHILOSOPHY.md` once; it is short.

## Mindset in six lines
1. Context first: read the project before choosing anything. No house style, a sauce for each dish.
2. Colour in combinations of two to four, with roles and proportions, chosen for this project's mood. No colour is right or wrong alone.
3. Craft is layers, tones, texture, pattern or watermark, depth, a real visual, purposeful motion. Removing effects is not the goal.
4. One signature move per screen; everything else quiet.
5. Never invent proof. Example data says it is an example, once per page.
6. Hard no's: AI-default fonts without a reason, giant numbers, captions everywhere, paper props, stamps, emoji, side stripes, faded grey text, heading + grey subtitle sections (see `skills/unslopslop/references/ai-default-fonts.md` and the rule catalogue).

## When someone asks for a design (any medium)
1. **Read the project** (`skills/unslopslop/references/project-read.md`): ask or infer audience, job, mood, device. Write the direction brief: 3 adjectives, combination with roles, a type recipe id from `skills/unslopslop/type/` with a reason tied to the mood (never the previous project's), texture, motion character, density, signature move, rejected default.
2. **Route:** pick the domain pack (`skills/unslopslop/domains/<domain>/`) and, if a style was named or fits, the style pack (`skills/unslopslop/styles/<style>/`). Pick 2 or 3 references in `inspiration/catalog.md` by tags (domain, style, mood, palette, motion), at least one `role:gold`, and write their ids in the brief (required). Read the measured ranges in `skills/unslopslop/references/craft-recipes.md`.
3. **Build** the first screen first, with real content.
4. **Detect:** `node skills/unslopslop/scripts/detect.mjs <file|url> --out <dir>` (web, dashboard, mobile web, email HTML). Read both numbers and open both PNGs.
5. **Reference gate:** place the first screen next to each picked board in `inspiration/boards/` at the same size (`scripts/compare.mjs`) and fill the measured-vs-reference table (display size, subject area, overlap, colour shares, depth, corner labels, motion). Answer the Check lines in `craft-recipes.md`. Fix, re-run. At most three rounds.
6. **Independent review:** before showing anything, a different agent with fresh context reviews the page with `skills/unslopslop/references/independent-review.md` (checklist, detector report, screenshots at 1440 and 390, crops from `scripts/review-crops.mjs`). Fix the blockers, let it re-check, at most three rounds.
7. **Report** slop and craft before and after, the reviewer's verdict, the screenshot paths, and what is still open.

## Map
| Path | What |
|---|---|
| `skills/unslopslop/SKILL.md` | The core loop (copy this folder into `.claude/skills/` of any project) |
| `skills/unslopslop/references/` | Project read, palette combinations, fix passes and recipes, measured craft recipes, rule catalogue, DESIGN.md template, motion measurement |
| `skills/unslopslop/domains/` | Medium packs: web, dashboard, mobile, email, logo-brand, motion, social |
| `skills/unslopslop/styles/` | Style packs (retro-pixel and ascii-text-art are full; the rest are early stubs) |
| `skills/unslopslop/type/` | Typography recipes by mood, live specimens, gallery and the selection procedure |
| `skills/unslopslop/scripts/` | `detect.mjs`, `compare.mjs`, `motion-probe.mjs`, `intake.mjs`, `review-crops.mjs` |
| `inspiration/` | Measured, source-free catalogue (`catalog.md`), composition boards (`boards/`), intake how-to |
| `examples/` | Before/after pairs with reports and screenshots |
| `tests/` | `npm test`; every rule has a bad and good fixture and a mutation proof |

## House rules for changing this repo
- Every new rule gets a bad and a good fixture; `tests/mutation.test.mjs` must show that disabling it breaks exactly its test.
- `references/rules.md` is generated: `npm run catalogue`.
- Write in plain English. No copied text, code or assets from other projects; ideas are re-expressed in our own words and code.
- Do not name third-party sources in the repo.
