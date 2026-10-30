# Inspiration library

References are how the skill grows. Each batch adds tagged observations that the core skill looks up when it starts a new project (`skills/unslopslop/SKILL.md`, step 4).

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
| `motion:` | none, one-demo, scroll-story, micro-only, ambient-slow |
| `type:` | serif-display, grotesk, mono-ids, bitmap |

## Rules

- Observations only: write what you measured and what the technique is. Never copy text, code, images or palettes into a design.
- Thumbnails are small and for study. If the licence is unclear or the owner of the page would object, use `--no-shot` and keep the link only.
- One reference, one folder. Edit `notes.md` by hand after the capture: why it is good, what to learn, what not to take.
- Paid or login-only material is not captured.

## Batches

A batch is a set of references added on the same day. Run intake for each, then write two lines at the top of `catalog.md` under the date: the common pattern and the one technique worth trying next.
