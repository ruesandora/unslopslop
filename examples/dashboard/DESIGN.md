# Fluxly dashboard (example direction)

## Overview
Same product and system as the landing example (`../saas-landing/DESIGN.md`), in a working screen. One question per screen: how much is overdue, and is it getting better.
Signature move: the chart is the screen. One large bar chart, the current week in a different colour, everything else is a short table.

## Colors
Same tokens as the landing page, plus rust `#9a3412` for "late" only (text on paper 7:1).

## Typography
Serif headings (Charter stack) at 32 and 20 px, system body at 16 px, table text 15 px, captions 14 px.

## Layout
- Sidebar 240 px, content max 1200 px. Chart takes two thirds, table one third.
- 4 px rhythm: 8, 16, 24, 32.

## Elevation
None. One bordered surface (the chart); the table sits on the page.

## Shapes
Radius 10 px for the chart surface, 6 px for nav rows, 4 px for bar tops.

## Components
- Lead line: the one number that matters, with its comparison base and date (`$4,820 overdue ... against $6,110 on 2 Oct`).
- Table: right-aligned amounts, late days in rust text. No pills.

## Do / Don't
- Do give every number a unit and a comparison. Don't use a greeting as the title, KPI strips, sparklines, glass, glow, emoji or live dots.

## Motion
Colour change on hover 120 ms ease-out. No entrance animation. Reduced motion: no transitions.
