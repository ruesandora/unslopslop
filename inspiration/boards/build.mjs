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
  'brand-deck-slide': page('brand-deck-slide', 'one slide skeleton repeated through a brand book', 'C24',
    `<div style="position:absolute;inset:0;background:#060709"></div>
     <div style="position:absolute;left:5%;top:7%;width:90%;height:84%;border-radius:4px;background:linear-gradient(180deg,#2c3d68 0%,#1f2638 55%,#111521 100%);z-index:1"></div>
     <div style="position:absolute;left:8%;top:12%;font:500 52px/1 ${SANS};letter-spacing:-.02em;color:#f3f2ef;z-index:3">Section title</div>
     <div style="position:absolute;left:8%;right:8%;top:21%;border-top:1px solid rgba(243,242,239,.18);z-index:3"></div>
     <div style="position:absolute;left:8%;top:25%;width:22%;z-index:3">${'<div style="height:8px;margin:0 0 9px;background:rgba(243,242,239,.55);border-radius:2px"></div>'.repeat(4)}<div style="height:8px;width:60%;background:rgba(243,242,239,.55);border-radius:2px"></div>
       ${'<div style="height:8px;margin:22px 0 9px;background:rgba(243,242,239,.55);border-radius:2px"></div>'}${'<div style="height:8px;margin:0 0 9px;background:rgba(243,242,239,.55);border-radius:2px"></div>'.repeat(2)}</div>
     <div class="note" style="left:8%;top:48%;color:#c4d7ff">TEXT COLUMN · 22% · 13 px · 3 to 4 short paragraphs</div>
     <div style="position:absolute;left:34%;right:8%;top:25%;bottom:22%;border-radius:12px;background:#111521;box-shadow:inset 0 0 0 1px rgba(243,242,239,.08);z-index:2"></div>
     <div style="position:absolute;left:37%;top:30%;width:16px;height:16px;border-left:1px solid #f3f2ef;border-top:1px solid #f3f2ef;z-index:3"></div><div style="position:absolute;right:11%;top:30%;width:16px;height:16px;border-right:1px solid #f3f2ef;border-top:1px solid #f3f2ef;z-index:3"></div>
     <div style="position:absolute;left:37%;top:58%;width:16px;height:16px;border-left:1px solid #f3f2ef;border-bottom:1px solid #f3f2ef;z-index:3"></div><div style="position:absolute;right:11%;top:58%;width:16px;height:16px;border-right:1px solid #f3f2ef;border-bottom:1px solid #f3f2ef;z-index:3"></div>
     <div style="position:absolute;left:39%;top:36%;font:500 110px/1 ${SANS};letter-spacing:-.03em;color:#f3f2ef;z-index:3">Specimen</div>
     <div class="note" style="left:39%;top:63%;color:#c4d7ff">SPECIMEN PANEL · 58% · corner brackets · one subject per slide</div>
     <div style="position:absolute;left:8%;top:68%;font:italic 400 22px/1.2 ${SERIF};color:#f3f2ef;z-index:3">One quiet italic line.</div>
     <div class="note" style="left:8%;top:73%;color:#c4d7ff">ITALIC SERIF TAGLINE · bottom left · every slide</div>
     <div style="position:absolute;left:8%;right:8%;top:83%;display:grid;grid-template-columns:repeat(4,1fr);font:500 11px/1 ${SANS};color:#f3f2ef;z-index:3;border-top:1px solid rgba(243,242,239,.12);padding-top:12px"><span>mark</span><span>document</span><span>section</span><span style="text-align:right">07</span></div>
     <div class="note" style="right:8%;top:88%;color:#c4d7ff">FOOTER · 4 equal columns · 9 to 11 px</div>`,
    [['#1f2638', 62, 'navy slide'], ['#060709', 18, 'page'], ['#111521', 12, 'panel'], ['#f3f2ef', 6, 'paper type'], ['#285cff', 1.5, 'cobalt'], ['#ff5436', 0.5, 'flare']], '#f3f2ef'),

  'signature-shape-system': page('signature-shape-system', 'one geometric shape carries recognition, appetite and count', 'C25',
    `<div style="position:absolute;inset:0;background:#4b1acf"></div>
     <div style="position:absolute;left:4%;top:7%;font:700 40px/1 ${SANS};letter-spacing:-.04em;color:#fff">One shape, three jobs</div>
     ${[['#4b1acf', 'RECOGNITION · flat shape'], ['#f45dd1', 'APPETITE · photo inside the shape'], ['#baff39', 'COUNT · the product grid']].map(([bg, lab], i) => `<div style="position:absolute;left:${4 + i * 31.5}%;top:20%;width:29%;height:46%;background:${bg};box-shadow:inset 0 0 0 1px rgba(255,255,255,.25)"></div><div class="note" style="left:${4 + i * 31.5}%;top:68%;color:#fff">${lab}</div>`).join('')}
     <div style="position:absolute;left:10.5%;top:28%;width:16%;aspect-ratio:1;border-radius:50%;background:#fff"></div><div style="position:absolute;left:14.8%;top:36.5%;width:7%;aspect-ratio:1;border-radius:50%;background:#ffd21c"></div>
     <div class="note" style="left:5%;top:58%;color:#fff">disc 1.00 D · core 0.44 D, off centre</div>
     <div style="position:absolute;left:42%;top:28%;width:16%;aspect-ratio:1;border-radius:50%;background:repeating-linear-gradient(45deg,#7a5532 0 8px,#b0702a 8px 16px)"></div>
     <div style="position:absolute;left:69%;top:26%;width:24%;display:grid;grid-template-columns:repeat(3,1fr);gap:14px">${'<div style="aspect-ratio:1;border-radius:50%;background:#fff;display:grid;place-items:center"><i style="width:44%;aspect-ratio:1;border-radius:50%;background:#ffd21c"></i></div>'.repeat(6)}</div>
     <div style="position:absolute;left:4%;top:77%;width:92%;font:400 15px/1.5 ${SANS};color:#fff">The mark stays fixed. Photograph, scale and crop change. A pattern always repeats the product count (2 x 3). Pairs: white on violet about 8.9:1, ink on lime about 15:1; pink carries no small white text.</div>`,
    [['#4b1acf', 52, 'violet'], ['#f45dd1', 15, 'pink'], ['#baff39', 15, 'lime'], ['#ffffff', 13, 'white'], ['#ffd21c', 4, 'yolk'], ['#161515', 1, 'ink']], '#fff'),

  'giant-tight-display': page('giant-tight-display', 'two-line display at 11% of the width, mono caps beside it, image offset below', 'C27',
    `<div style="position:absolute;inset:0;background:#f2f1ee"></div>
     <div style="position:absolute;left:1.4%;top:7%;font:400 160px/0.9 ${SANS};letter-spacing:-.0375em;color:#191919">Two word<br>display line</div>
     <div class="note" style="left:2%;top:41%;color:#191919">160 / 144 px · tracking -3.75% · weight 400 · left edge 20 px</div>
     <div style="position:absolute;left:70%;top:12%;width:22%;font:400 11px/1.6 ${MONO};letter-spacing:.02em;text-transform:uppercase;color:#5f5e5d">twelve years of practice<br><br>a short paragraph in mono capitals sits beside the display line, about one fifth of the width, eight to ten lines long</div>
     <div class="note" style="left:70%;top:33%;color:#5f5e5d">MONO CAPS COLUMN · 22% · grey 6.0:1</div>
     <div style="position:absolute;left:3%;top:57%;font:400 14px/1 ${SANS};padding:8px 12px;background:#fff;color:#191919">Small action →</div>
     <div style="position:absolute;left:40%;top:50%;right:0;bottom:0;background:linear-gradient(160deg,#c9ccd0,#8d9196 60%,#5d6166);z-index:1"></div>
     <div class="note" style="left:42%;top:53%;color:#fff">IMAGE · starts at 40% · bleeds right and bottom</div>
     ${corners(['wordmark', 'menu', '', ''], '#191919')}`,
    [['#f2f1ee', 58, 'putty'], ['#8d9196', 30, 'photo'], ['#191919', 9, 'ink'], ['#ffffff', 3, 'panel']]),

  'inline-image-headline': page('inline-image-headline', 'centred headline with picture tiles set inside the line, a card field around a clear centre', 'C26, W34',
    `<div style="position:absolute;inset:0;background:#f7f5f3"></div>
     ${Array.from({ length: 26 }, (_, i) => { const a = (i * 137.5) % 360, r = 34 + (i * 7) % 14, x = 50 + Math.cos(a * Math.PI / 180) * r * 1.25, y = 48 + Math.sin(a * Math.PI / 180) * r, d = [0.5, 0.75, 1][i % 3]; return `<div style="position:absolute;left:${x.toFixed(1)}%;top:${y.toFixed(1)}%;width:${Math.round(80 * d)}px;height:${Math.round(56 * d)}px;border-radius:8px;background:${['#8c7b6a', '#4e5a66', '#b59a7c', '#2f2b27'][i % 4]};opacity:${d === 0.5 ? 0.45 : 1};transform:rotate(${((i * 23) % 50) - 25}deg)"></div>`; }).join('')}
     <div style="position:absolute;left:0;right:0;top:36%;text-align:center;font:700 72px/1 ${SANS};letter-spacing:-.04em;color:#0a0a0a;z-index:3">Find the next<br>reference <span style="display:inline-block;width:62px;height:62px;border-radius:10px;background:#4e5a66;transform:rotate(-6deg);vertical-align:-6px"></span><span style="display:inline-block;width:62px;height:62px;border-radius:10px;background:#b59a7c;transform:rotate(6deg);vertical-align:-6px;margin-left:-14px"></span></div>
     <div class="note" style="left:58%;top:57%;color:#0a0a0a">TILES IN THE LINE · 0.95 x cap · ±6° · overlap 20%</div>
     <div style="position:absolute;left:36%;top:62%;width:28%;height:46px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px rgba(0,0,0,.1);z-index:3"></div>
     <div class="note" style="left:6%;top:12%;color:#0a0a0a">CARD FIELD · 3 depths · clear ellipse 34% · drifting 20 to 30 px/s</div>
     ${corners(['nav', 'one action', '', 'app code'], '#0a0a0a')}`,
    [['#f7f5f3', 70, 'warm white'], ['#4e5a66', 10, 'photo cool'], ['#8c7b6a', 9, 'photo warm'], ['#0a0a0a', 8, 'ink'], ['#ffffff', 3, 'field']]),

  'window-and-chip': page('window-and-chip', 'label pill, product window, a command chip on the window edge', 'C30',
    `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 20%,#fafafa,#e6e6e6)"></div>
     <div style="position:absolute;left:50%;top:13%;transform:translateX(-50%);height:40px;padding:0 18px;border-radius:999px;background:#fff;font:600 16px/40px ${SANS};color:#16171a;box-shadow:0 8px 20px -12px rgba(0,0,0,.35)"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#3f63e0;margin-right:8px;vertical-align:1px"></span>Department</div>
     <div class="note" style="left:58%;top:13%;color:#16171a">LABEL PILL · names the scene · fades in 200 ms before the window</div>
     <div style="position:absolute;left:21%;top:24%;width:58%;height:58%;border-radius:12px;background:#1d1f24;box-shadow:0 40px 70px -35px rgba(0,0,0,.55);transform:perspective(1200px) rotateY(-6deg);transform-origin:0 50%"><div style="position:absolute;left:2%;top:9%;right:22%;bottom:4%;border-radius:6px;background:#2b2d33"></div><div style="position:absolute;right:2%;top:9%;width:18%;bottom:4%;border-radius:6px;background:#26282e"></div></div>
     <div class="note" style="left:22%;top:85%;color:#16171a">WINDOW · 58% of width · slides 60 px and turns 10° to 0 in 700 ms</div>
     <div style="position:absolute;left:50%;top:79%;transform:translateX(-50%);padding:12px 18px;border-radius:8px;background:#0f1013;font:15px/1 ${MONO};color:#f1f2f4;z-index:3;white-space:nowrap"><span style="color:#8fb1ff">&gt;</span> A short real request.<span style="display:inline-block;width:.6em;height:1em;background:#3f63e0;vertical-align:-2px;margin-left:4px"></span></div>
     <div class="note" style="left:4%;top:72%;color:#16171a">COMMAND CHIP · half over the edge · 40 chars/s</div>`,
    [['#eeeeee', 52, 'light ground'], ['#1d1f24', 36, 'window'], ['#0f1013', 6, 'chip'], ['#ffffff', 4, 'pill'], ['#3f63e0', 2, 'cursor']]),

};

for (const [name, html] of Object.entries(boards)) writeFileSync(join(here, `${name}.html`), html);
console.log(`wrote ${Object.keys(boards).length} boards to ${here}`);
