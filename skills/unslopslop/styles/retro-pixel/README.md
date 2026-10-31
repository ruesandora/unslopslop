# Style: retro pixel

Status: **ready** (first full style pack).

## Defining traits
- A fixed pixel grid: every size and offset is a multiple of the pixel unit (4, 8 or 16 px at 1x; integer scaling only).
- A limited palette of 4 to 32 colours, used as a combination with roles (ground, ink, two mid tones, one highlight).
- Dithering instead of gradients: ordered (Bayer 4x4 or 8x8) for flat, predictable texture; error diffusion (Floyd-Steinberg) for photos.
- Hard 1 px edges, no anti-aliasing on art, flat offset shadows (one or two pixel units, no blur).
- Bitmap type for headings, labels and numbers only; body text stays in a readable text face.

## When it fits
Games and game tools, indie software, music and club culture, playful developer tools, nostalgia campaigns, kids' learning apps with large type. Combine with a domain pack: `retro-pixel + mobile` (big pixel buttons in thumb reach), `retro-pixel + web` (pixel hero art, text-face body), `retro-pixel + social` (posters).

Poor fit: medical, legal, finance forms, long reading pages.

## Palette combinations (our method, see `../../references/palette-combinations.md`)
| Mood | Set (role, share) |
|---|---|
| Handheld green | deep moss ground 60%, olive 20%, pale lime ink 15%, near-black outline 5% |
| Arcade night | ink blue ground 65%, bone text 20%, hot coral highlight 5%, teal mid 10% |
| Paper console | warm grey ground 60%, charcoal ink 25%, tomato action 5%, mustard mid 10% |

## Type (free licences)
Bitmap faces released under the SIL Open Font License are available on the major free font services (for example Press Start 2P, VT323, Silkscreen, Pixelify Sans). Check the licence file that ships with the font before bundling. Pair with a plain text face for paragraphs. Set bitmap faces at integer multiples of their design size.

## Build notes
- CSS: `image-rendering: pixelated` on scaled art; scale by integers only (2x, 3x, 4x).
- Draw art on a small canvas (for example 160 x 90) and scale it up with CSS; never resample with smoothing.
- Scanlines, if any: a repeating 1 px line at under 10% opacity, one zone only.
- Motion: step easing (`steps(n)`) for sprites, 8 to 12 fps for character animation; UI state changes stay instant or 120 ms. Reduced motion: still frames.

## Do / don't
- Do keep one pixel unit across the page. Don't mix 2 px and 3 px pixels.
- Do dither for tone. Don't put pixel text over soft blurred gradients.
- Do keep body copy in a text face. Don't set paragraphs in a bitmap font.
- Do use one highlight colour. Don't paint everything neon synthwave.

## Its slop versions (detectable signs)
- Pixel text over blur or smooth gradients (mixed rendering).
- Neon synthwave grid sunset on every section.
- Heavy CRT warp, flicker or chromatic aberration that hurts legibility (and fails reduced motion).
- Mixed pixel sizes on one screen.
- The same bitmap display face on every heading, including long ones.
- Long paragraphs in a bitmap face (detectable: `type-small-text`, low readability).

## Tools (techniques, no specific products)
A pixel-art editor with layers and palette locking, an online ordered/error-diffusion dither tool, a palette library (check each palette's licence), a halftone tool for print-style tone.
