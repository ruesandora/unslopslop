#!/usr/bin/env bash
# Rebuilds every report and screenshot in examples/ (needs Playwright, see README).
set -euo pipefail
cd "$(dirname "$0")/.."
D=skills/unslopslop/scripts
for ex in saas-landing dashboard; do
  for v in before after; do
    node $D/detect.mjs examples/$ex/$v.html --out examples/$ex/$v-report > /dev/null
    mv examples/$ex/$v-report/desktop.png examples/$ex/$v-desktop.png
    mv examples/$ex/$v-report/mobile.png examples/$ex/$v-mobile.png
  done
  node $D/compare.mjs examples/$ex/before.html examples/$ex/after.html --out examples/$ex/compare-desktop.png > /dev/null
  node $D/compare.mjs examples/$ex/before.html examples/$ex/after.html --viewport mobile --out examples/$ex/compare-mobile.png > /dev/null
done
echo done
