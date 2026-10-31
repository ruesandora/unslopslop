#!/usr/bin/env bash
# Rebuilds every report and screenshot in examples/ (needs Playwright, see README).
# The after pages are attested with --compared: their reference gates are rebuilt first.
set -euo pipefail
cd "$(dirname "$0")/.."
D=skills/unslopslop/scripts
declare -A BOARDS=( [saas-landing]="subject-over-type pattern-hero product-panel-hero" [dashboard]="product-panel-hero pattern-hero" )
declare -A GATE=( [saas-landing]=subject-over-type [dashboard]=product-panel-hero )
for ex in saas-landing dashboard; do
  # reference gate: each picked board beside the first screen at 1440 (--wait lets the one-shot demo finish)
  for b in ${BOARDS[$ex]}; do
    node $D/compare.mjs inspiration/boards/$b.html examples/$ex/after.html --wait 8500 --out examples/$ex/ref-gate-$b.png --labels "Reference board,Mine" --max-height 900 > /dev/null
  done
  for v in before after-v1 after; do
    extra=()
    [ "$v" = after ] && extra=(--compared examples/$ex/ref-gate-${GATE[$ex]}.png)
    node $D/detect.mjs examples/$ex/$v.html --out examples/$ex/$v-report "${extra[@]}" > /dev/null
    mv examples/$ex/$v-report/desktop.png examples/$ex/$v-desktop.png
    mv examples/$ex/$v-report/mobile.png examples/$ex/$v-mobile.png
  done
  node $D/compare.mjs examples/$ex/before.html examples/$ex/after.html --wait 8500 --out examples/$ex/compare-desktop.png > /dev/null
  node $D/compare.mjs examples/$ex/before.html examples/$ex/after.html --wait 8500 --viewport mobile --out examples/$ex/compare-mobile.png > /dev/null
  node $D/compare.mjs examples/$ex/after-v1.html examples/$ex/after.html --wait 8500 --labels "Stripped (v1),After" --out examples/$ex/compare-v1-desktop.png > /dev/null
done
echo done
