// Taste proof: the slop rules only count known bad patterns, so a page that dodges the checklist but has
// no taste used to score near zero slop. The default is now the opposite: a page is NOT proven good,
// and the proof has to be earned by positive evidence that separates strong pages from template pages
// (measured on a calibration set of strong references, template pages and our own rejected redesigns):
//
//   subject  30  one real subject (photo, video, canvas, drawing; not a CSS box, not a data chart)
//                filling 25-60% of the first screen. Full-bleed (over 60%) and small subjects earn less.
//   display  25  a display line of 70-88 px or more (strong product pages measured 86-104 px, template pages mostly 48-72) (app screens: judged by ratio instead)
//   overlap  15  deliberate layering: type crossing the subject, or a layer crossing an edge
//   ground   15  one ground colour holds 55-97% of the first screen and accents stay under 3%
//   keyword  15  the headline has no coloured or gradient keyword
//
// Caps: no real subject -> proof at most 10; display under 80 px on a non-app page -> at most 55.
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
export const TASTE_COMPONENTS = { subject: 30, display: 25, overlap: 15, ground: 15, keyword: 15 };

export const TELLS = new Set([
  'color-purple-gradient', 'color-gradient-text', 'color-random-gradient', 'color-rainbow', 'color-framework-default', 'color-glow',
  'image-blur-blob', 'image-avatar-stack', 'type-accent-keyword', 'type-hero-number', 'type-ai-default-font', 'type-house-pairing', 'type-eyebrow',
  'layout-stat-strip', 'layout-identical-cards', 'layout-nested-cards', 'detail-card-triple',
  'copy-cliche', 'copy-fake-data', 'copy-unverified-proof', 'copy-emoji', 'copy-placeholder', 'icon-emoji-ui', 'icon-tile',
  'detail-pulse-dot', 'detail-announce-pill', 'detail-fake-window', 'detail-paper-props', 'detail-stamp-sticker',
  'detail-showcase-ornament', 'detail-version-badge', 'copy-caption-sprawl',
]);

// Runs in the page (serialised with toString(), keep it self-contained). h = makeHelpers().
export function tasteProbe(h) {
  const vpA = h.vw * h.vh;
  const pageH = Math.max(document.documentElement.scrollHeight, h.vh);
  // page-wide imagery (information only: an image existing earns nothing by itself)
  let imagery = 0;
  for (const e of h.all()) {
    const r = h.rect(e), t = e.tagName.toUpperCase();
    if (['IMG', 'VIDEO', 'CANVAS', 'PICTURE'].includes(t) && r.width >= 120 && r.height >= 80) imagery++;
    else if (t === 'SVG' && r.width >= 160 && r.height >= 100 && e.querySelectorAll('*').length >= 8 && !e.querySelector('text')) imagery++;
  }
  // first-screen subjects: real media or a drawing without its own labels (a labelled SVG is a chart)
  const subjects = h.visuals().filter((v) => v.kind === 'media' || (v.kind === 'drawing' && !v.el.querySelector('text')));
  const best = subjects.reduce((a, v) => (v.frac > a.frac ? v : a), { frac: 0, el: null });
  const mediaFrac = Math.min(1, subjects.reduce((a, v) => a + v.frac, 0));
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
  return { subjectFrac: +best.frac.toFixed(3), subjectKind: best.el ? best.kind || 'media' : '', mediaFrac: +mediaFrac.toFixed(3), display, overlap, keyword, imagery, app: h.isApp(), pageHeight: pageH, vpA };
}

// Runs in the page: ground and accent shares of the first-screen screenshot (base64 PNG).
export async function pixelProbe(b64) {
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
  return { ground: +(top / n).toFixed(3), accent: +(acc / n).toFixed(3) };
}

const clamp = (v) => Math.max(0, Math.min(1, v));
const ramp = (v, lo, hi) => clamp((v - lo) / (hi - lo));

export function tasteDisabled() {
  return new Set((process.env.UNSLOP_TASTE_OFF || '').split(',').map((x) => x.trim()).filter(Boolean));
}

/** signals + craft score -> {proof, components, caps}. `off` zeroes components (mutation tests); 'reference' lifts the compare gate. */
export function tasteScore(t, craft, { compared = false } = {}, off = tasteDisabled()) {
  const c = {};
  const put = (name, frac, why) => { c[name] = { points: off.has(name) ? 0 : Math.round(TASTE_COMPONENTS[name] * clamp(frac)), max: TASTE_COMPONENTS[name], why }; };
  const f = t.subjectFrac;
  const single = f < 0.1 ? 0 : f < 0.25 ? 0.9 * ramp(f, 0.1, 0.25) : f <= 0.6 ? 1 : f <= 0.97 ? 0.6 : 0.5;
  put('subject', Math.max(single, 0.7 * ramp(t.mediaFrac, 0.1, 0.25)), `largest subject ${Math.round(f * 100)}% of the first screen (${t.subjectKind || 'none'}), all subjects ${Math.round(t.mediaFrac * 100)}%`);
  put('display', t.app ? 0.6 : ramp(t.display, 70, 88), `display line ${Math.round(t.display)} px${t.app ? ' (app screen)' : ''}`);
  put('overlap', t.overlap > 0 ? 1 : 0, t.overlap > 0 ? `${t.overlap} layers overlap the subject` : 'nothing overlaps the subject');
  const g = t.ground === undefined ? 0 : t.ground;
  put('ground', 0.5 * (g >= 0.55 ? 1 : ramp(g, 0.3, 0.55)) + 0.5 * (1 - ramp(t.accent ?? 1, 0.03, 0.1)), `ground colour ${Math.round(g * 100)}% of the first screen, accents ${((t.accent ?? 0) * 100).toFixed(1)}%`);
  put('keyword', t.keyword ? 0 : 1, t.keyword ? `${t.keyword} coloured or gradient keyword(s) in the headline` : 'no coloured headline keyword');
  let proof = Object.values(c).reduce((a, v) => a + v.points, 0);
  const caps = [];
  if (c.subject.points === 0) { proof = Math.min(proof, 10); caps.push('no real subject on the first screen: proof capped at 10'); }
  if (!t.app && t.display < 80) { proof = Math.min(proof, 55); caps.push('display line under 80 px: proof capped at 55'); }
  return { proof, pass: proof >= PROOF_PASS, compared: !!compared || off.has('reference'), components: c, caps, signals: t };
}

// Owner reading, one number, 100 is the worst. Taste not proven pulls it up; tells (genre defaults) count less the more is proven.
export function ownerSlop(tells, proof) {
  return Math.max(100 - proof, Math.round(Math.min(100, tells) * (0.2 + 0.8 * (1 - proof / 100))));
}
