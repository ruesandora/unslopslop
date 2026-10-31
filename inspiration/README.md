# Inspiration library

References are how the skill grows. Each batch adds tagged, measured observations that the core skill must pick from before it builds (`skills/unslopslop/SKILL.md`, step 4) and compares against after (step 5 of the loop). `catalog.md` holds the entries; `boards/` holds 1440 x 900 composition diagrams re-drawn from the measurements; the repeated patterns become checkable ranges in `skills/unslopslop/references/craft-recipes.md`.

## Entry format

One `### <id> · <short description>` block per reference: tags (with `role:gold`, `role:useful` or `role:counter`), **Measured** (type sizes and weights in px, line height, tracking, colour shares with hex, radii, shadows, grid, motion durations and easing), **Signature**, **Steal as a principle** (our own words), **Do not take**. No source name, link, handle, screenshot or copied text; the private log of sources is kept outside this repo.

## Add a reference

```bash
node skills/unslopslop/scripts/intake.mjs https://example.com \
  --tags "domain:web, style:editorial-serif, mood:calm, palette:ink+bone+cobalt, motion:one-demo" \
  --why "The product view is the hero and it moves once." \
  --learn "Demo plays once in about 7 s, state swaps at 200 ms, ease-out."
```

It writes `inspiration/<date>-<slug>/notes.md` (fonts, palette by area, declared motion, your notes), a 480 px study thumbnail, and a row in `catalog.md`. Add `--no-shot` to keep only the link and measurements.

## Tags (use these keys)

| Key | Examples |
|---|---|
| `domain:` | web, dashboard, mobile, email, logo-brand, motion, social |
| `style:` | any folder in `skills/unslopslop/styles/` |
| `mood:` | calm, exact, playful, loud, warm, technical, luxurious |
| `palette:` | the combination in words, e.g. `ink+bone+cobalt` |
| `motion:` | none, one-demo, scroll-story, micro-only, ambient-slow, brand-film, product-film |
| `type:` | serif-display, grotesk, mono-ids, bitmap |

## Rules

- Observations only: write what you measured and what the technique is. Never copy text, code, images or palettes into a design.
- Thumbnails are small and for study. If the licence is unclear or the owner of the page would object, use `--no-shot` and keep the link only.
- One reference, one folder. Edit `notes.md` by hand after the capture: why it is good, what to learn, what not to take.
- Paid or login-only material is not captured.

## Batches

A batch is a set of references added on the same day. Run intake for each, then write two lines at the top of `catalog.md` under the date: the common pattern and the one technique worth trying next.
