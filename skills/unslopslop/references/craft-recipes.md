# Craft recipes, measured

These ranges come from the measured references in `../../../inspiration/catalog.md` (ids in brackets). They are what separated the gold set from the component-shop and template-landing pages on 30 October 2026. A builder follows them; a reviewer checks them with a ruler (computed styles, a 10% grid over the screenshot, the palette strip from `detect.mjs`). Each recipe ends with **Check**: lines a reviewer can answer yes or no.

The numbers are ranges, not targets. A brief may break one on purpose; write the reason in DESIGN.md.

## 1. First screen: the strong hero

Measured at 1440 x 900 on the gold set:

| Property | Gold set | Weak set (counter examples) | Separates? |
|---|---|---|---|
| Display font size | product pages 86 to 104 px; poster pages about 115 to 440 px | 48 to 88 px, most 48 to 72 | necessary, not sufficient |
| Display cap height as share of screen height (size x 0.7 / 900) | product pages 6.7 to 8%; poster pages 9 to 38% | 3.7 to 6.8% | necessary, not sufficient |
| Area taken by one subject (object, character, photo, product UI) | 25 to 60% | 0% (text only), a blurred orb, or a grid of many small items | yes |
| Subject and type touch or overlap, or a third layer crosses the subject's edge | 7 of 10 type-led gold heroes | 1 of 9 (not counting type over a blur) | yes |
| Saturated colours on the first screen | 1 field + 1 accent under 3%, or 2 fields split about 60/25 | 2 to 4; a headline keyword coloured in 4 of 9 | yes |
| Corner labels (9 to 13 px, uppercase, tracked, often mono) | 2 to 4 corners on the poster pages | none, or one eyebrow pill above the headline | yes |
| Display to body ratio | 4.3x to 20x | 2.4x to 5.1x | partly |
| Words in the display line | 1 to 8 | 6 to 10 | partly |
| Display line height | 0.8 to 1.0 of the size | 0.95 to 1.1 | no |
| Display tracking | heavy grotesk -2% to -6%; serif -1% to -2%; thin capitals +8% to +12% | -1% to -3.5% | no |

Exceptions in the gold set: a tool-first page [C13] (type 11 to 14 px, the tool is the subject) and a pattern-led page [C12] (56 px, the pattern is the subject). Both put a subject at 45% or more of the screen; neither is a text-only hero.

Recipe:
1. Decide the subject first (the product doing its verb, the object, a person using it, a code-drawn pattern if nothing else exists). It takes 25 to 60% of the first screen.
2. Set the display line at 84 px or more at 1440 x 900 (cap height at least 6.5% of the screen) for a product page, or at 20% cap height or more for a poster direction. Short line: eight words at most.
3. Choose the layer order on purpose: the subject in front of the type (an object crossing the name [C06]), or the type in front of the subject (the word as the floor [C04]), or the subject beside the type with a second layer crossing its edge [C10, C11].
4. Put the small facts in the corners: brand and navigation top, one fact and a scroll or status cue bottom. The centre is only for subject and display.
5. Colour: one field or two, one accent under 3% used on the single action or the single live thing.

**Check:**
- [ ] Display line at 84 px or more at 1440 x 900 (cap height at least 6.5% of the screen; measure font size x 0.7 / 900), unless the page is tool-first or pattern-led and the subject takes 45% or more.
- [ ] One subject, 25% of the first screen or more, and it is real (product, photo, object, drawn subject), not a blur or an icon.
- [ ] The subject and the display line overlap, or a second layer crosses the subject's edge.
- [ ] At most one saturated hue outside images, under 3% of the screen, used for an action or a state.
- [ ] No coloured or gradient word inside the headline.
- [ ] At 390 px the display line still fills at least 70% of the width and the subject is still on the first screen.

Board: `inspiration/boards/subject-over-type.html`, `object-and-light.html`, `product-panel-hero.html`.

## 2. Type scale ladders

Measured ladders (px, largest to body), useful as starting points:

| Character | Ladder | Weights | From |
|---|---|---|---|
| Calm product, serif display | 86 / 48 / 36 / 24 / 18 | serif 400, sans 400 to 500 | [C10] |
| Dark exact, serif display | 96 / 56 / 24 / 18 / 14 | serif 400, sans 400 | [C09] |
| Product hero, grotesk | 95 / 36 / 22 / 18 / 13 | 780 and about 250 inside one headline; text serif 380 for body | [C11] |
| Quiet, variable sans | 64 / 48 / 24 / 15 / 13 | 510 everywhere, hierarchy by tone (grey second sentence) | [C22] |
| Swiss calm | 56 / 52 / 20 / 16 / 12 | 500 / 400 | [C12] |
| Poster, condensed | 440 / 72 / 18 / 11 mono | 800 to 900 / 400 | [C04] |
| Tool UI | 14 / 13 / 12 / 11 | 500 / 400, mono only for timecodes | [C13] |

Rules seen across the set:
- Body text 18 to 22 px on landing pages, line height 1.4 to 1.55 (27/18, 29/18, 30/20, 32.6/22).
- Hierarchy without a new colour: weight contrast inside one line [C11], or the same size in a second tone [C22], or a serif word inside a sans line [C01].
- In-between weights are a quiet signature: 510, 575, 780 instead of 400 / 700.
- A novelty face (pixel, script, distressed) appears in one place only [C21, C06].

**Check:**
- [ ] The ladder has a jump of at least 2.5x between the largest step and the next one.
- [ ] Body is 17 to 22 px with line height 1.4 to 1.6 on a landing page.
- [ ] Hierarchy inside the headline, if any, uses weight, tone or a second face, not a colour highlight.

## 3. Colour as area

Measured first-screen shares (pixels):

| Combination | Shares | From |
|---|---|---|
| warm ink, panel, bone, teal | 83 / 9 / 2 / under 1 | [C11] |
| black, object greys, type | 97 / 2 / 1 | [C09] |
| white, charcoal, lime | 79 / 5 / 3 | [C10] |
| light grey, black pattern, yellow | 74 / 21 / 0.4 | [C12] |
| forest, acid lime | 63 / 24 | [C04] |
| cobalt, white, tangerine | 78 / 4 / about 1 | [C02] |
| cream, wine | 59 / 19 | [C06] |
| paper, ink, violet | 93 / 1 / under 1 | [C03] |

Pattern: one ground at 55 to 97%, then either one strong second field (15 to 25%) or none, and an accent between 0.4 and 3%. The accent marks one action or one live element (a playhead, a running state, a button).

**Check:**
- [ ] The palette strip shows one ground at 55% or more.
- [ ] The accent is under 3% and every use of it is an action or a state.
- [ ] Greys are tinted toward the ground (warm ground, warm greys), not neutral #888.

## 4. Depth and layering

Recipes measured in the set, in order of strength:

1. **One object, one light** [C09, C01, C15]. Dark ground at 90%+. One subject lit from one side; a light cone or streak on the floor in the same direction; the shadow side of the object nearly merges with the ground. No card shadows needed anywhere else.
2. **Product on a photograph** [C10, C17]. A real photograph as the back layer (z 1), the product UI card on top (z 2), a third small layer crossing the card's edge (z 3: people tiles, a note, a chip). The photo shows on at least two sides of the card.
3. **Subject and type interlock** [C04, C06, C03, C05]. The display line passes behind or in front of the subject; part of a letter is hidden. Decide which letters are covered so the word stays readable.
4. **Frame-breaking element** [C03, C06]. One painted or photographic element is cut by the viewport edge; or a thin frame in the brand colour (about 8 px) turns the whole screen into an object.
5. **Shadows that model a floor, not an outline.** Measured: `0 14px 30px -18px rgba(0,0,0,.45)` (negative spread) [W18]; `0 1px 2px rgba(20,18,15,.08)` plus a faint second layer, with a 1 px inset line in a warm grey [C13]; tiles on white separated by a 1 px inset line and no drop shadow [C17].

**Check:**
- [ ] The first screen has at least three depth layers (ground, subject, something crossing an edge or a light).
- [ ] If there is a light, it has one direction and every shadow agrees with it.
- [ ] No box shadow with zero spread and more than 20% opacity on cards; no glow around buttons.

Boards: `object-and-light.html`, `product-on-photo.html`, `object-in-landscape.html`.

## 5. Texture that belongs

Measured or seen:
- Texture inside the type: printed wear on a heavy display face, paper showing through [C06].
- Pattern as the image: a 1-bit black and white field half the hero wide [C12].
- Halftone or dither on a photograph in a single brand colour band [C16].
- Ink wash and particles at low contrast on paper, 1 to 5% of pixels [C03].
- Dot grid, 1 px dots at about 7% white on a dark field, only in one band [C16].

Rule: texture is either the subject (pattern, halftone image) or under 10% opacity in one zone. A texture that sits evenly behind everything is wallpaper.

**Check:**
- [ ] Texture appears in one zone or one element, not across the whole page.
- [ ] Any gradient larger than 30% of the screen carries grain or dither, or is a directed light shape (ribbons, a cone), not a round blob.

## 6. Motion, measured

| Kind | Gold set | Easing seen |
|---|---|---|
| Hover and colour | 100 to 200 ms | ease, `cubic-bezier(0.25, 0.46, 0.45, 0.94)`, `cubic-bezier(0.215, 0.61, 0.355, 1)` |
| State swap (text, step, row) | 170 to 250 ms, slide plus brief blur | ease-out, most travel in the first half |
| Panel slide | 300 to 420 ms | `cubic-bezier(0.22, 1, 0.36, 1)`, in-out `cubic-bezier(0.77, 0, 0.175, 1)` for panels |
| Small scale pop | 200 ms | back-out `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Entrance of the headline | 0.9 to 1.0 s, once | ease-out-quint family |
| Ambient loop | 24 to 535 s per loop (reads as still), or none | linear |
| Scroll stories (cinematic heroes) | median segment 0.13 to 1.0 s; idle 11 to 56% of the recording | scroll-linked |

The gold cinematic pages spend motion on one story told by scroll: the subject is revealed, zoomed, or acts out the next section. Component-shop pages spend it on infinite 2 to 4 s loops (pulse, beam spin, rainbow border).

**Check:**
- [ ] No infinite loop under 20 s in the page chrome.
- [ ] One motion moment is tied to the subject (reveal, zoom, an action by the subject), and it reaches a still end state.
- [ ] Hover and state durations are 100 to 250 ms with an ease-out curve.

## 7. Card anatomy

Measured radii cluster at 1 to 4 px (exact, editorial) or 12 to 16 px (product UI), with pills only for controls. Gold pages rarely show a grid of identical cards on the first screen; where cards repeat, they are product objects (covers, note cards, numbered stacked steps [C02]) rather than icon plus title plus line.

**Check:**
- [ ] Repeated cards carry real content (a product view, a photo, a number with a date), not an icon and two lines.
- [ ] Steps are a stack, a route or a diagram, not three equal tiles.
- [ ] One radius family per page (plus pills for controls).

## 8. Owner calibration

The owner's own board [C23] and house page [C11] set the bar for this project family: poster-scale type that interlocks with one subject, technical micro labels in the corners, one texture, two or three colours with one dominant field, and the product's own output shown big. A page that is clean but keeps type under 8% of the screen height and shows no subject is judged "still very bad" by this owner. Run sections 1 to 4 before asking for review.
