# Style: editorial serif

Status: **growing** (first full pass, from measured references W33, C03, C09 and C28).

## Defining traits
- A display serif set large (100 to 140 px on desktop) with tight tracking (-3 to -6%), usually in two lines; a quiet text face for body.
- Magazine rhythm: a manifesto or long paragraph set at 36 to 44 px in the serif, wide margins, one italic word used as a drop word or for emphasis at about twice the paragraph size.
- One warm accent used for meaning (a "no" list, a single link colour), never for decoration.
- Pictures with real captions (who, where, when) or none; pull quotes from real people with names.

## When it fits
Personal tools, publishing, culture, food and hospitality, slow consumer products, essays and manifestos, annual letters.

## Palette combinations (our method, see `../../references/palette-combinations.md`)
- White, slate ink and orange: white 80%, slate ink (about #3A475A) 15%, orange under 3% for the action and one emphasis.
- Paper and black: warm paper (about #F4F0E8) 85%, ink 12%, one oxblood or green for links.
- Rice paper and ink: paper about #ECE9E0 90%+, ink, one natural colour in an illustration only.

## Type
- One display serif with a true italic, one text face (serif or grotesk). Check both against `../../references/ai-default-fonts.md`; a default serif needs a written reason.
- Drop word: the first word of the manifesto in italic at about 2x the paragraph size, aligned to the first line's cap height.
- Body 17 to 21 px, line height 1.5 to 1.6, measure 60 to 72 characters.

## Build notes
- Let the manifesto be the section: no cards, no icons; one column, generous margins.
- A short list of promises can carry the accent on its first word ("No ads", "No tracking"), set in the serif at the paragraph size.
- Tag words inside a sentence may be outlined chips, but in one colour that passes contrast (4.5:1 for text under 24 px), not a rainbow of pastels.
- Motion: slow fades of 500 to 700 ms with a long ease-out (for example cubic-bezier(.165, .84, .44, 1)); the scroll story can pin the manifesto while words darken.

## Do / don't
- Do: write real sentences; editorial style fails with placeholder copy faster than any other.
- Do: pair the serif with real photographs or one illustration, not with stock icons.
- Don't: a default serif in a grey subtitle under every heading (`type-heading-muted-subtitle`, `bland-default-serif`).
- Don't: pastel chips whose text fails contrast; rainbow tags.
- Don't: italicise whole headlines; keep the italic for one word or one line.

## Its slop versions (detectable signs)
- Centred serif headline, grey sans paragraph, two buttons, the template rhythm repeated per section (`type-heading-muted-subtitle`).
- Serif display under 64 px with nothing else on the first screen (`bland-timid-display`, `bland-no-hero-visual`).
- Coloured keyword in the headline (`type-accent-keyword`).

## Tools (techniques)
Optical size and italic axes where the font has them; hanging punctuation for quotes; `text-wrap: pretty` for paragraphs and `balance` for two-line headlines; a scroll-linked tone change (pale to ink) for a manifesto, frozen under reduced motion.
