# Domain packs

The core skill reads the request, picks one pack, and loads its README. A pack says what good looks like in the medium, the workflow steps that differ, its slop signs and craft signals, the deliverables, and which checks the detector can run.

| Pack | Status | Detector coverage |
|---|---|---|
| `web` | ready | full |
| `dashboard` | ready | full (app screens judged on density) |
| `mobile` | early | mobile web at 390 px |
| `email` | early | HTML checks; client rendering not simulated |
| `logo-brand` | early | manual (SVG, one colour, 16 px) |
| `motion` | early | motion rules, craft motion, `motion-probe.mjs` |
| `social` | early | HTML checks per slide |

Combine with a style pack when a style is asked for: the style decides the look, the domain decides the constraints.
