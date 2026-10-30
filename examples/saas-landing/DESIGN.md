# Fluxly landing (example direction)

## Project read
Fluxly chases late invoices for freelancers and small studios. Readers are tired of chasing money and slightly embarrassed by it. Mood: calm, exact, a little literary. Device: desktop first, phone second.

## Direction: night ledger
The product's own interface on an ink stage: the invoice with its reminder timeline and activity log, an email preview floating over the window's edge, the letters editor, the bank feed.
Signature move: the hero demo of one real schedule (friendly on day 3, firm on day 7, the client replies on day 8, paid on day 9, day 14 cancelled), written as `render(t)`, played once; and the same letter shown in two voices side by side.
Rejected defaults: purple gradient hero with three feature cards; the beige serif document (`after-v1.html`); and the second version's props (display serif, cream paper letters, rubber stamp, captions under every block), which the hard rules now catch.

## Colour combination
- ledger ink `#0c0f17`, ground, about 70%
- bone `#ece6da` text (secondary `#c9c4b8`, 9:1 or more), about 22%
- line `rgba(236,230,218,.1)`, rules and borders
- periwinkle `#9cacff` fills with ink text (8.9:1) for the primary action, the paid state and the matched tag; deep cobalt `#3a55f0` only in drawn graphics and the light behind the product

## Typography
- Headlines and labels: Schibsted Grotesk (SIL OFL), 700, tight tracking; the h1's second line in 500 ("politely" said quietly)
- Reading text and every number: Atkinson Hyperlegible Next (SIL OFL), chosen because ids and amounts must never be misread (slashed zero, distinct 1/l/I)
- Numbers that change: `tabular-nums`

## Texture and depth
- Fine grain over the whole ground (SVG noise, 7% alpha), one diagonal light across the hero, one cobalt light core behind the product (nowhere else)
- Two layers in the hero: the app window and the email preview overlapping its lower edge; soft layered shadows; nothing rotated

## Layout
Max 1312 px, 32 px gutters. Hero: two-line headline, then a wide product stage. Then the letters editor (day tabs, warm and firm side by side), the bank-feed band, questions, the closing line. One example-data note, in the footer.

## Motion
- Hero demo 7.8 s once, ease-out cubic segments with holds at each letter; log rows and the mail swap enter with a 10 px slide and a 3 px blur
- Letters editor: the pair swaps in 220 ms (slide and short blur)
- Hover: colour only, 140 to 180 ms. Reduced motion: final frame at once, no transitions
