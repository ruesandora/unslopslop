# Palette by combination

Colours are chosen as sets, in context, with jobs. A single swatch says nothing; a set with proportions says everything. This is our own method; no published palette data is shipped here.

## Method

1. **Start from the mood words** of the direction brief, not from a favourite colour.
2. **Pick a set of two to four colours.** Name each by what it looks like in this project ("ledger ink", "receipt paper", "stamp red"), not by hex.
3. **Give each a role and a share of the screen:**
   - ground (50 to 80%), the room the content lives in
   - ink (text and lines, 10 to 30%)
   - second tone (surfaces, paper, panels, 5 to 20%)
   - accent (1 to 5%): one job only, such as primary action, selection, live state or the key data series
4. **Check it in place.** Paint a real first screen with the set, look at it at 1440 and 390, squint. Adjust proportions before changing colours.
5. **Test contrast** of every text pair (4.5:1 body, 3:1 large text and UI). Tints of the accent are allowed for text on dark grounds.
6. **Write the set into DESIGN.md** with roles and shares.

## Rules of thumb

- Unexpected colours are allowed when the context fits: mustard with plum for a jazz label, dusty pink with forest green for a florist, even purple with olive for a night market. What counts is the neighbour and the share.
- A purple-to-blue gradient chosen because nothing was decided is slop; a violet chosen because it sits right next to a warm grey and the product sells lavender is not.
- One accent per screen. Status colours (paid, failed) are part of the accent's job or a quiet neutral scale, not a rainbow.
- Darks are not black and lights are not white: tint them toward the set (ink blue, warm paper).
- Texture changes colour: grain lifts flat darks, paper fibre warms a cream. Judge colours with the texture on.

## Context table: product type to example directions

These are starting points to argue with, not presets.

| Product | Direction A | Direction B | Avoid |
|---|---|---|---|
| Meditation or sleep app | Dusk: deep teal ground, sand text, apricot accent for the play button | Paper night: charcoal, oat, one moon-yellow | neon, high-contrast red |
| Fintech dashboard | Night ledger: ink, bone, cobalt for action and positive state | Bank paper: warm white, graphite, bottle green for money in | rainbow chart series |
| Children's reading app | Picture book: cream, tomato, sky, a dark ink for text | Crayon box limited to four, thick outlines | low-contrast pastels for text |
| Record label or music | Club flyer: black, chrome grey, one acid colour | Risograph: off-white, fluorescent pink, blue overprint | stock gradient mesh |
| Developer tool | Console: graphite, white, signal yellow for the cursor and focus | Blueprint: navy, pale blue lines, white | purple-blue glow |
| Restaurant or food | Kitchen: butcher paper, oxblood, herb green | Market: chalk black, citrus, cream | grey corporate blue |
| Studio portfolio | Gallery: off-white, black, the work provides the colour | Poster: one loud ground colour, black type | same palette as the last five portfolios |
| Health or clinic | Linen: warm white, slate, sage for confirmation | Calm blue-grey, white, one coral for urgent | alarm red everywhere |

## Writing it down

```
Combination "night ledger"
- ledger ink   #0c0f17  ground, 70%
- receipt bone #ece6da  text and paper documents, 22%
- grey line    rgba(236,230,218,.1)  rules and borders, 5%
- cobalt       #3a55f0  primary action and the paid state only, 3%
```
