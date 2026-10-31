# AI-default fonts

The faces agents pick by reflex. Each one is a fine typeface; the problem is that it arrives without a reason, on every page, so pages stop sounding like their project. The detector rule `type-ai-default-font` flags them on body text, the h1, the h2 and the largest text on the page.

**Keeping one on purpose.** If the project really calls for a listed face (the client owns it, it is their house face, it solves a measured problem), write the reason in the direction brief and in the page:

```html
<meta name="unslop-brief" content="font: Fraunces, the client sets every printed menu in it and the site must match">
```

The reason must be a real sentence about this project. "Looks premium" is not a reason.

**How to choose instead.** Start from the brief's three mood words and the content: what must the type do (numbers in tables, long reading, a loud poster line, small labels on a phone)? Pick a face with a free licence that serves that job, try it with the real headline at real size, and compare two candidates side by side. Record the choice and the reason in DESIGN.md.

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
