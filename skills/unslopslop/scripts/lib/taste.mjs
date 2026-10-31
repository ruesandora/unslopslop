// Taste proof: the slop rules only count known bad patterns, so a page that dodges the checklist but has
// no taste used to score near zero slop. The default is now the opposite: a page is NOT proven good,
// and the proof has to be earned by positive evidence that separates strong pages from template pages
// (measured on a calibration set of strong references, template pages and our own rejected redesigns):
//
//   subject  30  one real subject (photo, video, canvas, drawing; not a CSS box, not a data chart)
//                filling 25-60% of the first screen. Full-bleed (over 60%) and small subjects earn less.
//   hierarchy 25 a measured typographic hierarchy, not a headline size: lead-to-body size ratio (gold: 2.8x or more),
//                weight contrast, ink (lightness) contrast, white space around the lead line, and 3-5 distinct levels.
//                A hierarchy built from weight, tone or position earns points without a giant size; a flat page earns none.
//   overlap  15  deliberate layering: type crossing the subject, or a layer crossing an edge
//   ground   15  one ground colour holds 55-97% of the first screen and accents stay under 3%
//   keyword  15  the headline has no coloured or gradient keyword
//
// Subject kinds: media, a drawing, a pattern field (large vector or CSS-image field), a mosaic of six or more tiles, or the
// tool itself (a first screen full of controls around a live output, e.g. a canvas or preview).
// Caps: no real subject -> proof at most 10; flat hierarchy (fewer than two axes or under 12 of 25 points) on a non-app page -> at most 55.
// Reference gate: even a passing page stays UNPROVEN until a side-by-side compare against a strong
// reference was run (detect.mjs --compared <compare.png>).
//
//   proof = sum of components after caps                       (0..100, higher is better)
//   owner slop = max(100 - proof, tells x (0.2 + 0.8 x (1 - proof/100)))   (100 is the worst)
//
// "tells" are the genre defaults (gradient keyword, orb, avatar stack, ...). Hygiene rules (small text,
// padding, tap targets, contrast ...) are reported but do not move the owner number: dense, real pages
// trip them all the time and they say nothing about taste.

export const PROOF_PASS = 60;
export const TASTE_COMPONENTS = { subject: 30, hierarchy: 25, overlap: 15, ground: 15, keyword: 15 };

export const TELLS = new Set([
  'color-purple-gradient', 'color-gradient-text', 'color-random-gradient', 'color-rainbow', 'color-framework-default', 'color-glow',
  'image-blur-blob', 'image-avatar-stack', 'type-accent-keyword', 'type-hero-number', 'type-ai-default-font', 'type-house-pairing', 'type-eyebrow',
  'layout-stat-strip', 'layout-identical-cards', 'layout-nested-cards', 'detail-card-triple',
  'copy-cliche', 'copy-fake-data', 'copy-unverified-proof', 'copy-emoji', 'copy-placeholder', 'icon-emoji-ui', 'icon-tile',
  'detail-pulse-dot', 'detail-announce-pill', 'detail-fake-window', 'detail-paper-props', 'detail-stamp-sticker',
  'detail-showcase-ornament', 'detail-version-badge', 'copy-caption-sprawl',
]);

// Runs in the page (serialised with toString(), keep it self-contained). h = makeHelpers().
export function tasteProbe(h, off = []) {
  const vpA = h.vw * h.vh;
  const pageH = Math.max(document.documentElement.scrollHeight, h.vh);
  const clip = (r) => {
    const t = Math.max(0, r.top), b = Math.min(h.vh, r.bottom), l = Math.max(0, r.left), rr = Math.min(h.vw, r.right);
    return b > t && rr > l ? (b - t) * (rr - l) : 0;
  };
  // page-wide imagery (information only: an image existing earns nothing by itself)
  let imagery = 0;
  for (const e of h.all()) {
    const r = h.rect(e), t = e.tagName.toUpperCase();
    if (['IMG', 'VIDEO', 'CANVAS', 'PICTURE'].includes(t) && r.width >= 120 && r.height >= 80) imagery++;
    else if (t === 'SVG' && r.width >= 160 && r.height >= 100 && e.querySelectorAll('*').length >= 8 && !e.querySelector('text')) imagery++;
  }
  // first-screen subjects, scanned here (not through h.visuals(): a card or panel around the media would hide it):
  // media, a drawing without its own labels (a labelled SVG is a chart), a pattern field (a large vector with shapes,
  // or a large CSS image background). A CSS box is not a subject.
  const SHAPES = 'rect,path,circle,ellipse,polygon,polyline,line,use,pattern,image';
  const cand = [];
  for (const e of h.all()) {
    const r = h.rect(e), a = clip(r);
    if (!a) continue;
    const tag = e.tagName.toUpperCase();
    let kind = null;
    let op = 1;
    for (let p = e; p && p !== document.documentElement; p = p.parentElement) op *= parseFloat(h.cs(p).opacity);
    if (!off.includes('watermark') && !(op >= 0.35)) continue; // a watermark or ghost layer (effective opacity under 0.35) is a craft layer, not the subject
    if (['IMG', 'VIDEO', 'CANVAS', 'PICTURE'].includes(tag) && r.width >= 120 && r.height >= 80) kind = 'media';
    else if (tag === 'SVG' && r.width >= 160 && r.height >= 100 && !e.querySelector('text')) {
      if (e.querySelectorAll('*').length >= 6) kind = 'drawing';
      else if (!off.includes('field') && a >= 0.12 * vpA && e.querySelector(SHAPES)) kind = 'field';
    } else if (!off.includes('field') && !['BODY', 'HTML'].includes(tag) && a >= 0.12 * vpA && /url\(/.test(h.cs(e).backgroundImage) && !/noise|grain/i.test(h.cs(e).backgroundImage)) kind = 'field';
    if (kind) cand.push({ el: e, kind, frac: a / vpA });
  }
  const subjects = cand.filter((v) => !cand.some((o) => o !== v && o.el.contains(v.el)));
  let best = subjects.reduce((a, v) => (v.frac > a.frac ? v : a), { frac: 0, el: null });
  let mediaFrac = Math.min(1, subjects.reduce((a, v) => a + v.frac, 0));
  // a mosaic: six or more media tiles that together cover the screen read as one field (a wall of work)
  const tiles = subjects.filter((v) => v.kind === 'media').length;
  const mosaic = !off.includes('mosaic') && tiles >= 6 && mediaFrac >= 0.6 && best.frac < 0.25 ? tiles : 0;
  // the tool itself: a first screen full of controls around a live output (canvas, video, image). The working
  // surface is the smallest panel around that output that holds at least six controls.
  const isControl = (e) => /^(BUTTON|INPUT|SELECT|TEXTAREA)$/.test(e.tagName) || /^(tab|slider|switch|radio|checkbox|menuitem|option)$/.test(e.getAttribute('role') || '');
  const controls = h.all().filter((e) => isControl(e) && clip(h.rect(e)) > 0);
  let tool = 0;
  if (!off.includes('tool') && controls.length >= 10 && best.el && best.frac >= 0.08) {
    for (let p = best.el.parentElement; p && p !== document.body; p = p.parentElement) {
      const pa = clip(h.rect(p));
      if (pa >= 0.98 * vpA) break;
      if (controls.filter((c) => p.contains(c)).length >= 6) { tool = pa / vpA; break; }
    }
  }
  let subjectKind = best.el ? best.kind || 'media' : '';
  let subjectFrac = best.frac;
  if (mosaic) { subjectKind = 'mosaic'; subjectFrac = Math.max(subjectFrac, Math.min(0.95, mediaFrac)); }
  if (tool > subjectFrac) { subjectKind = 'tool'; subjectFrac = tool; }
  const texts = h.textEls().filter((e) => h.rect(e).top < h.vh && h.rect(e).bottom > 0);
  const display = Math.max(0, ...texts.map((e) => h.px(h.cs(e).fontSize)));
  // deliberate overlap: text drawn over the best subject, or two subjects/layers overlapping
  let overlap = 0;
  if (best.el) {
    const b = h.rect(best.el);
    for (const e of texts) {
      if (best.el.contains(e)) continue;
      const r = h.rect(e);
      if (Math.min(r.right, b.right) - Math.max(r.left, b.left) > 20 && Math.min(r.bottom, b.bottom) - Math.max(r.top, b.top) > 10) overlap++;
    }
    for (const o of subjects) {
      if (o === best) continue;
      const r = h.rect(o.el);
      if (Math.min(r.right, b.right) - Math.max(r.left, b.left) > 20 && Math.min(r.bottom, b.bottom) - Math.max(r.top, b.top) > 20) overlap++;
    }
  }
  // headline keyword in a different colour, or a gradient clipped to text, inside the h1
  const h1 = document.querySelector('h1');
  let keyword = 0;
  if (h1) {
    const base = h.rgba(h.cs(h1).color);
    for (const c of h1.querySelectorAll('*')) {
      const s = h.cs(c);
      if ((s.webkitBackgroundClip === 'text' || s.backgroundClip === 'text') && /gradient\(/.test(s.backgroundImage)) { keyword++; continue; }
      const col = h.rgba(s.color);
      if (col && base && h.saturated(col) && Math.abs(col.r - base.r) + Math.abs(col.g - base.g) + Math.abs(col.b - base.b) > 90) keyword++;
    }
  }
  // typographic hierarchy of the first screen: one record per text element (size, weight, perceived lightness, characters)
  const recs = [];
  for (const e of texts) {
    const s = h.cs(e), r = h.rect(e);
    const own = h.own(e);
    if (own.length < 1 || r.width < 3) continue;
    const size = h.px(s.fontSize);
    if (size < 6) continue;
    let col = h.rgba(s.color) || { r: 0, g: 0, b: 0, a: 1 };
    let op = 1;
    for (let p = e; p && p !== document.body; p = p.parentElement) op *= parseFloat(h.cs(p).opacity) || 0;
    const bg = h.bgOf(e);
    const a = Math.max(0, Math.min(1, col.a * op));
    const mix = bg ? { r: col.r * a + bg.r * (1 - a), g: col.g * a + bg.g * (1 - a), b: col.b * a + bg.b * (1 - a) } : col;
    recs.push({ el: e, size, weight: parseInt(s.fontWeight, 10) || 400, light: Math.sqrt(h.lum(mix)), chars: own.length, rect: r });
  }
  const wmed = (arr, f) => {
    if (!arr.length) return 0;
    const sorted = [...arr].sort((x, y) => f(x) - f(y));
    const total = sorted.reduce((a, v) => a + v.chars, 0);
    let acc = 0;
    for (const v of sorted) { acc += v.chars; if (acc >= total / 2) return f(v); }
    return f(sorted[sorted.length - 1]);
  };
  const hier = { lead: 0, body: 0, ratio: 0, weightDiff: 0, inkDiff: 0, free: 0, levels: 0 };
  // lead = the largest text; a headline split into one-letter spans still counts (the group needs 3 characters together)
  let leadCands = recs.filter((v) => v.chars >= 1), group = [];
  while (leadCands.length) {
    const m = Math.max(...leadCands.map((v) => v.size));
    group = leadCands.filter((v) => v.size >= 0.85 * m);
    if (group.reduce((a, v) => a + v.chars, 0) >= 3) break;
    leadCands = leadCands.filter((v) => !group.includes(v));
    group = [];
  }
  if (group.length) {
    const maxSize = Math.max(...group.map((v) => v.size));
    const lead = group[0];
    const rest = recs.filter((v) => !group.includes(v));
    const paras = rest.filter((v) => v.chars >= 25 && v.size < 0.7 * maxSize);
    const pool = paras.length ? paras : rest.length ? rest : [{ size: 16, weight: 400, light: lead.light, chars: 1 }];
    const bodySize = wmed(pool, (v) => v.size), bodyWeight = wmed(pool, (v) => v.weight), bodyLight = wmed(pool, (v) => v.light);
    const gw = group.map((v) => v.weight), gl = group.map((v) => v.light);
    hier.lead = +maxSize.toFixed(1);
    hier.body = +bodySize.toFixed(1);
    hier.ratio = +(maxSize / bodySize).toFixed(2);
    hier.weightDiff = Math.max(Math.abs(wmed(group, (v) => v.weight) - bodyWeight), Math.max(...gw) - Math.min(...gw));
    hier.inkDiff = +Math.max(Math.abs(wmed(group, (v) => v.light) - bodyLight), Math.max(...gl) - Math.min(...gl)).toFixed(3);
    // white space around the lead line: share of a halo (one lead size on every side) not covered by other text
    const L = { left: Math.min(...group.map((v) => v.rect.left)), right: Math.max(...group.map((v) => v.rect.right)), top: Math.min(...group.map((v) => v.rect.top)), bottom: Math.max(...group.map((v) => v.rect.bottom)) };
    const H = { left: L.left - maxSize, right: L.right + maxSize, top: L.top - maxSize, bottom: L.bottom + maxSize };
    let covered = 0;
    const haloA = (H.right - H.left) * (H.bottom - H.top);
    for (const o of rest) {
      const w = Math.min(o.rect.right, H.right) - Math.max(o.rect.left, H.left), hh = Math.min(o.rect.bottom, H.bottom) - Math.max(o.rect.top, H.top);
      if (w > 0 && hh > 0) covered += w * hh;
    }
    const leadArea = (L.right - L.left) * (L.bottom - L.top);
    hier.free = +Math.max(0, Math.min(1, 1 - covered / Math.max(1, haloA - leadArea))).toFixed(3);
    // distinct levels: size step (1.2x apart), bold or not, light/mid/dark ink; each needs 8 characters
    const sizes = [...new Set(recs.map((v) => v.size))].sort((x, y) => x - y);
    const step = new Map();
    let cur = -1, anchor = 0;
    for (const sz of sizes) { if (cur < 0 || sz > anchor * 1.2) { cur++; anchor = sz; } step.set(sz, cur); }
    const keys = new Map();
    for (const v of recs) {
      const k = step.get(v.size) + '/' + (v.weight >= 600 ? 'b' : 'r') + '/' + (v.light < 0.3 ? 'd' : v.light < 0.7 ? 'm' : 'l');
      keys.set(k, (keys.get(k) || 0) + v.chars);
    }
    hier.levels = [...keys.values()].filter((c) => c >= 8).length;
  }
  let subjectRect = null;
  if (best.el && best.frac >= 0.05 && !(tool > best.frac) && !mosaic) {
    const r = h.rect(best.el);
    subjectRect = { x: Math.max(0, r.left), y: Math.max(0, r.top), w: Math.min(h.vw, r.right) - Math.max(0, r.left), h: Math.min(h.vh, r.bottom) - Math.max(0, r.top), holes: [] };
    // text drawn over the subject is masked out of the visibility check (it would make an empty canvas look busy)
    for (const e of texts) {
      if (best.el.contains(e)) continue;
      const t = h.rect(e);
      if (t.right > subjectRect.x && t.left < subjectRect.x + subjectRect.w && t.bottom > subjectRect.y && t.top < subjectRect.y + subjectRect.h && subjectRect.holes.length < 60) subjectRect.holes.push({ x: t.left, y: t.top, w: t.width, h: t.height });
    }
  }
  return { subjectRect, subjectFrac: +subjectFrac.toFixed(3), subjectKind, mediaFrac: +mediaFrac.toFixed(3), display, overlap, keyword, imagery, app: h.isApp(), pageHeight: pageH, vpA, hier, vw: h.vw, mosaic, tool: +tool.toFixed(3) };
}

// Runs in the page: ground and accent shares of the first-screen screenshot (base64 PNG), and how much of the subject
// rectangle is visibly different from its own dominant colour (a blank canvas or a ghost image has almost none).
export async function pixelProbe(b64, rect, vw, vh) {
  const img = new Image();
  img.src = 'data:image/png;base64,' + b64;
  await img.decode();
  const c = document.createElement('canvas');
  c.width = 144; c.height = 90;
  const x = c.getContext('2d');
  x.drawImage(img, 0, 0, 144, 90);
  const d = x.getImageData(0, 0, 144, 90).data;
  const m = new Map();
  let acc = 0;
  const n = d.length / 4;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i + 1], bl = d[i + 2];
    const k = (r >> 5) + ',' + (g >> 5) + ',' + (bl >> 5);
    m.set(k, (m.get(k) || 0) + 1);
    if (Math.max(r, g, bl) - Math.min(r, g, bl) > 70 && Math.max(r, g, bl) > 90) acc++;
  }
  const top = Math.max(...m.values());
  const out = { ground: +(top / n).toFixed(3), accent: +(acc / n).toFixed(3) };
  if (rect && rect.w > 4 && rect.h > 4) {
    const sc = img.width / (vw || img.width);
    const W = Math.max(8, Math.round(rect.w * sc / 4)), H = Math.max(8, Math.round(rect.h * sc / 4));
    const c2 = document.createElement('canvas');
    c2.width = W; c2.height = H;
    const x2 = c2.getContext('2d', { willReadFrequently: true });
    x2.drawImage(img, rect.x * sc, rect.y * sc, rect.w * sc, rect.h * sc, 0, 0, W, H);
    const p = x2.getImageData(0, 0, W, H).data;
    const bins = new Map();
    for (let i = 0; i < p.length; i += 4) {
      const k = (p[i] >> 4) + ',' + (p[i + 1] >> 4) + ',' + (p[i + 2] >> 4);
      const e = bins.get(k) || { n: 0, r: 0, g: 0, b: 0 };
      e.n++; e.r += p[i]; e.g += p[i + 1]; e.b += p[i + 2];
      bins.set(k, e);
    }
    const dom = [...bins.values()].reduce((a, v) => (v.n > a.n ? v : a));
    const dr = dom.r / dom.n, dg = dom.g / dom.n, db = dom.b / dom.n;
    let diff = 0, seen = 0;
    const holes = (rect.holes || []).map((o) => ({ l: (o.x - rect.x) * sc / 4, t: (o.y - rect.y) * sc / 4, r: (o.x + o.w - rect.x) * sc / 4, b: (o.y + o.h - rect.y) * sc / 4 }));
    for (let i = 0, k = 0; i < p.length; i += 4, k++) {
      const px = k % W, py = (k / W) | 0;
      if (holes.some((o) => px >= o.l && px <= o.r && py >= o.t && py <= o.b)) continue;
      seen++;
      if (Math.max(Math.abs(p[i] - dr), Math.abs(p[i + 1] - dg), Math.abs(p[i + 2] - db)) > 40) diff++;
    }
    out.subjectInk = +(diff / Math.max(1, seen)).toFixed(3);
  }
  return out;
}

const clamp = (v) => Math.max(0, Math.min(1, v));
const ramp = (v, lo, hi) => clamp((v - lo) / (hi - lo));

export function tasteDisabled() {
  return new Set((process.env.UNSLOP_TASTE_OFF || '').split(',').map((x) => x.trim()).filter(Boolean));
}

// Measured hierarchy, 0..1, from the first-screen text records (see tasteProbe). Axes and weights (of 25 points):
//   size 8      lead / body size ratio: ramp 1.5x to 2.8x (the gold range starts at 2.8x); app screens 1.2x to 2.0x
//   weight 5    weight contrast between lead and body, or inside the headline: ramp 100 to 300
//   ink 4       lightness contrast (sqrt of relative luminance) between lead and body, or inside the headline: ramp 0.10 to 0.40
//   space 4     free share of a halo one lead-size wide around the lead line: ramp 0.6 to 0.95; only counts when the lead stands out (ratio 1.15x to 1.6x)
//   levels 4    distinct (size step, bold, ink) levels: 1 none, 2 half, 3 to 5 full, 6 to 7 most, 8 or more clutter
// "Proven" needs at least two axes at half strength, 12 of 25 points, and a lead that owns the screen: either scale
// (lead at least 4.7% of the viewport width, 67 px at 1440) or clear space around it (space 35% or more). A modest
// headline therefore proves itself by position and isolation; a crowded 48 px stack of eyebrow, copy, buttons and logos does not.
// A giant but unsupported headline has one axis; a flat page none.
export function hierarchyScore(t, off = new Set()) {
  const hi = t.hier;
  if (!hi || !hi.lead) {
    const f = t.app ? 0.6 : 0;
    return { frac: f, axes: 0, proven: !!t.app, why: t.hier ? 'no text on the first screen' : 'no hierarchy signals' };
  }
  const size = t.app ? ramp(hi.ratio, 1.2, 2.0) : ramp(hi.ratio, 1.5, 2.8);
  const weight = ramp(hi.weightDiff, 100, 300);
  const ink = ramp(hi.inkDiff, 0.1, 0.4);
  const space = ramp(hi.free, 0.6, 0.95) * ramp(hi.ratio, 1.15, 1.6);
  const lv = hi.levels <= 1 ? 0 : hi.levels === 2 ? 0.5 : hi.levels <= 5 ? 1 : hi.levels <= 7 ? 0.7 : 0.4;
  const pts = 8 * size + 5 * weight + 4 * ink + 4 * space + 4 * lv;
  let frac = pts / 25;
  const axes = [size, weight, ink, space].filter((v) => v >= 0.5).length;
  const owns = off.has('owns') || hi.lead / (t.vw || 1440) >= 0.047 || space >= 0.35;
  const proven = axes >= 2 && frac >= 0.48 && owns;
  if (t.app) frac = Math.max(frac, 0.6);
  return { frac, axes, proven: proven || !!t.app, why: `lead ${hi.lead} px over body ${hi.body} px = ${hi.ratio}x, weight gap ${hi.weightDiff}, ink gap ${hi.inkDiff}, free space ${Math.round(hi.free * 100)}%, ${hi.levels} levels (${axes} of 4 axes${owns ? '' : ', lead does not own the screen'})${t.app ? ' (app screen, floor 60%)' : ''}` };
}

/** signals + craft score -> {proof, components, caps}. `off` zeroes components (mutation tests); 'reference' lifts the compare gate. */
export function tasteScore(t, craft, { compared = false } = {}, off = tasteDisabled()) {
  const c = {};
  const put = (name, frac, why) => { c[name] = { points: off.has(name) ? 0 : Math.round(TASTE_COMPONENTS[name] * clamp(frac)), max: TASTE_COMPONENTS[name], why }; };
  const f = t.subjectFrac;
  const single = f < 0.1 ? 0 : f < 0.25 ? 0.9 * ramp(f, 0.1, 0.25) : f <= 0.6 ? 1 : f <= 0.97 ? 0.6 : 0.5;
  const ghost = !off.has('ghost') && t.subjectInk !== undefined && t.subjectInk < 0.02 && ['media', 'drawing', 'field'].includes(t.subjectKind);
  put('subject', ghost ? 0 : Math.max(single, 0.7 * ramp(t.mediaFrac, 0.1, 0.25)), ghost ? `largest subject ${Math.round(f * 100)}% of the first screen (${t.subjectKind}) is not visible: ${(t.subjectInk * 100).toFixed(1)}% of it differs from its own ground (blank canvas or ghost image)` : `largest subject ${Math.round(f * 100)}% of the first screen (${t.subjectKind || 'none'}), all subjects ${Math.round(t.mediaFrac * 100)}%`);
  const hr = hierarchyScore(t, off);
  put('hierarchy', hr.frac, hr.why);
  put('overlap', t.overlap > 0 ? 1 : 0, t.overlap > 0 ? `${t.overlap} layers overlap the subject` : 'nothing overlaps the subject');
  const g = t.ground === undefined ? 0 : t.ground;
  put('ground', 0.5 * (g >= 0.55 ? 1 : ramp(g, 0.3, 0.55)) + 0.5 * (1 - ramp(t.accent ?? 1, 0.03, 0.1)), `ground colour ${Math.round(g * 100)}% of the first screen, accents ${((t.accent ?? 0) * 100).toFixed(1)}%`);
  put('keyword', t.keyword ? 0 : 1, t.keyword ? `${t.keyword} coloured or gradient keyword(s) in the headline` : 'no coloured headline keyword');
  let proof = Object.values(c).reduce((a, v) => a + v.points, 0);
  const caps = [];
  if (c.subject.points === 0) { proof = Math.min(proof, 10); caps.push('no real subject on the first screen: proof capped at 10'); }
  if (!t.app && !hr.proven && !off.has('hierarchy')) { proof = Math.min(proof, 55); caps.push(`flat hierarchy (${hr.axes} of 4 axes, ${c.hierarchy.points} of ${c.hierarchy.max} points): proof capped at 55`); }
  return { proof, pass: proof >= PROOF_PASS, compared: !!compared || off.has('reference'), components: c, caps, signals: t };
}

// Owner reading, one number, 100 is the worst. Taste not proven pulls it up; tells (genre defaults) count less the more is proven.
export function ownerSlop(tells, proof) {
  return Math.max(100 - proof, Math.round(Math.min(100, tells) * (0.2 + 0.8 * (1 - proof / 100))));
}
