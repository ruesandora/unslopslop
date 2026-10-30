#!/usr/bin/env node
// Builds the composition boards: 1440 x 900 diagrams re-drawn from the measurements in ../catalog.md.
// They show proportion, layer order and colour share only. No source image, text or shape is reproduced.
// Usage: node inspiration/boards/build.mjs   (writes one .html per board next to this file)
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const SANS = "system-ui, -apple-system, 'Segoe UI', sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";
const MONO = 'ui-monospace, Menlo, monospace';

// share: array of [hex, percent, role]
function swatch(share) {
  return `<div class="sw">${share.map(([c, p, r]) => `<span style="flex:${p};background:${c}" title="${r} ${p}%"><i>${r} ${p}%</i></span>`).join('')}</div>`;
}
function corners(labels, color, bg = 'transparent') {
  const pos = ['top:28px;left:32px', 'top:28px;right:32px', 'bottom:56px;left:32px', 'bottom:56px;right:32px'];
  return labels.map((t, i) => (t ? `<div class="corner" style="${pos[i]};color:${color};background:${bg};padding:2px 4px">${t}</div>` : '')).join('');
}
function page(id, title, refs, body, share, ink = '#111') {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Board ${id}: ${title}</title>
<style>
*{box-sizing:border-box;margin:0}html,body{height:100%}
body{width:100%;min-height:900px;position:relative;overflow:hidden;font-family:${SANS}}
.stage{position:absolute;inset:0 0 36px 0;overflow:hidden}
.corner{position:absolute;font:500 11px/1.4 ${MONO};letter-spacing:.08em;text-transform:uppercase;z-index:9}
.note{position:absolute;font:500 12px/1.4 ${MONO};letter-spacing:.02em;padding:4px 6px;border:1px dashed currentColor;z-index:9}
.sw{position:absolute;left:0;right:0;bottom:0;height:36px;display:flex;font:500 11px/36px ${MONO};z-index:10}
.sw span{position:relative;min-width:2px}.sw i{position:absolute;left:6px;white-space:nowrap;font-style:normal;color:#fff;mix-blend-mode:difference}
.cap{position:absolute;left:0;right:0;border-top:1px dashed ${ink};opacity:.55;z-index:8}
</style></head><body>
<div class="stage">${body}</div>${swatch(share)}
<!-- Board ${id}. References: ${refs}. Composition diagram re-drawn from measurements; not a design to copy. -->
</body></html>`;
}

const boards = {
  'subject-over-type': page('subject-over-type', 'one subject crosses a screen-wide display word', 'C04, C06, C02',
    `<div style="position:absolute;inset:0;background:#0f3a1c"></div>
     <div style="position:absolute;left:36%;top:6%;width:27%;height:90%;border-radius:48% 48% 12% 12%;background:repeating-linear-gradient(135deg,#2f6b3d 0 10px,#245a33 10px 20px);z-index:2"></div>
     <div class="note" style="left:64%;top:22%;color:#dfff4a">SUBJECT · behind the word · 27% of width · z 2</div>
     <div style="position:absolute;left:2.5%;bottom:2%;font:900 440px/0.8 ${SANS};letter-spacing:-.05em;color:#dfff4a;z-index:3;white-space:nowrap;transform:scaleX(.78);transform-origin:left bottom">WORDS</div>
     <div class="cap" style="top:56%"></div><div class="note" style="left:30%;top:51%;color:#dfff4a">cap height 38% of screen · 94% of width · z 3 (in front of subject)</div>
     ${corners(['brand · nav', 'one action', '', ''], '#dfff4a')}
     <div class="corner" style="left:32px;top:47%;color:#dfff4a">small fact · 11 px mono</div><div class="corner" style="right:32px;top:47%;color:#dfff4a">scroll cue</div>`,
    [['#0f3a1c', 63, 'field'], ['#dfff4a', 24, 'type+action'], ['#2f6b3d', 13, 'subject']]),

  'object-and-light': page('object-and-light', 'one object, one light, a serif at 96 px', 'C09, C01, C15',
    `<div style="position:absolute;inset:0;background:#050505"></div>
     <div style="position:absolute;left:58%;top:-10%;width:40%;height:120%;background:conic-gradient(from 200deg at 30% 0%,transparent 0deg,rgba(255,255,255,.10) 18deg,transparent 40deg);z-index:1"></div>
     <div style="position:absolute;left:66%;top:22%;width:300px;height:300px;transform:rotate(18deg);background:linear-gradient(135deg,#3a3a3a,#0d0d0d 70%);box-shadow:-30px 40px 80px rgba(0,0,0,.9);z-index:2"></div>
     <div style="position:absolute;left:50%;top:70%;width:50%;height:2px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);transform:rotate(-6deg);z-index:2"></div>
     <div class="note" style="left:70%;top:62%;color:#bbb">OBJECT · lit from upper left · floor streak</div>
     <div style="position:absolute;left:8%;top:30%;font:400 96px/1 ${SERIF};letter-spacing:-.01em;color:#eee;z-index:3">Display serif<br>at 96 / 96</div>
     <div style="position:absolute;left:8%;top:58%;width:420px;font:400 18px/27px ${SANS};color:#a1a4a5">Body 18 / 27 at 4.9:1 grey. Two actions below, one filled.</div>
     ${corners(['brand', 'nav · one action', '', ''], '#888')}`,
    [['#040404', 92, 'stage'], ['#2a2a2a', 5, 'object'], ['#eeeeee', 3, 'type']], '#eee'),

  'product-on-photo': page('product-on-photo', 'product card laid over a photograph, a second layer crossing its edge', 'C10, C17',
    `<div style="position:absolute;inset:0;background:#fcfdfb"></div>
     <div style="position:absolute;left:6%;top:18%;font:400 86px/0.93 ${SERIF};letter-spacing:-.02em;color:#2b2b2b">Serif display<br>86 / 80, four<br>short lines</div>
     <div style="position:absolute;left:6%;top:66%;font:400 18px/26px ${SANS};color:#333">Two short lines of body, then one filled action.</div>
     <div style="position:absolute;left:53%;top:10%;width:9%;height:70%;background:#c2ce49"></div>
     <div style="position:absolute;left:58%;top:6%;width:40%;height:80%;background:linear-gradient(160deg,#6f8c8a,#c9b79a 55%,#5d4b3a);"></div>
     <div class="note" style="left:59%;top:7%;color:#fff">PHOTO · real place · z 1</div>
     <div style="position:absolute;left:61%;top:14%;width:29%;height:64%;background:#f7f5ef;border-radius:10px;box-shadow:0 1px 2px rgba(0,0,0,.08),0 18px 40px -12px rgba(0,0,0,.35);z-index:2"></div>
     <div class="note" style="left:62%;top:16%;color:#333">PRODUCT CARD · real UI · z 2</div>
     <div style="position:absolute;left:86%;top:46%;width:9%;height:26%;background:#334;border-radius:8px;box-shadow:0 12px 30px -10px rgba(0,0,0,.5);z-index:3"></div>
     <div class="note" style="left:79%;top:74%;color:#333">LAYER 3 crosses the card edge</div>
     ${corners(['brand', 'nav · one action', '', ''], '#555')}`,
    [['#fcfdfb', 70, 'ground'], ['#8a8f80', 18, 'photo'], ['#2b2b2b', 9, 'ink'], ['#c2ce49', 3, 'accent']]),

  'product-panel-hero': page('product-panel-hero', 'the product output fills the hero; weight contrast in the headline', 'C11, C13',
    `<div style="position:absolute;inset:0;background:#1b1b19"></div>
     <div style="position:absolute;left:3%;top:20%;font:780 95px/0.93 ${SANS};letter-spacing:-.034em;color:#f1f0eb">Heavy line<br><span style="font-weight:250">thin line</span><br><span style="font-weight:250">thin line</span><br>Heavy line</div>
     <div style="position:absolute;left:3%;top:72%;width:520px;font:380 22px/32px ${SERIF};color:#b5b4ae">Text serif body 22 / 32.6, three lines.</div>
     <div style="position:absolute;left:42%;top:9%;width:55%;height:86%;border:1px solid #3a3a37;border-radius:3px;background:#20201e;box-shadow:0 2px 12px rgba(0,0,0,.45)">
       <div style="position:absolute;left:24px;top:24px;font:700 34px/1 ${SANS};color:#86e0d2">Panel title</div>
       <svg viewBox="0 0 600 300" style="position:absolute;left:24px;top:90px;width:calc(100% - 48px);height:55%">
         ${Array.from({ length: 28 }, (_, i) => { const a = i * 2.39, r = 40 + (i % 7) * 18; const x = 300 + Math.cos(a) * r * 1.6, y = 150 + Math.sin(a) * r * 0.75; return `<line x1="300" y1="150" x2="${x.toFixed(0)}" y2="${y.toFixed(0)}" stroke="#86e0d2" stroke-opacity=".35"/><circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${2 + (i % 4)}" fill="#d6d5cf"/>`; }).join('')}
         <circle cx="300" cy="150" r="7" fill="#86e0d2"/></svg>
       <div style="position:absolute;left:24px;right:24px;bottom:24px;height:40px;border:1px solid #3a3a37;border-radius:3px"></div></div>
     <div class="note" style="left:43%;top:3%;color:#86e0d2">PRODUCT OUTPUT · 55% of width · real-looking data</div>`,
    [['#1b1b19', 83, 'ground'], ['#363634', 9, 'panel'], ['#f1f0eb', 6, 'type'], ['#86e0d2', 2, 'accent']], '#eee'),

  'pattern-hero': page('pattern-hero', 'a code-drawn 1-bit pattern is the image', 'C12, C16',
    `<div style="position:absolute;inset:0;background:#f6f6f6"></div>
     <div style="position:absolute;left:5%;top:7%;width:45%;height:84%;background:#fff"></div>
     <div style="position:absolute;left:10%;top:36%;font:500 56px/68px ${SANS};letter-spacing:-.01em;color:#000">Grotesk 56 / 68<br>weight 500</div>
     <div style="position:absolute;left:10%;top:62%;padding:12px 18px;background:#fccb04;font:500 16px/1 ${SANS}">one action</div>
     <div style="position:absolute;left:50%;top:7%;width:45%;height:84%;background:#000;
       background-image:repeating-linear-gradient(0deg,#000 0 22px,transparent 22px 34px),repeating-linear-gradient(90deg,#fff 0 40px,#000 40px 64px);"></div>
     <div class="note" style="left:52%;top:9%;color:#fccb04;background:#000">PATTERN · 45% width · black on light</div>`,
    [['#f6f6f6', 74, 'ground'], ['#000000', 21, 'pattern+type'], ['#7a7a7a', 4.6, 'body'], ['#fccb04', 0.4, 'action']]),

  'tracked-serif-calm': page('tracked-serif-calm', 'thin tracked serif, one painted element bleeding off the edge', 'C03',
    `<div style="position:absolute;inset:0;background:#ece9e0"></div>
     <div style="position:absolute;right:-6%;top:-12%;width:38%;height:62%;border-radius:40% 10% 50% 30%;background:radial-gradient(circle at 30% 60%,rgba(38,34,28,.85),rgba(38,34,28,.15) 60%,transparent 70%);filter:blur(2px)"></div>
     <div class="note" style="right:4%;top:46%;color:#26221c">PAINTED ELEMENT · cut by the edge</div>
     ${Array.from({ length: 24 }, (_, i) => `<i style="position:absolute;left:${(i * 37) % 97}%;top:${(i * 53) % 90}%;width:6px;height:4px;border-radius:50%;background:#8f7fb8;opacity:.45"></i>`).join('')}
     <div style="position:absolute;left:0;right:0;top:38%;text-align:center;font:300 150px/1 ${SERIF};letter-spacing:.12em;color:#26221c">SERIF</div>
     <div class="cap" style="top:52%"></div><div class="note" style="left:15%;top:54%;color:#26221c">cap 13% · tracking +0.12 em · 70% width</div>
     <div style="position:absolute;left:0;right:0;top:66%;text-align:center;font:italic 400 16px/1 ${SERIF};color:#555">small italic line</div>
     <div style="position:absolute;left:2%;top:30%;width:16px;font:500 12px/1.6 ${MONO};color:#26221c">V E R T I C A L</div>`,
    [['#ece9e0', 93, 'paper'], ['#26221c', 5, 'ink'], ['#8f7fb8', 2, 'petal']]),

  'portrait-corners': page('portrait-corners', 'full-bleed image, display bottom left, facts in four corners', 'C05, C23',
    `<div style="position:absolute;inset:0;background:linear-gradient(170deg,#e2ebf5,#c3cddb 60%,#9aa6b6)"></div>
     <div style="position:absolute;left:52%;top:0;width:34%;height:100%;border-radius:45% 45% 0 0;background:repeating-linear-gradient(120deg,#b9c3d1 0 14px,#aeb8c6 14px 28px)"></div>
     <div class="note" style="left:53%;top:40%;color:#0b0d12">IMAGE · full bleed · subject right of centre</div>
     <div style="position:absolute;left:2%;bottom:90px;font:800 220px/0.8 ${SANS};letter-spacing:-.06em;color:#0b0d12">Wordmark</div>
     <div class="cap" style="top:63%"></div><div class="note" style="left:2%;top:57%;color:#0b0d12">cap 25% · letters touch</div>
     ${corners(['name', 'cart (0)', 'model · fact', 'drop · season'], '#0b0d12')}`,
    [['#e2ebf5', 53, 'image light'], ['#c3cddb', 30, 'image mid'], ['#0b0d12', 12, 'type'], ['#7b4fd0', 5, 'product colour']]),

  'object-in-landscape': page('object-in-landscape', 'the product object stands in a real place at landscape scale', 'C17, C01',
    `<div style="position:absolute;inset:0;background:linear-gradient(180deg,#e6aa86 0%,#b79688 45%,#885836 70%,#39352c 100%)"></div>
     <div style="position:absolute;left:0;right:0;top:55%;height:20%;background:linear-gradient(170deg,transparent 30%,rgba(57,53,44,.6) 31%,rgba(57,53,44,.9))"></div>
     <div style="position:absolute;left:47%;top:20%;width:8%;height:48%;background:linear-gradient(90deg,rgba(255,255,255,.35),rgba(255,255,255,.1));border:1px solid rgba(255,255,255,.5);backdrop-filter:blur(4px);transform:skewY(-4deg)"></div>
     <div class="note" style="left:56%;top:30%;color:#fff">OBJECT · upright · 8% width · glass</div>
     <div style="position:absolute;left:4%;bottom:12%;font:400 64px/1.02 ${SANS};letter-spacing:-.01em;color:#fff">Two-line headline<br>bottom left</div>
     ${corners(['name', 'nav · watch', 'one-line award or fact', 'short paragraph · pause'], '#fff', 'rgba(20,16,12,.55)')}`,
    [['#b79688', 35, 'sky'], ['#885836', 30, 'land'], ['#39352c', 25, 'shadow'], ['#ffffff', 10, 'type+object']], '#fff'),
};

for (const [name, html] of Object.entries(boards)) writeFileSync(join(here, `${name}.html`), html);
console.log(`wrote ${Object.keys(boards).length} boards to ${here}`);
