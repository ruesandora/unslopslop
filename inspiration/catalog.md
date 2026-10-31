# Inspiration catalogue

The catalogue holds 46 measured entries (C01 to C31, W18, W19, W26 to W38) plus 5 short notes from an earlier batch (B01 to B05). Measured references, written without names, links or copied material. Every number below was measured by us on 30 October 2026 (entries C24 to C31 and W33 to W38 on 31 October 2026) (computed styles in a 1440 x 900 headless browser, palette shares from the first-screen pixels, motion from declared animations or frame differences). Values read from screen recordings are scaled to a 1440 x 900 frame and are approximate (about ±10%). Hex values are measurements, not palettes to reuse.

**How to use it.** Before building, pick 2 or 3 entries whose tags match the brief (the gold ones first) and write their ids in the brief's `References:` line with what you take from each. Open the matching composition board in `boards/` and put your first screen next to it with `scripts/compare.mjs`. Check your page against the measured ranges in `skills/unslopslop/references/craft-recipes.md`. Never copy a shape, subject, wording or palette; take the proportion, the layer order, the timing.

**Roles.** `role:gold` is the bar to beat. `role:useful` has one technique worth taking. `role:counter` is a measured example of what not to ship; it is listed because its numbers make good calibration.

## Batch 2026-10-30: what repeated

1. **Scale is the difference.** Type-led gold heroes set the display line at 86 to 104 px on product pages (cap height 6.7 to 8% of the screen) and about 115 to 440 px on poster-like pages (9 to 38%). The component-shop and template-landing pages sit at 48 to 88 px, most at 48 to 72 (3.7 to 5.6%). Size alone does not save a page (counter W26 uses 88 px, W18 uses 104 px), but no gold hero is small and text-only.
2. **One subject, and it touches the type.** 5 of the 8 cinematic heroes put a single real subject (object, character, face, product UI) across or behind the display line with a deliberate z-order. None used a blurred orb.
3. **Two big colours, one small one.** Unless the first screen is a full-bleed photograph, gold first screens are carried by one ground at 55 to 97% of pixels and an accent under 3%, or by two fields that split about 60/25. Accent on a headline keyword appeared only in counter examples.
4. **The frame is designed.** Gold heroes put 9 to 13 px uppercase labels (often mono, tracked) in two to four corners of the screen; the middle stays for subject and display type.
5. **Depth comes from light and overlap, not from card shadows.** One light source on a dark stage, a product card laid over a photograph, a layer that crosses the edge of another. Box shadows, where present, use negative spread or a 1 px inset line.

Technique to try next: a hero where the display line is set at 20%+ of screen height and one subject crosses it, on a two-colour field, with corner labels; compare against board `subject-over-type`.

## Batch 2026-10-31: what repeated

1. **Brand books are one skeleton, repeated.** Both gold brand books keep one slide frame (title, rule, text column, specimen area, tagline, footer row) and change only the specimen. The system shows through repetition, not through decoration.
2. **A signature shape or light does three jobs.** One shape (a disc with an off-centre core) or one image (a folded light sheet) is the logo crop, the pattern, the photo frame and the cover. Colour is given as approved text-on-ground pairs with contrast ratios.
3. **Image products show their content in the first screen.** The strongest collecting and saving products put dozens of small real items around a clear centre (drifting cards, tiles inside the headline). The weakest show a dark gradient and a pill.
4. **Delight is small and specific.** A logo that changes costume on hover, an indicator that stretches before it settles, icons that move their own lines. Each has written timings (160 to 620 ms) and overshoot only on small elements.
5. **Pale halves and ticking clocks are the new tells.** Headings whose second half is pale grey, and countdown bars over launch pages, repeated across template and library sites.

Technique to try next: a dark cover with one folded light sheet (effect `light-ribbon`) and the brand-deck slide skeleton (board `brand-deck-slide`) for a product's docs or pitch.

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

### C24 · Brand book on a navy slide, folded light on the cover
- Tags: domain:logo-brand, social · style:none · mood:calm, exact, luminous · palette:void+navy+cobalt+flare+ice+paper · motion:none · type:grotesk+italic-serif+mono · role:gold
- Measured (one 2048 x 1824 image, six slides): page #060709; slides about 920 x 518 (16:9) on a vertical gradient #2C3D68 to #1F2638 to #111521; inner panel #111521 with a 1 px line, radius about 12. Palette written on the slide: paper #F3F2EF, navy #0A1640, cobalt #285CFF, ice #C4D7FF, flare #FF5436, with roles (paper and navy grounds, cobalt the signature, flare the spark used sparingly, ice for charts and quiet moments, AA contrast). Each colour is a vertical bar that continues above and below in three translucent steps over the slide (a tint ladder). Type spec: headline medium 68/22 px, tracking -3% / -0.5%, line height 100% / 150%; a grotesk, an italic serif for statements, a mono for numbers.
- Layers: cover = a folded sheet of cobalt, flare and ice light crossing a black void, with grain; title about 130 px in two tight lines bottom left; three small mono labels across the top (document, volume, date) and one action bottom right.
- Signature: every slide has the same skeleton (title, hairline, text column 22%, specimen panel with corner brackets, one italic serif line bottom left, footer of mark, document, section, page number).
- Steal as a principle: one cover image that is also the logo backdrop and the section band; colour roles written next to the swatches; a fixed slide skeleton. Built here as effect `light-ribbon` and board `brand-deck-slide`.
- Do not take: the mark, the palette, the wording.

### C25 · Signature shape with three jobs (food brand book)
- Tags: domain:logo-brand, social, motion · style:pantry-bold, pop-ritual · mood:playful, sunny, confident · palette:violet+pink+lime+yolk+white+ink · motion:brand-film · type:grotesk-bold · role:gold
- Measured (9.5 s film, 60 fps, scaled frames): violet #4B1ACF, pink #F45DD1, lime #BAFF39, yolk #FFD21C, white, ink #161515. Pairs given with ratios: white on violet 8.94:1, ink on lime 15.17:1; white on pink marked low contrast, small text in ink. One grotesk, bold 700 for headlines, regular 400 for copy; display tracking -0.035 to -0.050 em, copy -0.010 to -0.020 em. Clear space x = half the lowercase o height; smallest digital size 120 px wide. Shape: white disc 1.00 D with a yolk core 0.44 D, off centre.
- Layers: tactic tiles (flat shape for recognition, photo inside the shape for appetite, a 2 x 3 grid for product count); scale-and-crop row (complete mark, large crop, small concept); a five-template social set ("type, colour and geometry keep the family; content decides which element leads"); formats 1080 x 1350 and 1080 x 1920.
- Motion: the first round letter of the wordmark becomes a window; about ten photos flick through it at about 200 ms each (12 frames), it lands on the hero photo, then the line arrives word by word about 300 ms apart and a picture pill pops between two words.
- Steal as a principle: give one shape several jobs and write the rules down; let a letter of the mark be the frame for real use moments. Built here as recipe `letter-window` and board `signature-shape-system`.
- Do not take: the shape, the name, the colours together.

### C26 · Image collector with a drifting card field
- Tags: domain:web · style:none · mood:curious, light, calm · palette:warm-white+ink · motion:ambient-slow, micro-only · type:grotesk-custom · role:gold
- Measured: ground #F7F5F3 68%, ink about #0A0A0A. One custom grotesk at 400, 500 and 700. Display 72/72 px weight 700, tracking -2.88 px (-4%); section titles 48 px weight 500, -1.92 px; card titles 26 px. Radii 16, 12, 8 and 999. Almost no shadows; backdrop blur only on the top bar.
- Layers: a single canvas draws 40+ small photo cards at three depths around the hero (far ones small and pale), drifting down and turning slowly; the centre (headline, search, one action) stays clear; two 68 px picture tiles sit inside the headline at ±6 degrees; the headline's last noun rotates. A brand index below: 72 px rows in light grey, the pointed row turns ink and a 64 px picture opens beside it. A text shimmer (mask position 100 to 0%, 1.3 s linear) marks pending states.
- Signature: the product's own content is the hero's texture.
- Steal as a principle: for products about images, show many small real items around a clear centre; set two pictures inside the headline line. Built here as effect `card-drift`, effect `text-shimmer`, recipe `index-reveal` and board `inline-image-headline`.
- Do not take: the photos, the brand list, the wording.

### C27 · Architecture studio, putty ground and a 160 px display
- Tags: domain:web · style:swiss-international, japanese-minimal · mood:quiet, exact, gallery · palette:putty+ink+white · motion:none · type:grotesk-light+mono-caps · role:useful
- Measured: ground #F2F1EE 56%, ink #191919, white panels. Display 160/144 px weight 400, tracking -6 px (-3.75%), two lines flush left 20 px from the edge. Beside it a mono paragraph in capitals at about 11 px, grey about 6:1. Services as rows inside a white panel: bullet, 62 px name, mono description, small action. Hero photo starts at about 40% of the width and bleeds right. Transitions only (0.6 s ease, 0.3 s); no animation. Tells: a section title with its second word in pale grey (#A6A5A2 on putty, about 2.2:1), demo figures ("230 projects completed") and a repeated FAQ question.
- Steal as a principle: one very large, light, tightly tracked display plus one small mono column is a complete type system. Board `giant-tight-display`.

### C28 · Network for collecting, hero written as a definition
- Tags: domain:web · style:editorial-serif, data-dense · mood:plain, honest, slow · palette:white+graphite+navy · motion:ambient-slow · type:grotesk-single-size · role:gold
- Measured: white 77%, text #333, one navy #00025B for the button. One size, 19.2 px, weights 400 and 700, for everything including the hero. The hero is a short ordered list: "Name is / a. one sentence / b. another / c. +" with the "+" inviting the visitor's own line; then a real age in bold ("15 years and 83 days"), counted, not claimed. Product screens with real collected items; slow 48 to 60 s loops.
- Signature: no display type at all; the hierarchy is the list.
- Steal as a principle: a quiet product can lead with a definition list and one real number that is a fact (an age, a date), never a boast.

### C29 · Interaction library, a mark with a hidden turn
- Tags: domain:web, motion · style:none · mood:playful, exact · palette:white+ink+one-seasonal-colour · motion:micro-only · type:grotesk · role:useful
- Measured: hover on the logo turns it into a seasonal character part by part: body fill changes, ribs fade to 0.55, a stem scales from 0.2 (overshoot to 1.06), eyes move up 9 px and turn ±14 degrees, a grin scales from 0.4 with a 60 ms delay, colours flicker on a 1.6 s step-end loop; the swap pops in 360 ms cubic-bezier(.34, 1.56, .5, 1). Eyes follow the pointer (180 ms ease-out) and blink (80 ms). A hero pill rolls between two lines every 3 s and resizes. Segment indicator: stretch 190 ms cubic-bezier(.32, .72, .24, 1), settle 420 ms cubic-bezier(.28, 1.28, .36, 1). Hero entrance 620 ms cubic-bezier(.22, 1, .36, 1) with 0/60/220/380 ms stagger. Components are filed by verb: hover, press, drag, slide, swipe, type, select, loading.
- Steal as a principle: small delights with written timings, and a library filed by what the user does. Built here as recipes `mark-turn`, `rolling-pill` and `stretch-settle`. Tell: a live sign-up count in the pill; only show it if the number is real.

### C30 · Product film told by typed commands
- Tags: domain:motion, social · style:none · mood:capable, calm, technical · palette:light-grey+charcoal+one-blue · motion:product-film · type:grotesk+mono · role:useful
- Measured (54.9 s, 1080 x 1350, 60 fps): light grey ground scenes alternate with a dark terminal. Terminal lines arrive about every 400 ms, dim first, then full tone; the last line in green. A title darkens word by word from pale grey to ink. Each scene: a white label pill with a blue dot above a dark app window that slides in with a slight 3D turn; a dark command chip sits half over the window's bottom edge and types at about 40 to 45 characters per second with a blue block cursor; the result appears in the window. An orbit diagram puts "your agent" in the centre with tools around it.
- Steal as a principle: let real requests carry a product film; one chip, one window, one result per beat. Built here as recipe `prompt-reel` and board `window-and-chip`.

### C31 · Tool-first component library with a reactive dot field
- Tags: domain:web, dashboard · style:data-dense · mood:exact, quiet · palette:white+ink+one-accent · motion:micro-only · type:grotesk+mono · role:useful
- Measured: left index (free, generative, agents), live preview in the middle, prop table on the right, code tabs below (component, styles, prompt). Morphing icons: spring about 500 ms with no bounce, two-step morphs 620 ms cubic-bezier(.65, 0, .35, 1), blink about 450 ms. Halftone field: 6 px cells, a pointer lens of 64 px radius that grows dots by 0.55 and pushes them 4.5 px on springs (stiffness 1600, damping 68), a click ripple at 0.75 px per ms, 30 px wide, 400 ms life; faint dots on empty paper. Streaming text: newest words in the accent, settling to ink.
- Steal as a principle: show the component working, its props and its code on one screen. Built here as effect `dot-lens` and recipes `morph-icons` and `streaming-tail`.

## Useful, with tells

### W18 · 3D image orbit tool
- Tags: domain:web · style:none · mood:technical · palette:light-grey+ink+blue · motion:one-demo · type:grotesk-heavy · role:useful
- Measured: #F4F4F4 91%. Display 104/102 px weight 700, tracking -5.72 px (-5.5%); h2 64 px -2.88 px. Body 20/31 px #5F5F68. Cards: shadow 0 14px 30px -18px rgba(0,0,0,.45) (negative spread darkens the floor, not the edge). Headline lines rise in 900 ms. 23 live canvases (orbiting image rings).
- Steal: the negative-spread shadow; the live 3D demo as the product proof. Tells: highlighted keyword, beta pill.

### W19 · Directory with palette dots
- Tags: domain:web · palette:warm-paper+ink+orange · role:useful
- Measured: #F8F7F4 85%; display 60/60 px weight 700, -1.5 px; 3 columns, 32 px gaps, 24 px radius cards. Under each thumbnail, four dots show that page's palette.
- Steal: show a palette as dots beside the thing it belongs to (useful in reports).

### W33 · Manifesto in a large serif, pastel tag chips
- Tags: domain:web · style:editorial-serif · mood:warm, personal · palette:white+slate-ink+orange · motion:scroll-story · type:serif-display+grotesk · role:useful
- Measured: serif display 140/119 px, tracking -8.4 px (-6%), two lines. Inline tag chips inside a sentence, each its own pastel (orange #E98F53, pink #E48ABF, blue #99D2FB, coral #EA726B, yellow #FFCF27): text colour equals the 1 px border, radius 36, padding 4/18, 18 px. Manifesto 42 px serif with the first word at 84 px italic; a "NO ..." list with the "NO" in orange over a warm gradient band. Transitions 0.5 to 0.7 s cubic-bezier(.165, .84, .44, 1).
- Steal: a manifesto set large in one serif, one italic drop word. Tells: pastel chip text fails contrast (blue on white about 1.7:1); rainbow chips.

### W34 · Saving app, icons inside the headline
- Tags: domain:web · style:none · mood:light, curated · palette:white+ink · motion:micro-only · type:grotesk-custom · role:useful
- Measured: display 95.8 px weight 500, tracking -3.35 px (-3.5%), three small app-icon pictures set inside the headline lines; masonry of saved images; entrance 1 s cubic-bezier(.16, 1, .3, 1), image swap 300 ms. Tell: a two-clause heading with the second clause in #A3A3A3 (about 2.5:1), now caught by `color-faded-heading-part`.

### W35 · Board tool, slate hero and the real board
- Tags: domain:web · style:none · mood:practical · palette:slate+white+orange · motion:none · type:serif-heading+grotesk · role:useful
- Measured: slate hero band (about #2F3542) with a serif heading and one orange action; the real board screenshot fills the lower half and is cut by a diagonal edge into white. Sections: short rule, serif title, one line, real screen.
- Steal: a diagonal cut that hands the product screen from the dark band to the page.

### W36 · Navigation gallery and its taxonomy
- Tags: domain:web · style:none · mood:neutral · palette:near-black+white · motion:none · type:grotesk · role:useful
- Measured: #111111 ground; a left index of navigation types (static, dropdown, mega menu, side bar, search bar, announcement, full screen, breadcrumbs) over a grid of real site captures.
- Steal: choose the navigation type by the job (see `skills/unslopslop/domains/web/README.md`, "Navigation by job").

## Counter examples (measured, for calibration)

| Id | What it is | Measured tells |
|---|---|---|
| W26 | Template shop's own landing page (dark) | 88 px display weight 800 with the last word in a gradient; mono eyebrow pill; avatar stack with a "13,500+" count; re-measured 31 Oct: a top bar with a price and a ticking "hh:mm:ss left" countdown next to a claim button (now `detail-urgency-timer`); `transition: all` on 126 elements; blur 64 px blob behind the hero; brown-blue orb gradient over 60% of the first screen |
| W27 | Component shop, dark | 60 px weight 500 with two highlighted keywords (`mark`); 45 degree stripe texture on 52 elements; infinite 3 to 32 s loops (rainbow border, beam spin) |
| W28 | Design-system product page | 62 px weight 800 with a gradient keyword; purple-blue accent; dot grid; 433 elements share one 150 ms transition |
| W29 | Component shop, dark with orange | centred 72 px weight 700 title over a large faint logo; install-command chip next to an orange pill button (stock dark launch); testimonial wall |
| W30 | Component shop, light | centred 72 px weight 500, 3 x 3 grid of empty grey cards, 2 s pulse loops |
| W31 | Component library, light | 48 px weight 600; avatar stack, five stars, "120,000+" count; 2 s pulse loops |
| C07 | Agency template, orange portrait | strong move (a face cutting a full-width word) spoiled by invented stat chips ("15M+", "96%") and four headline sizes in one corner |
| C08 | Coffee template, dark brown | coloured keyword in the headline; product cut-outs floating with splash; generic three-card menu |
| W32 | Static AI SaaS mock-up | announcement pill, coloured blur blob, logo strip, 3 + 2 feature cards with line icons, a stat column (500+, 70%, 3x, 98%) |
| W37 | Asset manager, dark launch | centred pill badge above a two-line gradient-filled headline, centred grey paragraph, one blue button, logo strip; the real app screen is good but sits under a stock dark launch |
| W38 | Image prompt gallery | light ground, 48 px weight 300 centred line that swaps sentences letter by letter, small cards flying outward from the centre (a good motion) with a live "Backed by Your Sponsor Here" placeholder above the headline |

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
