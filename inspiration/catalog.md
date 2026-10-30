# Inspiration catalogue

Measured references, written without names, links or copied material. Every number below was measured by us on 30 October 2026 (computed styles in a 1440 x 900 headless browser, palette shares from the first-screen pixels, motion from declared animations or frame differences). Values read from screen recordings are scaled to a 1440 x 900 frame and are approximate (about ±10%). Hex values are measurements, not palettes to reuse.

**How to use it.** Before building, pick 2 or 3 entries whose tags match the brief (the gold ones first) and write their ids in the brief's `References:` line with what you take from each. Open the matching composition board in `boards/` and put your first screen next to it with `scripts/compare.mjs`. Check your page against the measured ranges in `skills/unslopslop/references/craft-recipes.md`. Never copy a shape, subject, wording or palette; take the proportion, the layer order, the timing.

**Roles.** `role:gold` is the bar to beat. `role:useful` has one technique worth taking. `role:counter` is a measured example of what not to ship; it is listed because its numbers make good calibration.

## Batch 2026-10-30: what repeated

1. **Scale is the difference.** Type-led gold heroes set the display line at 86 to 104 px on product pages (cap height 6.7 to 8% of the screen) and about 115 to 440 px on poster-like pages (9 to 38%). The component-shop and template-landing pages sit at 48 to 88 px, most at 48 to 72 (3.7 to 5.6%). Size alone does not save a page (counter W26 uses 88 px, W18 uses 104 px), but no gold hero is small and text-only.
2. **One subject, and it touches the type.** 5 of the 8 cinematic heroes put a single real subject (object, character, face, product UI) across or behind the display line with a deliberate z-order. None used a blurred orb.
3. **Two big colours, one small one.** Gold first screens are carried by one or two fields (55 to 95% of pixels) and an accent under 3%, or by two fields that split about 60/25. Accent on a headline keyword appeared only in counter examples.
4. **The frame is designed.** Gold heroes put 9 to 13 px uppercase labels (often mono, tracked) in two to four corners of the screen; the middle stays for subject and display type.
5. **Depth comes from light and overlap, not from card shadows.** One light source on a dark stage, a product card laid over a photograph, a layer that crosses the edge of another. Box shadows, where present, use negative spread or a 1 px inset line.

Technique to try next: a hero where the display line is set at 20%+ of screen height and one subject crosses it, on a two-colour field, with corner labels; compare against board `subject-over-type`.

## Gold

### C01 · Covered object under one skylight
- Tags: domain:web · style:luxury-fashion · mood:luxurious, quiet, slow · palette:warm-stone+umber+oxblood · motion:scroll-story · type:wide-light-caps+italic-serif · role:gold
- Measured: first screen #1A1815 28%, #383736 24%, #766659 23% (all warm stone tones), oxblood only on the object (under 1%). Display set in wide, light capitals, cap height about 9% of the screen (about 115 px type), with one word swapped into an italic serif at the same size. Micro labels 9 to 10 px, tracked capitals, top bar and corners. Recording 37.6 s: 32 motion segments, 28% idle, median segment 0.6 s.
- Layers: one object under a cloth, a single overhead light cone, a floor reflection; the cloth is pulled away by a drag gesture; later a gauge drawn in thin lines with a table of figures beside it.
- Signature: the reveal is the interaction. The product is hidden on arrival and the visitor uncovers it.
- Steal as a principle: give the first screen one object and one light source; let the first interaction reveal the product rather than scroll past it. Mixing a wide sans in capitals with an italic serif word gives a luxury voice without decoration.
- Do not take: the object, the cloth, the setting.

### C02 · Mascot world on a cobalt field
- Tags: domain:web · style:playful-kids, claymorphism · mood:playful, cool, confident · palette:cobalt+white+tangerine · motion:scroll-story · type:grotesk · role:gold
- Measured: cobalt #3B46DC covers 78% of the first screen (59% mid-page, where #ADB4F2 tint takes 11%); white 4%; one tangerine for the single button. Recording 23.5 s: 46 motion segments, median 0.2 s, 34% idle.
- Layers: a 3D character standing on translucent ice blocks; numbered cards (01 to 03) stack and shift beside it; a vertical thermometer with a large reading changes value per step; the closing screen sets two words across the full width, bleeding off both edges.
- Signature: one character carries every section, and the section's idea is acted out by it (cooling a problem down).
- Steal as a principle: if the brand has a metaphor, make one subject act it out in every section; one saturated field at 60 to 80% is enough identity when the subject is strong. Numbered steps can be a stacked card deck instead of three tiles.
- Do not take: the character, the metaphor, the colours together.

### C03 · Ink wash on paper, tracked serif
- Tags: domain:web · style:japanese-minimal, editorial-serif · mood:calm, poetic, airy · palette:rice-paper+ink+wisteria · motion:ambient-slow, scroll-story · type:serif-display · role:gold
- Measured: paper #ECE9E0 93% of the first screen, ink #26221C about 1%, violet only in petals. Display: thin serif capitals, tracking about +0.12 em, 70% of the width, cap height about 13% (about 170 px type). Tagline a small italic serif. Vertical stacked labels and a small square seal down the left edge. Recording 19.7 s: 56% idle, median motion segment 0.13 s (particles drifting, sections easing in).
- Layers: a brush-painted branch enters from the top right and is cut by the edge; petals fall across text; illustrations are ink washes with soft edges; the last screen inverts to near-black with the same particles.
- Signature: one painted element breaks the frame and the type is pure and wide-tracked.
- Steal as a principle: a calm page can still be big: a 13% cap height in a thin serif with wide tracking reads quiet and confident. Let the image bleed off one edge. Use one ambient particle layer at low contrast instead of a gradient.
- Do not take: the motifs, the script labels, the seal.

### C04 · Sports mascot and a word the width of the screen
- Tags: domain:web · style:neo-brutalism, playful-kids · mood:loud, playful, sporty · palette:forest-green+acid-lime · motion:scroll-story · type:condensed-heavy+mono-labels · role:gold
- Measured: forest #0C3917 63%, acid lime #DDFF41 24% (type and the button). One word in a heavy condensed face spans 94% of the width, cap height about 38% of the screen (about 440 px type), sitting at the bottom. Mono labels 11 px in uppercase at the top and above the word on both sides. Recording 22.3 s: 26 segments, median 0.23 s, 35% idle.
- Layers: a 3D character stands behind the word; the word covers its legs (type in front of the subject). Later a scoreboard figure ticks in tabular digits, a drawn play diagram animates a route line, a form is styled as a contract card.
- Signature: the brand word is the floor the subject stands on.
- Steal as a principle: two colours in a 60/25 split can carry a whole site. Put the subject behind the display word so the type becomes part of the scene. Explain process with a drawn diagram that animates one route, not with icon cards.
- Do not take: the character, the sport, the diagram.

### C05 · Portrait, then product macro
- Tags: domain:web · style:luxury-fashion · mood:cold, precise, premium · palette:snow-white+black+lens-spectrum · motion:scroll-story · type:grotesk-tight · role:gold
- Measured: first screen #E2EBF5 53% and #C3CDDB 14% (photograph), black type; second section turns 73% black with the product lit. Display in a heavy grotesk with tight tracking (letters touch), cap height about 25%, bottom left, width about 50%. Micro labels 9 to 10 px in all four corners. Recording 16.2 s: 9 long segments (median 0.73 s, longest 4.6 s): slow scroll-linked zooms.
- Layers: full-bleed portrait; the product then appears alone on black, rotated, then an extreme close-up of its strap texture fills the frame; a price block sits beside a small product shot.
- Signature: zoom from person to object to material in three scrolls.
- Steal as a principle: a product story can be told as distance: wearer, object, material. Corners carry the small facts; the centre carries one image.
- Do not take: the photographs, the gradient-text line near the end (it is the weak moment of the page).

### C06 · Bottle crossing worn display type
- Tags: domain:web · style:risograph-print, zine-punk · mood:warm, bold, crafted · palette:cream+wine+ink · motion:scroll-story · type:condensed-heavy-distressed · role:gold
- Measured: cream #EBE7D9 59%, wine #731C34 19%, a thin wine frame around the whole viewport (about 8 px). Display in a heavy condensed face, two lines each about 23% of the screen high, the first cut by the top edge; the letters have a printed, worn texture (paper showing through). Recording 10.1 s: 11% idle, median segment 1.0 s.
- Layers: the product lies diagonally across both lines, in front of them; ink splashes appear as the page scrolls; a later section uses a dark field with a large outlined word as a watermark.
- Signature: the product cuts the name in two.
- Steal as a principle: texture belongs in the type when the brand is crafted (print wear, ink), not in a background blob. A thin viewport frame in the brand colour makes the screen an object.
- Do not take: the bottle, the splash shapes, the word.

### C09 · Serif on black with one lit object
- Tags: domain:web · style:editorial-serif · mood:exact, premium, calm · palette:black+bone · motion:micro-only · type:serif-display+grotesk · role:gold
- Measured: #040404 97% of the first screen. Display in a serif at 96/96 px, weight 400, tracking -0.96 px (-1%); section heads in a grotesk 56 px with -2.8 px (-5%); body 18/27 px #A1A4A5. A single dark cube on the right, lit from the upper left, a soft light streak on the floor. State transitions 150 to 200 ms; six-column grid for proof marks; section padding 96 px.
- Signature: a developer product presented like a sculpture.
- Steal as a principle: on a dark stage, one object and one light direction are enough depth; a regular-weight serif at 96 px reads expensive without any effect. Keep weight 400 for the serif, push tracking in the sans section heads instead.
- Do not take: the object, the specific faces.

### C10 · Product card laid over a photograph
- Tags: domain:web · style:editorial-serif, organic-earthy · mood:warm, friendly, exact · palette:white+charcoal+lime · motion:scroll-story · type:serif-display+humanist-sans · role:gold
- Measured: #FCFDFB 79%, charcoal #2B2B2B 5%, lime #C2CE49 3% on the first screen (19% charcoal and 6% lime over the whole page). Display serif 86.4/80.4 px, weight 400, tracking -1.73 px (-2%), four lines, left. Sizes used on the page: 160, 108, 88, 60, 48, 36, 32, 24, 22 px (a long, generous ladder). 
- Layers: the product's note card sits on a landscape photograph and a lime block; two small video tiles of people overlap the card's right edge; further down every feature is a product card on its own photo, offset so the photo shows on two sides. Full-width lime band for one section.
- Signature: real software on real places; the photo behind the UI does the mood, the UI does the proof.
- Steal as a principle: put the product UI on a photograph and let a second layer (people, a note, a chip) cross the card edge. Use a serif at weight 400 for warmth and a single natural accent at about 3%.
- Do not take: the photographs, the card content.

### C11 · Product panel as the hero (house benchmark)
- Tags: domain:web · style:data-dense · mood:exact, technical, calm · palette:warm-ink+bone+teal · motion:one-demo · type:grotesk-variable+text-serif · role:gold
- Measured: #1B1B19 83%, #363634 9%, bone #F1F0EB 2% (type), teal #86E0D2 used for one panel title. Display grotesk 95/88 px, weight 780, tracking -3.23 px (-3.4%), four lines with weight contrast: lines two and three drop to a thin weight. Body in a text serif 22/32.6 px, weight 380, #B5B4AE. The right 55% of the first screen is a working panel: a node graph with labels, a question field and a list of sources. Radii 1 to 3 px; one soft shadow 0 2px 12px at 45% black; transitions 300 ms ease.
- Signature: the product's own output fills the hero; the headline alternates heavy and thin.
- Steal as a principle: the first screen shows the product doing its verb with real-looking data at 40 to 55% of the area. Weight contrast inside one headline (780 vs about 250) gives hierarchy without a second colour.
- Do not take: the graph, the wording. Note for calibration: this page is the owner's bar; our outputs are judged against it.

### C12 · Pattern as the hero image
- Tags: domain:web · style:swiss-international · mood:exact, graphic, calm · palette:light-grey+black+yellow · motion:micro-only · type:grotesk · role:gold
- Measured: #FAFAFA 74%, black 21% (the pattern), yellow #FCCB04 0.4% (one button only). Display grotesk 56/68 px, weight 500, tracking -0.56 px (-1%); body 20/30 px #6F6F6F. Radii 2 to 4 px. Section padding 112 to 140 px. Hover: 200 ms scale with a back-out curve cubic-bezier(0.34, 1.56, 0.64, 1); 6 s demo loop of a copy-and-paste action. One very soft four-layer shadow with offsets up to 1126 px at 1 to 4% opacity.
- Signature: a 1-bit black and white pattern half the width of the hero is the only image.
- Steal as a principle: a code-drawn pattern can be the visual; contrast (black on light grey) gives it the weight a photo would. One accent at under 1% on the single action.
- Do not take: the specific patterns.

### C13 · The tool is the first screen
- Tags: domain:web, dashboard · style:data-dense · mood:exact, calm, warm · palette:warm-white+ink+signal-red · motion:micro-only · type:grotesk+mono-for-timecodes · role:gold
- Measured: #FDFCFB 54%, ink #181713 30% (the preview stage). Type 11 to 14 px only; mono only for timecodes and durations. Pills (999 px) for segmented controls, 12 px radius for panels. Shadow 0 1px 2px rgba(20,18,15,.08) plus a second faint layer; 1 px inset line #E5E0DA. Transitions 150 to 180 ms ease-out, transforms 420 ms cubic-bezier(0.22, 1, 0.36, 1); loading shimmer 1.6 and 2.6 s. Red only for the playhead.
- Signature: no marketing hero at all; you arrive inside the product.
- Steal as a principle: when the product is a tool, show the tool working at full size and let its own chrome be the design. Use the brand's one strong colour for the one live thing (the playhead).
- Do not take: the layout of rails and panels as-is.

### C14 · Prose first, proof by live components
- Tags: domain:web · style:editorial-serif · mood:calm, exact · palette:paper-white+black+blue-action · motion:micro-only · type:grotesk-variable · role:useful
- Measured: #FDFDFC 95%. Display 48/52 px, weight 575 (a variable in-between weight), tracking -1.2 px (-2.5%); h2 26/32 px weight 500; body 20/28 px #404040. Single column 620 to 732 px wide. Logo marquees run 385 to 535 s per loop, so they read as still. Small working demos (a toast, a drawer) instead of screenshots.
- Signature: an intermediate weight and a page that proves its claim with a button you can press.
- Steal as a principle: if the product is about interaction, embed one working component; and a 575 weight sits between regular and bold without shouting.
- Do not take: the countdown strip and the famous-logo row (both tells).

### C15 · Diagonal light ribbons on black
- Tags: domain:web · style:glass-aurora · mood:fast, technical, bold · palette:near-black+crimson · motion:one-demo · type:grotesk · role:useful
- Measured: #07080A 78%, crimson #770209 13% and #A80715 3% (the ribbons). Centred display 64/70 px weight 600. Entrance fade-up 1 s. Ribbons are hard-edged diagonal shapes with blurred falloff, not a round orb.
- Signature: a single crimson light object fills the hero behind centred type.
- Steal as a principle: if a hero uses light, give it a shape and a direction (parallel diagonals) and one hue; a round soft blob reads as default, a directional ribbon reads as designed.
- Do not take: the ribbon shape.

### C16 · Red field and a halftone hand
- Tags: domain:web · style:risograph-print · mood:bold, graphic · palette:black+signal-red+white · motion:micro-only · type:grotesk · role:useful
- Measured: black 54%, red #DE0424 24% over the page. Display 58/58 px weight 500, tracking -1.17 px (-2%). Component cards drift in two horizontal walls at 111 to 151 s per loop. The closing band is full red with a large halftone photograph of a hand pressing a key; one card swaps a dithered image on hover. 1 px dot grid at 7% white on the dark field.
- Signature: the footer is a poster.
- Steal as a principle: halftone or dither turns a stock-feeling photo into a brand image; a full-bleed single-colour band with one halftone subject is a strong closing section.
- Do not take: the hand image, the testimonial wall.

### C17 · Gallery of cinematic covers (and a glass card in a desert)
- Tags: domain:web · style:luxury-fashion · mood:cinematic, warm · palette:white+ink+sunset-umber · motion:none · type:grotesk · role:useful
- Measured: page #FEFEFE 57%, ink 15%; the covers carry the colour (#885836, #B79688, #E6AA86 on the desert cover). Display 56/56 px weight 500, tracking -1.12 px (-2%). 24-column grid with 10 px gaps; 3 columns of covers; 4 px radius; 1 px inset line shadow #B3B3B3 instead of a drop shadow; 180 ms ease-out-cubic.
- Signature (desert cover): a translucent card stands upright in a sunset landscape like a monolith; the headline sits bottom left in two lines, small labels in the top bar.
- Steal as a principle: put the product object into a real place at landscape scale; use 1 px inset lines rather than shadows for tiles on white.
- Do not take: the covers themselves.

### C18 · Agent status card, state by colour only
- Tags: domain:dashboard, mobile · style:data-dense · mood:exact, calm · palette:greys+blue-running+orange-needs-you+green-done · motion:micro-only · type:grotesk+tabular-figures · role:gold
- Measured (screen recording, 60 fps, earlier pass): step row swap is a vertical slide with a short blur, about 200 ms, most travel in the first 100 ms; collapse to a pill about 170 ms; popover open about 250 ms; theme switch about 370 ms. Timer, cost and durations stay aligned while changing (tabular figures).
- Signature: progressive disclosure: pill, card, popover; colour only for running, needs-you and done.
- Steal as a principle: colour is state, never decoration; three levels of detail instead of one crowded card.
- Do not take: the card layout as-is.

### C19 · Kinetic explainer, one verb per beat
- Tags: domain:motion, social · style:none · mood:fast, playful · palette:black+white+violet · motion:scroll-story · type:grotesk · role:useful
- Measured (screen recording, earlier pass): micro-scenes about 1 s each, hard cuts between black and white frames, single words appearing letter by letter or with blur, a route line drawing across a light grid, a chat bubble typing, an icon morphing to its checked state; real photos inside the UI.
- Steal as a principle: one idea per beat, about 1 s, real content in frame.

### C20 · Tool-first component docs
- Tags: domain:dashboard · style:terminal-dev · mood:technical, exact · palette:white+ink+grey · motion:micro-only · type:grotesk+pixel-mono · role:useful
- Measured: text 12 to 18 px, 13 px mono dominates (code panels). Translate transitions 300 ms cubic-bezier(0.77, 0, 0.175, 1) (an ease-in-out-quart, for panel slides); colour 150 ms cubic-bezier(0.23, 1, 0.32, 1).
- Steal as a principle: for panels that slide, a symmetric in-out curve at 300 ms; for colour and hover, a fast ease-out at 150 ms.

### C21 · Effects studio, pixel face in one place
- Tags: domain:dashboard · style:retro-pixel, ascii-text-art · mood:technical, playful · palette:black+white · motion:micro-only · type:geometric-sans+pixel · role:useful
- Measured: #030303 96%. A geometric sans for UI 11 to 15 px; a pixel face only for the section title (22 px). Transitions 200 ms cubic-bezier(0.16, 1, 0.3, 1) (ease-out-expo); 119 live canvases.
- Steal as a principle: a novelty face is a spice: one title, nowhere else.

### C22 · Dark product site with in-between weights (hero not seen)
- Tags: domain:web · style:data-dense · mood:exact, calm · palette:near-black+grey-steps · motion:micro-only · type:grotesk-variable+mono · role:useful
- Measured: #08090B. Display 64/64 px weight 510, tracking -1.41 px (-2.2%); second sentence of a heading set in grey #8A8F98 at the same size (tone instead of size for hierarchy); h2 48 px weight 510. Mono labels 10 to 12 px. Colour transitions 100 ms. Blend modes overlay, lighten and screen on illustration layers. Section padding 128 px. The hero itself did not render in our headless capture (unverified).
- Steal as a principle: weight 510 and tone steps inside one sentence give quiet hierarchy; 100 ms is enough for hover colour.

### C23 · Owner's poster board (15 references)
- Tags: domain:social, web · style:risograph-print, y2k-chrome, swiss-international · mood:loud, graphic, editorial · palette:cobalt+white+yellow; ink+acid-lime; wine+cream; black+chrome · motion:none · type:display-expressive · role:gold
- Measured by eye on the stored images: display type fills 30 to 70% of the poster area; image and letters interlock (a face behind a letter, a photo cut by a glyph); one or two textures per poster (halftone, pixel mosaic, chrome, grain); small technical labels (dates, codes, coordinates) in corners; colour sets of two or three with one dominant field.
- Signature: type is the image.
- Steal as a principle: the owner's taste is poster-scale type interlocked with one subject, technical micro labels and one texture. A page that keeps type under 8% of the screen height will read as timid to this owner.

## Useful, with tells

### W18 · 3D image orbit tool
- Tags: domain:web · style:none · mood:technical · palette:light-grey+ink+blue · motion:one-demo · type:grotesk-heavy · role:useful
- Measured: #F4F4F4 91%. Display 104/102 px weight 700, tracking -5.72 px (-5.5%); h2 64 px -2.88 px. Body 20/31 px #5F5F68. Cards: shadow 0 14px 30px -18px rgba(0,0,0,.45) (negative spread darkens the floor, not the edge). Headline lines rise in 900 ms. 23 live canvases (orbiting image rings).
- Steal: the negative-spread shadow; the live 3D demo as the product proof. Tells: highlighted keyword, beta pill.

### W19 · Directory with palette dots
- Tags: domain:web · palette:warm-paper+ink+orange · role:useful
- Measured: #F8F7F4 85%; display 60/60 px weight 700, -1.5 px; 3 columns, 32 px gaps, 24 px radius cards. Under each thumbnail, four dots show that page's palette.
- Steal: show a palette as dots beside the thing it belongs to (useful in reports).

## Counter examples (measured, for calibration)

| Id | What it is | Measured tells |
|---|---|---|
| W26 | Template shop's own landing page (dark) | 88 px display weight 800 with the last word in a gradient; mono eyebrow pill; avatar stack with a "13,500+" count; `transition: all` on 126 elements; blur 64 px blob behind the hero; brown-blue orb gradient over 60% of the first screen |
| W27 | Component shop, dark | 60 px weight 500 with two highlighted keywords (`mark`); 45 degree stripe texture on 52 elements; infinite 3 to 32 s loops (rainbow border, beam spin) |
| W28 | Design-system product page | 62 px weight 800 with a gradient keyword; purple-blue accent; dot grid; 433 elements share one 150 ms transition |
| W29 | Component shop, dark with orange | centred 72 px weight 700 title over a large faint logo; install-command chip next to an orange pill button (stock dark launch); testimonial wall |
| W30 | Component shop, light | centred 72 px weight 500, 3 x 3 grid of empty grey cards, 2 s pulse loops |
| W31 | Component library, light | 48 px weight 600; avatar stack, five stars, "120,000+" count; 2 s pulse loops |
| C07 | Agency template, orange portrait | strong move (a face cutting a full-width word) spoiled by invented stat chips ("15M+", "96%") and four headline sizes in one corner |
| C08 | Coffee template, dark brown | coloured keyword in the headline; product cut-outs floating with splash; generic three-card menu |
| W32 | Static AI SaaS mock-up | announcement pill, coloured blur blob, logo strip, 3 + 2 feature cards with line icons, a stat column (500+, 70%, 3x, 98%) |

## Batch-2 notes (measured earlier from recordings; frames not re-checked in this pass)

| Id | Technique | Numbers |
|---|---|---|
| B01 | Monochrome field with a drawn layer | one saturated blue field (~#195FF5), white type and cards, a 35 to 45% tint (~#92B3F7) for 1 px grid and line art; hovering a menu item redraws an isometric line drawing in 300 to 500 ms |
| B02 | Commerce ink | deep brown ink (~#5F280F) for headings and full-bleed bands on cream (~#F8F5F0), yolk yellow only behind ink text, heavy wide display 800 to 900 |
| B03 | Radial picker | chips spiral out of a centre button about 600 ms with a gentle overshoot, settle about 0.7 s; close about 400 ms |
| B04 | Book card fan | layer angle A x 0.7^n (measured 42, 29, 21, 14, 10 degrees), delay 28 ms x n, reverse order on close, two pre-blurred shadows cross-faded |
| B05 | Palette as pairs | approved text-on-ground pairs with contrast ratios (white on violet about 8.9:1, ink on lime about 15:1), one recognition colour, one contrast colour |

## Intake log (rows appended by `scripts/intake.mjs`)

| Date | Reference | Tags | Notes |
|---|---|---|---|
