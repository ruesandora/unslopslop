# Independent review (mandatory before anything is shown)

The builder cannot be the judge: after hours on a page it no longer sees the captions it added everywhere, the font it always picks, or the grey it uses for "quiet" text. So before a design is shown to the user, a **different agent with fresh context** reviews it. The builder fixes every blocker, the reviewer checks again. Three rounds at most; whatever is still open goes into the report as open.

## What the builder hands over
1. The page (file path or URL) and the direction brief.
2. Detector output: `node scripts/detect.mjs <page> --out <dir>` (report.md, desktop.png, mobile.png).
3. Zoomed crops made with `node scripts/review-crops.mjs <page> --out <dir>/crops` (headings, captions, numbers, cards, badges and stamps, emoji, the lowest-contrast texts, first screen at 1440 and 390).
4. The strongest reference screenshot, if one was used.

The builder does not explain or defend the design in the handover. Only facts: what the product is, who it is for, which files to look at.

## Reviewer prompt (copy, fill the paths, give to a separate agent)

```
You are an independent design reviewer. You did not build this page and you owe the builder nothing.
Project: <one sentence from the brief>. Audience: <who>. Medium: <web page / app screen / email / ...>.
Files: page <path>; detector report <dir>/report.md; screenshots <dir>/desktop.png, <dir>/mobile.png;
crops <dir>/crops/*.png; reference <path or "none">.

Open every image yourself before writing anything. Then answer, in this order:

1. First impression in two sentences: what would a picky senior designer say in the first five seconds?
2. Checklist. For each line answer yes / no and cite the crop or screenshot you looked at:
   a. Fonts: is any heading, body or number face on the AI-default list (references/ai-default-fonts.md) without a project reason?
   b. Numbers: is any figure set alone at display size?
   c. Captions: is there a small grey line under several blocks or visuals? Is the "example data" note repeated?
   d. Props: paper, letter, receipt, notebook or newsprint cards used as decoration? Ruled-paper backgrounds?
   e. Stamps and stickers: rotated badges, rubber stamps, tilted cards?
   f. Emoji anywhere, unless the brief says the user asked for them?
   g. Side stripes: a coloured bar on the left or right edge of a box, alert, row or notice?
   h. Faded text: any readable text below 7:1 (4.5:1 from 24 px)?
   i. Section openings: heading + grey subtitle paragraph repeated section after section?
   j. Slop patterns from the detector report: list every finding that is still there.
   k. Bland: is anything missing that a strong studio would add here (a real visual, depth, texture, a motion moment, a clear focal point)?
   l. Mobile (390 px): overflow, overlap, tap targets, text that became tiny or grey.
3. AI tells found: a numbered list, each with where it is (selector or crop) and why it reads as generated.
4. Blockers: the items that must change before the user sees this. Be specific ("remove the caption under the chart", not "reduce captions").
5. Verdict: "A top studio would ship this" or "A top studio would not ship this", and one sentence why.
```

## Rubric for the verdict
- **Ship:** detector slop clean, craft 70 or more, no checklist item a to i answered "yes", no blocker.
- **Do not ship:** any blocker, or any "yes" in a to i, or the first impression names something generic.

## Rounds
1. Reviewer writes the review to `<dir>/review-<n>.md`.
2. Builder fixes the blockers only (no new ideas mid-review), re-runs the detector and the crops.
3. Reviewer re-checks the same checklist against the new files. Stop at "ship" or after round 3; then report the remaining blockers honestly.

## Running a separate reviewer
Any second agent session works if it starts without the builder's context (a new chat, a subagent with only the prompt above, or a headless CLI run). Give it read access to the files and nothing else. Use the strongest model available for this step.
