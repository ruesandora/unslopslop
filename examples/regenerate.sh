#!/usr/bin/env bash
# Rebuilds every report and screenshot in examples/ (needs Playwright, see README).
set -euo pipefail
cd "$(dirname "$0")/.."
D=skills/unslopslop/scripts
for ex in saas-landing dashboard; do
  for v in before after-v1 after; do
    node $D/detect.mjs examples/$ex/$v.html --out examples/$ex/$v-report > /dev/null
    mv examples/$ex/$v-report/desktop.png examples/$ex/$v-desktop.png
    mv examples/$ex/$v-report/mobile.png examples/$ex/$v-mobile.png
  done
  # --wait lets the one-shot hero demo reach its final frame
  node $D/compare.mjs examples/$ex/before.html examples/$ex/after.html --wait 8500 --out examples/$ex/compare-desktop.png > /dev/null
  node $D/compare.mjs examples/$ex/before.html examples/$ex/after.html --wait 8500 --viewport mobile --out examples/$ex/compare-mobile.png > /dev/null
  node $D/compare.mjs examples/$ex/after-v1.html examples/$ex/after.html --wait 8500 --labels "Stripped (v1),After" --out examples/$ex/compare-v1-desktop.png > /dev/null
done
echo done
