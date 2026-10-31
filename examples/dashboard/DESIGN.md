# Fluxly dashboard (example direction, v4)

## Project read
The working screen of the same product. One question: what is open, and which letters go out next. Used daily in short sessions on a laptop. All data is example data, said once in the sidebar.

## Direction brief
- Adjectives: exact, calm, legible.
- Combination (first screen, measured): bone `#eeebe3` ground 61%; ink type and rules; cobalt `#2636c8` only for letters (the product's output); yellow `#f3d33b` 1.1%, only for today and the one primary action ("Review 6 letters").
- Type: Schibsted Grotesk for the title and the lead sentence; Atkinson Hyperlegible Next for everything read, ids and amounts included, tabular figures. The lead is a sentence with the figures inside it, never a giant number.
- Texture: the chase map is drawn as an ordered dither (`skills/unslopslop/effects/ordered-dither`, 4 x 4 matrix, 2 levels, 3 px cells): sent letters dithered, tomorrow's letters solid, later ones a sparse ghost. No second texture.
- Depth: ground, the sidebar in a second tone, the chase map, the today line crossing every lane, and the work queue as the one raised surface (floor shadow with negative spread).
- Motion: the map draws in left to right once (1.6 s, ease-out, `render(t)`); drawer 300 ms in-out on phones; hover 150 ms. Reduced motion: final state.
- Signature move: the chase map, one lane per invoice, block height = tone (friendly, firm, final), the six letters going out tomorrow standing solid against the yellow today line.
- Rejected defaults: greeting title, four KPI cards, rainbow chart (`before.html`); the bare document (`after-v1.html`); the earlier dark version with a giant outstanding figure (now a hard no).
- References: **C13** (gold): the tool is the first screen, one strong colour only for the live thing (their playhead, our today line). **C18** (gold): colour is state, never decoration (cobalt = letter, yellow = today). **C12** (gold): a code-drawn 1-bit pattern carries the image.

## Reference gate (1440 x 900, `ref-gate-*.png`)

| Measure | C11/C13 panel board | C12 pattern board | Mine |
|---|---|---|---|
| Display size | 95 px (tool UI on C13: 11 to 14 px) | 56 px | 40 px title, 24 px lead sentence (app screen, out of scope for the 84 px line) |
| Subject area | 55% panel | 45% pattern | 41% chase map (canvas) |
| Overlap | none | none | yes: lane names, amounts, axis and the today label sit on the drawing |
| Colour shares | 83 / 9 / 2 | 74 / 21 / 0.4 | 61 bone / about 8 cobalt / 1.1 yellow |
| Depth layers | ground, panel, graph | ground, panel, pattern | ground, sidebar tone, map, today line, raised queue |
| Corner labels | none | none | none (app chrome instead) |
| Motion | one demo | 6 s demo loop | one 1.6 s draw-in |

Check lines: one real subject yes (the product's output at 41%); tied to the lead by position and the today label crossing it yes; two saturated colours, both accents under 3% and both state yes; no coloured headline word yes; ground 55%+ yes; three depth layers yes; no hard card shadows (the queue uses `0 14px 30px -18px` at 35%, negative spread) yes; 390 px: the map keeps every lane with its name and amount on top.

## Layout
Sidebar 232 px (counts, saved views, example-data note); header with title, search, period switch and the primary action; the lead sentence; the chase map with a key; tomorrow's queue (raised) beside this week's matches; the invoice table. Phones: the sidebar becomes a drawer, the table keeps invoice, client and amount.

## Data
Today is Thursday 29 October 2026 in the example. Schedule: friendly 3 days after the due date, firm 7, final 14, weekends moved to Monday. Totals agree: 9 open invoices, €14,300, of which €6,610 late; six letters tomorrow.
