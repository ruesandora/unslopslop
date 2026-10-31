# Card drift

Small image cards drifting at three depths around a clear centre, falling and turning or flying outward from the middle. The field frames the title and the one action instead of covering them.

![Card drift](screenshot.jpg)

Live demo: [`demo.html`](demo.html) (open the file in a browser; "Use your own images" stays local).

| | |
|---|---|
| Group | Image treatment |
| Built with | DOM tiles moved with transform and opacity, one requestAnimationFrame loop |
| Fits | hero of a product whose content is images (saving, generating, collecting), an empty search page |

## How it works

Every card gets a depth of 0.45, 0.7 or 1. Size, speed and opacity follow depth; far cards get a fixed light blur. Start positions come from a golden-ratio scatter so the field is even without looking like a grid. In "fall and turn" cards drift down and swing within the turn range, then re-enter from the top. In "fly outward" a card is born near the centre at opacity 0, grows from 0.6 to 1.3 as it travels and fades out before the edge, which reads as moving toward the viewer. Cards inside the clear ellipse fade to nothing; on narrow screens the ellipse is at least half the width. The pointer shifts each card against its movement, more for near cards.

## Parameters

| Parameter | Range | Default |
|---|---|---|
| Motion | fall and turn / fly outward | fall and turn |
| Cards | 6 to 70 | 44 |
| Speed (px/s, near layer) | 0 to 80 | 26 |
| Turn range (deg) | 0 to 45 | 24 |
| Clear zone | 0 to 0.6 | 0.34 |
| Pointer parallax (px) | 0 to 30 | 8 |
| Palette | linen / night / clay | linen |

## Performance

- Cost: one composited layer per card; transform and opacity only. Up to about 60 cards is cheap. Blur is static.
- Mobile and fallback: cards scale to 62 percent under 600 px. Without script the centre content shows on the plain ground.
- Motion: continuous but slow (20 to 30 px per second). Pauses off screen and in hidden tabs; reduced motion places the cards once.

## When to use

The product is about images, and the cards can be its own content: saved items, generated pictures, the user's library. The centre carries one headline and one input.

## When it becomes slop

The cards are random stock photos with no link to the product, the field also runs behind every later section, or cards cross the title. Two moving fields on one page is one too many.
