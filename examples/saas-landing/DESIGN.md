# Fluxly landing (example direction, v4)

## Project read
Fluxly chases late invoices for freelancers and small studios. Readers are tired of chasing money and a little embarrassed by it. Mood: calm, exact, a bit dry. Device: desktop first, phone second. Content is fictional and labelled once, in the footer.

## Direction brief
- Adjectives: exact, graphic, unhurried.
- Combination (first screen, measured with `detect.mjs`): bone `#eeebe3` ground about 52%; cobalt `#2636c8` field about 31% (the subject); ink `#12141f` type; signal yellow `#f3d33b` under 3%, only on the one action and the paid moment.
- Type: Schibsted Grotesk (SIL OFL) for display, weight contrast inside one headline (820 heavy, 380 thin); Atkinson Hyperlegible Next (SIL OFL) for reading text and figures, chosen because invoice numbers and amounts must never be misread. Neither face is on the AI-default list.
- Texture: the subject is an ordered dither (`skills/unslopslop/effects/ordered-dither`, 4 x 4 matrix, 2 levels, 4 px cells), so the texture belongs to the subject. The dark letters band carries `effects/grain-overlay` at 8% (its own screen).
- Motion: one demo as `render(t)`, 6.8 s, once: the playhead walks from the due date to day 9; the friendly (day 3) and firm (day 7) columns rise as it passes; the payment lands as a yellow line and the scheduled final notice (day 14) thins to a ghost and is struck through. Reduced motion shows the last frame. Tab swap 200 ms, hover 160 ms.
- Density: poster first screen, then balanced sections.
- Signature move: the headline runs into the cobalt field and changes colour where it crosses it (ink on bone, bone on cobalt); the field is the schedule of one invoice, three dithered columns rising from the bottom edge and cut by the right edge.
- Rejected defaults: purple gradient hero with three feature cards (`before.html`); the beige serif document (`after-v1.html`); the earlier dark product-window hero with no subject (scored 90 slop on the recalibrated detector).
- References: **C04** (gold): the subject and the display line interlock, two fields split about 55/30, small facts in the corners. **C12** (gold): a code-drawn 1-bit pattern is the image, accent under 1% on one action. **C11** (gold): weight contrast inside one headline (heavy, then thin) instead of a coloured keyword.

## Reference gate (1440 x 900, `ref-gate-*.png`)

| Measure | C04 board | C12 board | C11 board | Mine |
|---|---|---|---|---|
| Display size | about 440 px | 56 px | 95 px | 167 px (54 px at 390) |
| Cap height share | 38% | 4.4% | 7.4% | 13% |
| Subject area | 13% behind the word | 45% pattern | 55% panel | 31% (canvas, dithered schedule) |
| Overlap | type in front of subject | none | none | yes: the headline crosses into the field and recolours |
| Colour shares | 63 / 24 | 74 / 21 / 0.4 | 83 / 9 / 2 | 52 bone / 31 cobalt / under 3 yellow |
| Depth layers | ground, subject, word | ground, panel, pattern | ground, panel, graph | ground, cobalt field, dithered columns, crossing headline, labels |
| Corner labels | 4 | none | none | 4 (brand, nav, invoice fact, sending hours) |
| Motion | scroll story | 6 s demo loop | one demo | one 6.8 s demo, then still |

Check lines (craft-recipes 1 to 4): display 84 px+ yes; one real subject yes; tied by overlap yes; at most two saturated colours, field 31% and accent under 3% yes; no coloured headline word yes; 390 px display 54 px with the subject on the first screen yes; display 8.4x body yes; body 20/30 yes; ground 55%+ **no, 52%**: the brief asks for a two-field poster like C04 (63/24), and pushing bone higher shrinks the field below the point where the headline can cross it; three depth layers yes; one light direction (columns lit from the top) yes; no hard card shadows yes.

## Layout
Hero 100vh: headline top left, lede and actions bottom left, the cobalt field on the right 31%. Then the letters editor on ink (tabs, warm and firm side by side, sending rules), the bank feed with the matched row in cobalt, questions, and a cobalt closing poster.
