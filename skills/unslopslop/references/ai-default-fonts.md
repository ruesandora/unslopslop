# AI-default fonts

The faces agents pick by reflex. Each one is a fine typeface; the problem is that it arrives without a reason, on every page, so pages stop sounding like their project. The detector rule `type-ai-default-font` flags them on body text, the h1, the h2 and the largest text on the page.

**Keeping one on purpose.** If the project really calls for a listed face (the client owns it, it is their house face, it solves a measured problem), write the reason in the direction brief and in the page:

```html
<meta name="unslop-brief" content="font: Fraunces, the client sets every printed menu in it and the site must match">
```

The reason must be a real sentence about this project. "Looks premium" is not a reason.

**How to choose instead.** Use the type library in `../type/` (gallery `../type/index.html`, procedure `../type/README.md`). Start from the brief's three mood words and the job the type must do (numbers in tables, long reading, a loud poster line, small labels on a phone, a child learning to read), shortlist 2 or 3 recipes, try them with the real headline at real size at 1440 and 390, and pick one. Write the recipe id and the reason in the brief's `Type:` line and in DESIGN.md. If no recipe fits, build a new one with the same fields.

**The house default is slop too.** Avoiding the faces below is not enough. Our own pages fell into one move: a wide grotesk display, a plain sans body, a giant headline and a heavy/thin weight contrast inside it, on every project. That is a default as much as any listed font. Hierarchy can come from many places (an italic swap, a width axis, small caps, position on a grid, a second tone, a mask, a sign layer); the library has recipes for each, several with no large type at all.

**Do not repeat the last project.** Pairings already shipped by this repo are listed in `../scripts/lib/used-type.mjs`; the rule `type-house-pairing` flags a page whose h1 and body faces repeat one. Add your pairing there after you ship, so the next project is steered away from it. The same `font:` brief line keeps a pairing on purpose.

**Also slop:** giant display numbers (`type-hero-number`): a figure set alone at display size, such as "€18,460" or "99.9%". Put numbers in sentences with their comparison, or chart them.

## Display faces (headlines)
- Gloock
- Instrument Serif
- Fraunces
- Newsreader
- Dm Serif Display
- Dm Serif Text
- Playfair Display
- Playfair
- Cormorant
- Cormorant Garamond
- Young Serif
- Bricolage Grotesque
- Clash Display
- Cabinet Grotesk
- Syne
- Unbounded

## Text faces
- Inter
- Inter Tight
- Inter Display
- Geist
- Roboto
- Open Sans
- Poppins
- Dm Sans
- Space Grotesk
- Outfit
- Plus Jakarta Sans
- Manrope
- Figtree
- Instrument Sans
- Satoshi
- General Sans
- Montserrat
- Lato
- Nunito
- Urbanist
- Sora

## Monospace
- Geist Mono
- Jetbrains Mono
- Space Mono
- Ibm Plex Mono
- Dm Mono
- Fira Code
- Roboto Mono

## Maintaining this list
Add a face when it shows up by default in three or more unrelated generated pages. Update `scripts/lib/ai-default-fonts.mjs` and this file together (a test checks they agree).
