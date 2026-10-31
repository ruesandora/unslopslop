// Fixtures for the measured hierarchy proof and the subject kinds (field, mosaic, tool, ghost). Plain system fonts:
// only computed size, weight, colour and position matter. Each page is 1440 x 900 first screen.
const head = (css) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>fixture</title><style>*{box-sizing:border-box}body{margin:0;font:400 17px/1.5 system-ui,sans-serif;overflow-x:hidden}${css}</style></head><body>`;
const circles = (w, h) => `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="max-width:100%;height:auto" role="img" aria-label="Example drawing">${Array.from({ length: 14 }, (_, i) => `<circle cx="${40 + i * 50}" cy="${h / 2 + Math.sin(i) * h / 4}" r="${18 + (i % 4) * 8}" fill="hsl(${190 + i * 9} 22% ${34 + (i % 5) * 6}%)"/>`).join('')}</svg>`;
const tile = (hue, light = 55) => `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="360" height="180"><rect width="360" height="180" fill="hsl(${hue} 30% ${light}%)"/><circle cx="180" cy="90" r="50" fill="hsl(${hue + 40} 40% 30%)"/></svg>`)}`;

// Hierarchy from weight, tone and position, no giant size: a 44 px weight 800 near-black lead over 300 weight grey copy,
// alone in clear space, next to a drawing.
export const HIER_QUIET = head('body{background:#f4f1ea;color:#111}.stage{min-height:900px;padding:260px 80px 0 120px;position:relative}h1{font:800 44px/1.1 system-ui,sans-serif;margin:0 0 28px;max-width:560px}p{font-weight:300;color:#6b6b6b;max-width:46ch;margin:0 0 40px}.k{font:600 12px/1 system-ui;letter-spacing:.12em;text-transform:uppercase;color:#8a5a2b;margin-bottom:40px}.art{position:absolute;right:60px;top:120px;width:640px}a{display:inline-block;background:#111;color:#f4f1ea;padding:12px 20px;text-decoration:none;font-weight:600}')
  + `<main class="stage"><div class="k">Field notes</div><h1>Quiet invoices, chased politely</h1><p>Reminders go out on day 3, 7 and 14 and stop the moment the money lands.</p><a href="#s">Connect invoices</a><div class="art">${circles(640, 520)}</div></main></body></html>`;

// Flat: same size, weight and ink everywhere, tight stack, plus the same drawing. Nothing leads.
export const HIER_FLAT = head('body{background:#f4f1ea;color:#333}.stage{min-height:900px;padding:60px 80px;position:relative}p{margin:0 0 6px;max-width:60ch}.art{position:absolute;right:60px;top:120px;width:640px}')
  + `<main class="stage">${Array.from({ length: 8 }, (_, i) => `<p>Line ${i + 1}: reminders go out on day 3, 7 and 14 and stop the moment the money lands.</p>`).join('')}<div class="art">${circles(640, 520)}</div></main></body></html>`;

// Crowded: a 48 px lead (3x the body, weight 600) packed between an eyebrow chip, copy, two buttons, a proof line and a logo row.
// Size ratio and weight are there, but the lead does not own the screen.
export const HIER_CROWDED = head('body{background:#fff;color:#1a1a1a}.stage{min-height:900px;padding:150px 64px 0;position:relative;max-width:700px}.chip{display:inline-block;font-size:13px;border:1px solid #ccc;border-radius:99px;padding:3px 10px;margin-bottom:8px}h1{font:600 48px/1 system-ui,sans-serif;margin:0 0 8px}p{margin:0 0 8px;color:#222}.row{display:flex;gap:10px;margin:8px 0}.row a{padding:10px 16px;border:1px solid #1a1a1a;border-radius:8px;color:#1a1a1a;text-decoration:none}.proof{font-size:15px;margin:6px 0}.logos{font-size:15px;color:#222;margin:6px 0}.art{position:absolute;left:760px;top:120px;width:640px}')
  + `<main class="stage"><span class="chip">Changelog: new this week</span><h1>The component library for landing pages.</h1><p>Two hundred ready blocks and templates, built with React and Tailwind, installed in one command.</p><div class="row"><a href="#a">Browse components</a><a href="#b">Get access</a></div><div class="proof">Trusted by founders, developers and creators.</div><div class="logos">Powered by Vibrant, Acebuilder, Northwind, Lumen</div><div class="art">${circles(640, 520)}</div></main></body></html>`;

// Subject kinds. Field: a large vector with a pattern fill and only three shapes, no labels (a CSS box is the bad twin).
const fieldSvg = '<svg width="560" height="760" viewBox="0 0 560 760"><defs><pattern id="p" width="56" height="38" patternUnits="userSpaceOnUse"><rect width="56" height="38" fill="#000"/><rect x="8" y="10" width="34" height="12" fill="#fff"/></pattern></defs><rect width="560" height="760" fill="url(#p)"/></svg>';
const split = (right) => head('body{background:#f6f6f6;color:#111}.wrap{display:grid;grid-template-columns:1fr 560px;gap:0;max-width:1200px;margin:60px auto;min-height:760px}.l{padding:200px 60px;text-align:center}h1{font:500 56px/1.1 system-ui,sans-serif;margin:0 0 20px}p{color:#555;font-size:20px;margin:0}')
  + `<div class="wrap"><div class="l"><h1>Brand textures for your agents</h1><p>Thirty textures, curated for your projects.</p></div><div>${right}</div></div></body></html>`;
export const SUBJECT_FIELD = { good: split(fieldSvg), bad: split('<div style="width:560px;height:760px;background:#000"></div>') };

// Mosaic: 20 media tiles covering the screen read as one wall of work; two tiles do not.
const wall = (n) => head('body{background:#0b0b0b;color:#f7f7f7}.grid{display:grid;grid-template-columns:repeat(4,360px);gap:0}.grid img{display:block;width:360px;height:180px}.over{position:fixed;left:0;right:0;top:300px;text-align:center}h1{font:500 58px/1 system-ui,sans-serif;margin:0 0 12px}p{margin:0;font-size:20px;color:#ccc}')
  + `<div class="grid">${Array.from({ length: n }, (_, i) => `<img alt="" src="${tile(20 + i * 17)}">`).join('')}</div><div class="over"><h1>We turn designs into components</h1><p>Browse the wall of work below.</p></div></body></html>`;
export const SUBJECT_MOSAIC = { good: wall(20), bad: wall(2) };

// Tool: a canvas preview inside a panel of controls, three panels of buttons and sliders; the working surface is the subject.
const buttons = (n) => Array.from({ length: n }, (_, i) => `<button>Opt ${i + 1}</button>`).join('');
const toolPage = (nControls) => head('body{background:#faf9f6;color:#1a1a1a;font-size:13px}.app{display:grid;grid-template-columns:300px 800px 300px;gap:16px;padding:16px;height:900px}.panel{border:1px solid #ddd;border-radius:14px;padding:16px;background:#fff;overflow:hidden}.col{display:grid;grid-template-rows:520px 1fr;gap:16px}button{font:inherit;padding:6px 10px;margin:3px}canvas{display:block;border-radius:10px}')
  + `<div class="app"><aside class="panel"><b>Scenes</b><div>${buttons(2)}</div></aside><main class="col"><section class="panel"><canvas id="c" width="480" height="420" style="margin:0 auto"></canvas><div>${buttons(2)}</div></section><section class="panel"><b>Timeline</b><div>${buttons(nControls)}</div></section></main><aside class="panel"><b>Output</b><div>${buttons(3)}</div></aside></div><script>const x=document.getElementById('c').getContext('2d');x.fillStyle='#223';x.fillRect(0,0,480,420);x.fillStyle='#e8c07a';x.beginPath();x.arc(240,210,120,0,7);x.fill();x.fillStyle='#a33';x.fillRect(60,300,360,40)</script></body></html>`;
export const SUBJECT_TOOL = { good: toolPage(8), bad: toolPage(0) };

// Ghost: a subject has to be visible. A pale hero image at 25% opacity is a watermark (clearly visible in pixels, so only the opacity rule catches it); an empty canvas has nothing to see.
const hero = (img) => head('body{background:#101010;color:#f2f2f2}.stage{position:relative;min-height:900px;padding:300px 120px 0}h1{font:700 72px/1 system-ui,sans-serif;margin:0 0 16px;position:relative;z-index:1}p{margin:0;font-size:20px;color:#bbb;position:relative;z-index:1}.art{position:absolute;left:290px;top:100px;width:860px;height:700px}')
  + `<main class="stage"><h1>Tasteful components</h1><p>Made to stand out, in one command.</p>${img}</main></body></html>`;
const photo = (op) => `<img class="art" alt="" style="opacity:${op}" src="${tile(200, 88).replace('width%3D%22360%22%20height%3D%22180%22', 'width%3D%22860%22%20height%3D%22700%22')}">`;
export const SUBJECT_WATERMARK = { good: hero(photo(1)), bad: hero(photo(0.25)) };
const canvas = (draw) => `<canvas class="art" id="c" width="860" height="700"></canvas>${draw ? '<script>const x=document.getElementById("c").getContext("2d");x.fillStyle="#d9d2c3";x.beginPath();x.arc(430,350,220,0,7);x.fill();x.fillStyle="#7a2a2a";x.fillRect(260,330,340,60)</script>' : ''}`;
export const SUBJECT_GHOST = { good: hero(canvas(true)), bad: hero(canvas(false)) };
