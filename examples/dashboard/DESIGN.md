# Fluxly dashboard (example direction)

## Project read
The working screen of the same product. One question: how much money is outstanding, and what happens next. Used daily in short sessions, often on a laptop in the evening.

## Direction
Same night-ledger combination as the landing page, tuned for long sessions: dense 13 to 15 px UI, all readable text at 7:1 or more.
Signature move: the tone ladder (friendly, firm, final) as the screen's visual language: in the preview of tomorrow's first letter and as three dots in every row's next step. The primary action is "Review 6 letters".
Rejected default: greeting title, four KPI cards, rainbow chart; also the bare document version (`after-v1.html`).

## Colour combination
ink `#0b0e15` ground; surfaces `#11151f` to `#171c29`; bone `#ece6da` text; cobalt ramp `#8a9dff` / `#5f78f5` / `#3a55f0` for ageing and the cash series; bone for the running total line.

## Typography
Schibsted Grotesk for titles; Atkinson Hyperlegible Next for everything read, ids and amounts included; tabular figures in tables. The lead is a sentence ("€18,460 outstanding across 11 invoices, €2,840 less than on 1 October"), not a giant number.

## Layout
Sidebar 248 px with counts and saved views; header row with search, period switch and the one primary action; grid of lead card + forecast chart (left) and reminder queue + matched payments (right); full-width invoice table. Phones: sidebar folds into a menu button, table keeps invoice, client and amount.

## Data
All data is example data and says so once (sidebar, or under the table on phones). Totals agree: the ageing buckets and the table both sum to €18,460; the forecast is derived from the table rows.

## Motion
Forecast bars rise and the running total draws in as a staircase once (1.1 s, written as `render(t)`); ageing bar fills left to right. Phones: a drawer with a scrim, Escape and focus handling. Hover tooltip on the chart. Reduced motion: final state.
