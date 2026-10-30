# unslopslop

A Claude Code skill that finds and fixes AI-generated-looking ("slop") interfaces, with a scripted detector you can run again and again and a score you can compare.

It does three things:

1. **Detects.** Renders a page at 1440 px and 390 px (plus a reduced-motion pass) with Playwright and runs 72 rules: purple gradients, icon tiles, eyebrow labels, identical card rows, cliche copy, fake social proof, low contrast, missing focus rings, content hidden under reduced motion, and more. Output: a 0 to 100 slop score and a verdict, `clean`, `light` or `heavy`, as JSON and markdown.
2. **Fixes** in a fixed order: spacing, color, icons, copy, typography, layout, detail, imagery, motion. Heavy pages are rebuilt from a short `DESIGN.md` (template included, with a Motion section).
3. **Proves it.** Before/after side-by-side PNGs, a re-run of the detector, and a "template test" (swap the brand name; if the page still fits, it is generic).

## Install (Claude Code)

Requirements: Node 20+, and Playwright with Chromium installed on your machine (`npm i -g playwright && npx playwright install chromium`). unslopslop adds no dependencies.

```bash
git clone https://github.com/ruesandora/unslopslop
mkdir -p .claude/skills
cp -r unslopslop/skills/unslopslop .claude/skills/
```

Then ask Claude Code: "unslop `index.html`" or "this landing page looks generic, fix it".

## Use the scripts directly

```bash
# score a page (file or URL); writes report.json, report.md, desktop.png, mobile.png
node skills/unslopslop/scripts/detect.mjs examples/saas-landing/before.html --out out/before

# fail a CI job when the page is heavy
node skills/unslopslop/scripts/detect.mjs https://example.com --fail-on heavy

# before/after image
node skills/unslopslop/scripts/compare.mjs before.html after.html --out compare.png

# measure timing of an animation
node skills/unslopslop/scripts/motion-probe.mjs page.html --trigger click:#go --sample "#panel"
```

## Example

Two self-made slop pages, each rewritten with the loop in `skills/unslopslop/SKILL.md`. The rewritten pages are for a made-up invoice-chasing tool; all names and numbers are samples.

| Page | Before | After |
|---|---|---|
| SaaS landing | 100/100, heavy (247 raw points) | 0/100, clean |
| Dashboard | 100/100, heavy (156.5 raw points) | 0/100, clean |

Files per example in `examples/<name>/`: `before.html`, `after.html`, `DESIGN.md`, `before-report/`, `after-report/` (JSON and markdown), screenshots at both widths, and `compare-desktop.png` / `compare-mobile.png`. Rebuild them with `examples/regenerate.sh`.

![SaaS landing, before and after](examples/saas-landing/compare-desktop.png)

`examples/motion-pure/` shows animation written as a pure function of time (`render(t)`), with tests.

## How the score works

Each rule has a severity: critical 12, major 6, minor 2 points. Extra occurrences add 25% each, capped at twice the weight. Score is the sum, capped at 100. Verdict: `heavy` at 35 or more, `clean` below 10 with no critical finding, otherwise `light`. Full catalogue with fixes: `skills/unslopslop/references/rules.md`.

## Tests

```bash
npm test
```

Every rule has a bad and a good fixture (`tests/fixtures.mjs`). `tests/mutation.test.mjs` disables each rule in turn and checks that exactly that rule's test fails, so a passing suite means the fixtures really exercise the rules. Bugs found while building the examples have regression tests.

## Limits

- The detector measures known tells; it does not judge taste. Always open the screenshots.
- Rules are heuristics and can misfire on unusual markup. Disable one with `--disable rule-id` and say why in your report.
- It reads rendered pages; it does not inspect your source framework. Audit a production build, not a dev server.
- Fonts that fail to load fall back silently; the typography rules read the declared family.

## Related

- [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) (MIT): a family of design-taste skills.
- Emil Kowalski's work: Sonner, Vaul, and [animations.dev](https://animations.dev).
- [Fontshare](https://www.fontshare.com) and [Vartype](https://vartype.com): free font sources to check licences on before use.
- [heydamir/unslop](https://github.com/heydamir/unslop) (CC BY 4.0): the checklist-style skill that inspired the nine fix passes and several rules here.

## License and credits

MIT, see `LICENSE` (Copyright (c) 2026 Rueseo). The license choice may change before 1.0 only if the owner says so. Sources, licences and what was taken from each are in `NOTICE` and `docs/SOURCES.md`.
