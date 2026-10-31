# Type library

Typography chosen from the project's mood, not from habit. Each folder is one recipe: `recipe.mjs` (the data), `specimen.html` (a live page in the recipe's own faces) and `screenshot.jpg` (first screen at 1440). Open [`index.html`](index.html) for the gallery; [`recipes.md`](recipes.md) has every recipe as plain text.

All faces are open licence (SIL OFL or Apache 2.0) and load from Google Fonts. No font files ship here; offline, each specimen falls back to system stacks. To self-host, download the family with its licence file and keep only the subsets the page needs.

## Why this folder exists

Our own pages kept repeating one move: a wide grotesk display, a plain sans body, a giant headline and the same heavy/thin weight contrast. Every recipe here gets its hierarchy from something specific to a mood: an italic swap, a width axis, small caps, position, tone, a mask, a sign layer. Several get it without any large type at all.

## Selection procedure (required)

1. **Mood words.** Take the three adjectives from the direction brief (`../references/project-read.md`) and the job the type must do (long reading, tables, a loud poster line, small labels on a phone, a child learning to read).
2. **Shortlist.** Find 2 or 3 recipes whose `mood` and `domains` match (gallery filters, or `grep -l "<word>" type/*/recipe.mjs`). At least one should come from a different move family than your first instinct.
3. **Test at real size.** Open the specimens at 1440 and 390 with the project's real headline in mind. Pick one.
4. **No reuse.** Do not pick the recipe (or the same display + text pairing) used by the previous project you worked on, or by the repo examples. The pairings already used are listed in `../scripts/lib/used-type.mjs`; the detector rule `type-house-pairing` flags a page that repeats one. After shipping, add your pairing there so the next project is steered away from it.
5. **Write it down.** In the brief's `Type:` line put the recipe id and one sentence tying it to the mood, e.g. `Type: finance-ledger, because the mood is calm and exact and the hero must be a sentence about money, not a figure`. Put `<meta name="unslop-type" content="<id>">` in the page.
6. **Adapt, do not copy.** Keep the faces, ladder and settings; change the signature move to fit the content. If no recipe fits, build a new one with the same fields (`recipe.mjs`), run `node type/build.mjs` and `node type/capture.mjs <id>`, and look at both widths.

## Move families covered

| Family | Recipes |
|---|---|
| Serif display | editorial-caslon-mixed, luxury-didone-airy, institution-smallcaps, finance-ledger, warmcraft-hand, calm-mincho |
| Condensed | editorial-newsroom, data-dense-sofia, kinetic-shoulders, sport-italic |
| Mono-led | technical-field-notes, technical-console |
| Script or hand-drawn accent | retro-diner, warmcraft-hand, heritage-gothic (blackletter) |
| Variable-font axis motion | playful-casual-axis, kinetic-shoulders, stretch-fit |
| Outline or inline | playful-signage-inline |
| Mixed-case editorial | editorial-caslon-mixed |
| Small-caps system | institution-smallcaps |
| Kinetic type | kinetic-shoulders, playful-casual-axis |
| Text as image or mask | mask-pattern |
| Tight setting | editorial-newsroom, technical-console, brutalist-raw, data-dense-sofia, zine-typewriter |
| Airy setting | luxury-didone-airy, luxury-whisper, health-calm, calm-mincho, children-reading |
| Type-only hero, no giant size | luxury-whisper, finance-ledger, health-calm, swiss-position, brutalist-raw, technical-field-notes |
| Width as hierarchy | technical-field-notes, data-dense-sofia, stretch-fit, product-width-pair, sport-italic |

## Note on the detector

The taste proof in `../scripts/lib/taste.mjs` rewards a display line of 80 px or more on landing pages. The no-giant-size recipes are meant for app screens, dashboards, email, reading pages and teasers, or for a landing page whose first screen has a strong real subject. On a text-only landing page they will be capped by that check; that is a known trade-off, not a bug in the recipe.

## Files

- `build.mjs`: writes every `specimen.html`, `index.html` and `recipes.md` from the recipes.
- `capture.mjs`: writes `screenshot.jpg` per recipe; `--review <dir>` adds 390 px shots, `--gallery` the gallery shots. Needs network for the fonts and fails when a recipe font does not load.
