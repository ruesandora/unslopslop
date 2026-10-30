# Scanlines

Dark horizontal lines at a fixed pitch, an optional red-green-blue stripe mask and a slow rolling band, like a tube screen or a video still.

![Scanlines](screenshot.jpg)

Live demo: [`demo.html`](demo.html) (open the file in a browser; sliders change it live; "Your image" stays local).

| | |
|---|---|
| Group | Print and retro |
| Built with | WebGL 1 fragment shader (one pass) on the shared runtime |
| Fits | video and broadcast brands, a retro section, a still from a stream |

## How it works

Horizontal lines at a fixed pitch in CSS pixels darken the image; a three-column mask tints alternate pixel columns red, green and blue; a soft horizontal bleed mixes in neighbours; a bright band rolls slowly down.

## Parameters

| Parameter | Range | Default |
|---|---|---|
| Line pitch (px) | 2 to 12 | 5 |
| Line strength | 0 to 1 | 0.65 |
| RGB stripe mask | 0 to 1 | 0.2 |
| Rolling band | 0 to 1 | 0.3 |
| Bleed | 0 to 1 | 0.3 |
| Grain | 0 to 0.3 | 0.06 |

## Performance

- Cost: One texture read per pixel. Cheap. The roll is the only motion; switch it off for a still.
- Mobile and fallback: No WebGL: the CSS gradient. A repeating-linear-gradient of 1 px dark lines every 3 px is the CSS version and is often enough.
- Motion: Rolling band at 30 fps; still frame under reduced motion.

## When to use

The content is video, broadcast or a screen, and the brief accepts a retro reference.

## When it becomes slop

On body text, or as a nostalgia filter with no reason in the brief. Lines finer than 2 px moire on phones.
