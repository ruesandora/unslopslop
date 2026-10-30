# Fluxly landing (example direction)

## Project read
Fluxly chases late invoices for freelancers and small studios. Readers are tired of chasing money and slightly embarrassed by it. Mood: calm, exact, a little literary. Device: desktop first, phone second.

## Direction: night ledger
An ink stage with paper documents on it: the invoice, the letters, the bank feed. The product is shown working in the first screen.
Signature move: the hero is a demo of one real reminder schedule (day 3 nudge, day 7 firm letter, paid on day 9, day 14 cancelled), written as `render(t)`, played once.
Rejected default: purple gradient hero with three feature cards; also the opposite, a beige serif document with no visual (the earlier version, `after-v1.html`).

## Colour combination
- ledger ink `#0c0f17`, ground, about 70%
- bone `#ece6da` text and paper `#f3ede2` documents, about 22%
- line `rgba(236,230,218,.1)`, rules and borders
- cobalt `#3a55f0` (text tint `#8a9dff`), 3%: primary action and the paid state only

## Typography
- Display: Gloock (SIL OFL), 400, 52 to 112 px, tracking -0.025em, second line of the h1 in bone grey
- Text and UI: Geist (SIL OFL), 15 to 19 px; ids in Geist Mono inside `<code>` only
- Numbers that change: `tabular-nums`

## Texture and depth
- Fine grain over the whole ground (SVG noise, 7% alpha), one diagonal light falling across the hero, a cobalt light core behind the product stage
- Ledger lines (1 px every 48 px) in the bank-feed band only; outlined "14" watermark behind the letters
- Three layers in the hero: schedule panel, invoice sheet (rotated -1.5 deg), email card; soft layered shadows

## Layout
Max 1312 px, 32 px gutters. Hero: two-line display headline, then a wide product stage. Sections alternate rhythm: fanned letters (5/7 split), full-bleed ledger band, interactive tone control, two-column questions, closing line with a stamp.

## Motion
- Hero demo 7.6 s once, ease-out cubic segments with holds at each letter; mail swaps with a 10 px slide and 3 px blur; the stamp lands with a 1.25 to 1 scale
- Tone control: preview swaps in 220 ms (slide and short blur)
- Hover: colour only, 140 to 180 ms. Reduced motion: final frame at once, no transitions
