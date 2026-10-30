# Fluxly dashboard (example direction)

## Project read
The working screen of the same product. One question: how much money is outstanding, and what happens next. Used daily in short sessions, often on a laptop in the evening.

## Direction
Same night-ledger combination as the landing page, tuned for long sessions: lower contrast surfaces, dense 13 to 15 px UI, one display word (the page title and the lead number in Gloock).
Signature move: the lead number sits on an ageing bar drawn as one cobalt ramp (not yet due to over 30 days), with the next actions (reminder queue) beside it.
Rejected default: greeting title, four KPI cards, rainbow chart; also the bare document version (`after-v1.html`).

## Colour combination
ink `#0b0e15` ground; surfaces `#11151f` to `#171c29`; bone `#ece6da` text; cobalt ramp `#8a9dff` / `#5f78f5` / `#3a55f0` for ageing and the cash series; bone for the running total line.

## Typography
Gloock for the title and the lead number; Geist 13 to 15 px for UI; Geist Mono for invoice ids in `<code>`; tabular figures everywhere.

## Layout
Sidebar 248 px with counts and saved views; header row with search, period switch and the one primary action; grid of lead card + forecast chart (left) and reminder queue + matched payments (right); full-width invoice table. Phones: sidebar folds into a menu button, table keeps invoice, client and amount.

## Data
All data is example data and says so (sidebar note, card header, table footer). Totals agree across widgets.

## Motion
Forecast bars rise and the running-total line draws in once (1.1 s, written as `render(t)`); ageing bar fills left to right. Hover tooltip on the chart. Reduced motion: final state.
