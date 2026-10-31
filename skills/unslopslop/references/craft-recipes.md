# Craft recipes, measured

These ranges come from the measured references in `../../../inspiration/catalog.md` (ids in brackets). They are what separated the gold set from the component-shop and template-landing pages on 30 October 2026. A builder follows them; a reviewer checks them with a ruler (computed styles, a 10% grid over the screenshot, the palette strip from `detect.mjs`). Each recipe ends with **Check**: lines a reviewer can answer yes or no.

The numbers are ranges, not targets. A brief may break one on purpose; write the reason in DESIGN.md.

**Scope.** The gold set is C01 to C06, C09 to C13, C18 and C23. Every Check line below was re-tested against each of them; where a gold entry is outside a line's scope, the line says so. Entries marked useful (for example C22, whose hero did not render in our capture) are cited for technique only and are not used to set thresholds.

## 1. First screen: the strong hero

Measured at 1440 x 900 on the gold set:

| Property | Gold set | Weak set (counter examples) | Separates? |
|---|---|---|---|
| Display font size | product pages 86 to 104 px; poster pages about 115 to 440 px | 48 to 88 px, most 48 to 72 | necessary, not sufficient |
| Display cap height as share of screen height (size x 0.7 / 900) | product pages 6.7 to 8%; poster pages 9 to 38% | 3.7 to 6.8% | necessary, not sufficient |
| One real subject on the first screen (object, character, photo, product UI, code-drawn pattern) | 11 of 11 gold web first screens (C18 is a dashboard card and C23 a poster board; both out of scope for section 1); its area runs from about 5% (one lit object on a dark stage [C09]) to 100% (full-bleed photo [C05]) | 3 of 9; the rest are text only, a blurred orb or a grid of small items | yes |
| Subject plus display block together | 15% of the first screen or more (lowest: C09 about 16%, C03 about 21%) | often similar (a big text block alone) | no |
| Subject and display line overlap, or a third layer crosses the subject's edge | 5 of 8 type-led gold heroes (C01, C04, C05, C06, C10; not C03, C09, C11) | 1 of 9 (not counting type over a blur) | partly |
| Saturated colours outside images and illustrations | at most 2; each is either a field (15 to 80%) or an accent under 3% | 2 to 4; a headline keyword coloured in 4 of 9 | yes |
| Corner labels (9 to 13 px, uppercase, tracked, often mono) | 2 to 4 corners on the poster-style pages (C01, C04, C05, C06); not used on C09, C10, C11 | none, or one eyebrow pill above the headline | poster style only |
| Display to body ratio | 2.8x (pattern-led C12) to about 24x (C04); C09 5.3x, C11 4.3x | 2.4x to 5.1x | no |
| Words in the display line | 1 to 8 | 6 to 10 | partly |
| Display line height | 0.8 to 1.0 of the size; 1.21 on C12 | 0.95 to 1.1 | no |
| Display tracking | heavy grotesk -2% to -6%; serif -1% to -2%; thin capitals +8% to +12% | -1% to -3.5% | no |
| Display size at 390 x 844 | type-led gold 48 to 64 px (C09 64, C11 53, C10 48); pattern-led C12 37 px | 30 to 42 px | yes |
| Display width at 390 x 844 | 68 to 92% of the viewport | 74 to 90% | no |

Exceptions in the gold set: a tool-first page [C13] (type 11 to 14 px, the tool is the subject), a pattern-led page [C12] (56 px, the pattern is the subject) and a subject-led page with no display line on the first screen [C02]. None of them is a text-only hero.

The gold first screens fall into three families; pick one on purpose:
- **Subject-led:** the subject takes 25 to 100% (C01, C02, C05, C10, C11, C12, C13).
- **Type-led poster:** the display block takes 25 to 50% and a smaller subject crosses it (C04, C06).
- **Quiet object:** ground at 90% or more, one object of 5 to 20% and a display line, held together by one light or an element cut by the edge (C03, C09).

Recipe:
1. Decide the family and the subject first (the product doing its verb, the object, a person using it, a code-drawn pattern if nothing else exists). Size the subject for the family: 25% or more when subject-led, 5 to 20% for a quiet object, smaller than the type in a poster.
2. If the first screen has a display line, set it at 84 px or more at 1440 x 900 (cap height at least 6.5% of the screen) and 48 px or more at 390 px; for a poster direction aim at 20% cap height or more. Short line: eight words at most.
3. Tie the subject to the display line with one deliberate move: the subject in front of the type (an object crossing the name [C06]), the type in front of the subject (the word as the floor [C04]), a third layer crossing the subject's edge [C10], one shared light [C09], an element cut by the viewport edge [C03], or the product output itself at 40% or more beside the type [C11].
4. In a poster direction, put the small facts in the corners: brand and navigation top, one fact and a scroll or status cue bottom. The centre is only for subject and display.
5. Colour: at most two saturated colours outside images; each one is a field (15 to 80%) or an accent under 3% on the single action or the single live thing.

**Check:**
- [ ] If the first screen has a display line, it is 84 px or more at 1440 x 900 (cap height at least 6.5%; measure font size x 0.7 / 900). Out of scope: tool-first [C13] and pattern-led [C12] pages, where the subject takes 45% or more.
- [ ] Exactly one real subject (product, photo, object, character, drawn pattern), not a blur, an icon or a grid of small items.
- [ ] The subject is tied to the display line by one move from recipe step 3 (overlap, edge-crossing layer, shared light, element cut by the viewport edge, or product output at 40%+).
- [ ] At most two saturated colours outside images and illustrations; each is a field (15 to 80%) or an accent under 3%.
- [ ] No coloured or gradient word inside the headline.
- [ ] At 390 x 844 the display line is 48 px or more and the subject is still on the first screen (measured: gold 48 to 64 px, counters 30 to 42 px, all live pages; the template recordings were not measured at 390; same scope as the first line).

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
- Body text 18 to 22 px on landing pages, line height 1.4 to 1.5 where measured (27/18 [C09], 30/20 [C12], 32.6/22 [C11], 28/20 [C14]; not measured on the template recordings or C10).
- Hierarchy without a new colour: weight contrast inside one line [C11], or the same size in a second tone [C22], or a serif word inside a sans line [C01].
- In-between weights are a quiet signature: 510, 575, 780 instead of 400 / 700.
- A novelty face (pixel, script, distressed) appears in one place only [C21, C06].

**Check:**
- [ ] On a landing page the display step is at least 2.8x the body size (gold: 2.8x on C12, 4.3x on C11, 5.3x on C09, about 24x on C04). Out of scope: tool UI [C13]. The jump from display to the second step is free: gold pages range from 1.1x [C12] and 1.7x [C09] to 6x [C04].
- [ ] Body is 17 to 22 px with line height 1.4 to 1.6 on a landing page (C09, C11, C12 measured inside this range).
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

Pattern: unless the first screen is a full-bleed photograph (C01, C05), one ground at 55 to 97%, then either one strong second field (15 to 25%) or none, and an accent between 0.4 and 3%. The accent marks one action or one live element (a playhead, a running state, a button). Warm grounds tend to use warm greys (C11, C13); C09 and C12 use neutral greys, so this is a note, not a check.

**Check:**
- [ ] Unless the first screen is a full-bleed photograph, the palette strip shows one ground at 55% or more.
- [ ] Every saturated colour outside images and illustrations is a field (15 to 80%) or an accent under 3%, and every accent use is an action or a state.

## 4. Depth and layering

Recipes measured in the set, in order of strength:

1. **One object, one light** [C09, C01, C15]. Dark ground at 90%+. One subject lit from one side; a light cone or streak on the floor in the same direction; the shadow side of the object nearly merges with the ground. No card shadows needed anywhere else.
2. **Product on a photograph** [C10, C17]. A real photograph as the back layer (z 1), the product UI card on top (z 2), a third small layer crossing the card's edge (z 3: people tiles, a note, a chip). The photo shows on at least two sides of the card.
3. **Subject and type interlock** [C04, C06, C03, C05]. The display line passes behind or in front of the subject; part of a letter is hidden. Decide which letters are covered so the word stays readable.
4. **Frame-breaking element** [C03, C06]. One painted or photographic element is cut by the viewport edge; or a thin frame in the brand colour (about 8 px) turns the whole screen into an object.
5. **Shadows that model a floor, not an outline.** Measured: `0 14px 30px -18px rgba(0,0,0,.45)` (negative spread) [W18]; `0 1px 2px rgba(20,18,15,.08)` plus a faint second layer, with a 1 px inset line in a warm grey [C13]; tiles on white separated by a 1 px inset line and no drop shadow [C17].

**Check:**
- [ ] The first screen has at least three depth layers, for example ground, a panel or photo, and the subject or an element crossing an edge (gold: C12 ground, white panel, pattern; C11 ground, panel, graph; C09 ground, light cone, object).
- [ ] If there is a light, it has one direction and every shadow agrees with it.
- [ ] On a light ground, no card shadow with zero spread above 20% opacity (gold light pages measured: 1 to 8%); no glow around buttons. Dark grounds are out of scope (C11 uses 45% black on #1B1B19, where it barely shows).

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
- [ ] At most one texture kind per screen, and it either belongs to the subject or the type (pattern, halftone, print wear, ink) or is one quiet layer under 10% opacity (C03 particles cross the whole screen at low contrast and pass).
- [ ] Any gradient larger than 30% of the screen carries grain or dither, or is a directed light shape (ribbons, a cone), not a round blob.

## 6. Motion, measured

| Kind | Measured | Easing seen |
|---|---|---|
| Hover and colour | 100 to 300 ms (C09 150 to 200, C10 150 to 300, C11 300, C13 150 to 180) | ease, ease-out, `cubic-bezier(0.4, 0, 0.2, 1)`, `cubic-bezier(0.215, 0.61, 0.355, 1)` |
| State swap (text, step, row) | 170 to 250 ms, slide plus brief blur [C18] | ease-out, most travel in the first half |
| Panel slide | 300 to 420 ms [C13, C20] | `cubic-bezier(0.22, 1, 0.36, 1)`, in-out `cubic-bezier(0.77, 0, 0.175, 1)` for panels |
| Small scale pop | 200 ms [C12] | back-out `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Headline entrance, once | 0.9 to 1.0 s (useful entries C15, W18 only; not measured on gold pages) | ease-out family |
| Loops in the gold set | one calm breathing element, 3.6 s [C11]; the product's own demo, 6 s [C12]; loading shimmer while loading, 1.6 and 2.6 s [C13] | linear or ease |
| Loops in useful entries | marquees slow enough to read as still, 111 to 535 s [C14, C16] | linear |
| Loops in counter examples | decorative pulse 2 s, beam spin 3 to 4 s, rainbow border 3 s, several at once [W27, W30, W31] | linear |
| Scroll stories (cinematic heroes) | median segment 0.13 to 1.0 s; idle 11 to 56% of the recording | scroll-linked |
| Two-phase selection (31 Oct batch) | stretch 190 ms, then settle 420 ms with overshoot [C29] | `cubic-bezier(0.32, 0.72, 0.24, 1)`, then `cubic-bezier(0.28, 1.28, 0.36, 1)` |
| Icon morph (31 Oct batch) | about 500 ms with no bounce; two-step 620 ms [C31] | critically damped spring; `cubic-bezier(0.65, 0, 0.35, 1)` |
| Part-by-part mark change (31 Oct batch) | 320 to 460 ms per part, 0 to 120 ms stagger, flicker 1.6 s step-end [C29] | back-out `cubic-bezier(0.34, 1.56, 0.5, 1)` |
| Brand film beats (31 Oct batch) | picture cuts 200 ms, words 300 ms apart [C25]; typing about 40 characters per second, lines every 400 ms [C30] | hard cuts; ease-out for words |
| Ambient content field (31 Oct batch) | cards drift 20 to 30 px per second at three depths around a clear centre [C26] | linear |

The difference is not the period but the job. Gold pages loop only something that is the product or a calm sign of life; counter examples loop decoration that keeps pulling the eye.

**Check:**
- [ ] No loop that keeps pulling attention: no decorative pulse, beam, spinning or rainbow border, or glow loop. Allowed: one calm breathing loop (small opacity or scale change), the product's own single state or demo loop, a loading indicator while loading, and marquees slow enough to read as still.
- [ ] Motion is spent on the subject or the product (reveal, zoom, demo, the subject acting); the page chrome stays still apart from hover and focus.
- [ ] Hover and state changes take 100 to 300 ms.

## 7. Card anatomy

Measured radii: 1 to 4 px on exact, editorial pages (C11, C12), 4 to 16 px plus pills on product pages (C09, C10, C13); gold pages use 4 to 6 radius values in total, so radius count is a note, not a check. Gold pages rarely show a grid of identical cards on the first screen; where cards repeat, they are product objects (covers, note cards, numbered stacked steps [C02]) rather than icon plus title plus line.

**Check:**
- [ ] Repeated cards carry real content (a product view, a photo, a number with a date), not an icon and two lines.
- [ ] Steps are a stack, a route or a diagram, not three equal tiles.

## 8. Owner calibration

The owner's own board [C23] and house page [C11] set the bar for this project family: poster-scale type that interlocks with one subject, technical micro labels in the corners, one texture, two or three colours with one dominant field, and the product's own output shown big. A page that is clean but sets the display line under 84 px and shows no subject is judged "still very bad" by this owner. Run sections 1 to 4 before asking for review.
