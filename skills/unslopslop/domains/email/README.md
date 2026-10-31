# Domain: Email (newsletters and transactional)

Status: **early**. Content is thin; extend it as references arrive.

## What good looks like
- 600 px wide single column (up to 640), tables for layout, inline styles, system font stack with a web font only as progressive enhancement.
- Reads with images off: every image has alt text, the message survives without them; no text baked into images.
- Dark mode: test that logos and dark text survive inversion; avoid pure black on pure white pairs that clients invert badly.
- One action per email, a real button (bulletproof table button), plain-text version.

## Workflow specifics
1. Brief plus the one action and the one sentence the reader must take away.
2. Build with tables, inline styles; test at 600 and 375.
3. Run `detect.mjs` on the HTML (slop and craft still apply to the visible design), then check images-off by disabling images.

## Medium-specific slop signs
Gradient hero banner image with all the text inside it, three-column feature grid that collapses badly, "Hey there!" openers, five buttons, emoji subject lines.

## Craft signals
Strong typographic hierarchy without images, one well-chosen image with alt text, a colour combination that survives dark mode.

## Deliverables
`email.html` (inlined), plain-text version, screenshots at 600 and 375, images-off screenshot.

## Checks the detector runs
Web checks on the HTML. Email-client rendering is not simulated; say so in the report.
