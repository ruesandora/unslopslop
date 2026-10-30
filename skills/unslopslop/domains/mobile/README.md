# Domain: Mobile app UI

Status: **early**. Content is thin; extend it as references arrive.

## What good looks like
- Native patterns first: tab bar or a single primary action within thumb reach (lower third), sheets for secondary flows, swipe where the platform expects it.
- Touch targets 44 pt (iOS) / 48 dp (Android) minimum; text 16 px body, 13 px minimum.
- One screen, one job; progressive disclosure (pill, card, sheet).
- Motion follows the gesture: interruptible, springy where the platform is, 200 to 350 ms.

## Workflow specifics
1. Brief plus a list of the 3 to 5 key screens and the flow between them.
2. Build screens at 390 x 844 (and 360 x 800 for Android); show them in a plain device frame only for presentation.
3. Detect each screen as mobile web: `detect.mjs` (the 390 pass matters most); check `layout-tap-target`.

## Medium-specific slop signs
Desktop layouts squeezed into a phone, hamburger plus floating action button plus tab bar together, glass everywhere, tiny grey labels, onboarding carousels of stock 3D blobs.

## Craft signals
A clear primary action in thumb reach, real content in every state (empty, loading, error), restrained depth, one signature gesture.

## Deliverables
Screens as HTML at 390 px (or the app's components), a flow strip PNG, reports. Native code is out of scope for the detector.

## Checks the detector runs
Web checks at 390 px. Native screens: screenshot review only (not automated yet).
