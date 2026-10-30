// Page-side helpers. This function is serialised with toString() and executed
// inside the page, so it must stay fully self-contained (no imports, no closures).
export function makeHelpers(vp) {
  const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'META', 'LINK', 'HEAD', 'TITLE', 'BR', 'TEMPLATE', 'HTML']);
  const cs = (el) => getComputedStyle(el);
  const cache = { all: null, textEls: null, canvas: null, colors: new Map(), visuals: null };

  const visible = (el) => {
    const s = cs(el);
    if (s.display === 'none' || s.visibility === 'hidden' || parseFloat(s.opacity) === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const all = () => {
    if (cache.all) return cache.all;
    cache.all = [...document.body.querySelectorAll('*')].filter(
      (e) => !SKIP.has(e.tagName) && !(e instanceof SVGElement && e.tagName.toLowerCase() !== 'svg') && visible(e)
    );
    return cache.all;
  };
  const own = (el) =>
    [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(' ').replace(/\s+/g, ' ').trim();
  const textEls = () => {
    if (cache.textEls) return cache.textEls;
    cache.textEls = all().filter((e) => own(e).length > 0);
    return cache.textEls;
  };
  const sel = (el) => {
    if (!el || !el.tagName) return '?';
    if (el.id) return `#${el.id}`;
    const cls = [...el.classList].slice(0, 2).join('.');
    return el.tagName.toLowerCase() + (cls ? `.${cls}` : '');
  };
  const snip = (s, n = 60) => (s.length > n ? s.slice(0, n - 1) + '…' : s);
  const px = (v) => {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : 0;
  };
  const rect = (el) => el.getBoundingClientRect();

  // colour -> {r,g,b,a} through a 1x1 canvas (handles rgb, hex, oklch, color() ...)
  const rgba = (str) => {
    if (!str) return null;
    if (cache.colors.has(str)) return cache.colors.get(str);
    if (!cache.canvas) {
      cache.canvas = document.createElement('canvas');
      cache.canvas.width = cache.canvas.height = 1;
    }
    const ctx = cache.canvas.getContext('2d', { willReadFrequently: true });
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#010203';
    ctx.fillStyle = str;
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    const out = { r: d[0], g: d[1], b: d[2], a: d[3] / 255 };
    cache.colors.set(str, out);
    return out;
  };
  const lum = ({ r, g, b }) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const contrast = (a, b) => {
    const l1 = lum(a), l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };
  const hsl = ({ r, g, b }) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
    if (max === min) return { h: 0, s: 0, l };
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h;
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    else if (max === g) h = ((b - r) / d + 2) * 60;
    else h = ((r - g) / d + 4) * 60;
    return { h, s, l };
  };
  const hex = ({ r, g, b }) => '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
  // Effective opaque background behind an element, or null when it is an image/gradient (unknown).
  const bgOf = (el) => {
    const layers = [];
    for (let e = el; e; e = e.parentElement) {
      const s = cs(e);
      if (s.backgroundImage && s.backgroundImage !== 'none') return null;
      const c = rgba(s.backgroundColor);
      if (c && c.a > 0) layers.push(c);
      if (c && c.a >= 1) break;
    }
    let base = { r: 255, g: 255, b: 255 };
    for (let i = layers.length - 1; i >= 0; i--) {
      const c = layers[i];
      base = { r: c.r * c.a + base.r * (1 - c.a), g: c.g * c.a + base.g * (1 - c.a), b: c.b * c.a + base.b * (1 - c.a) };
    }
    return base;
  };
  // Colour tokens inside a CSS value (gradients, shadows)
  const colorTokens = (value) => value.match(/(rgba?|hsla?|oklch|oklab|lab|lch|color)\([^)]*\)|#[0-9a-fA-F]{3,8}\b/g) || [];
  const heading = (el) => /^H[1-6]$/.test(el.tagName);
  const isCard = (el) => {
    const s = cs(el);
    const r = rect(el);
    if (r.width < 120 || r.height < 60) return false;
    if (['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'TABLE', 'TR', 'TD', 'TH', 'LI', 'A', 'IMG', 'SVG', 'svg'].includes(el.tagName)) return false;
    if (px(s.borderTopLeftRadius) < 6) return false;
    const bw = px(s.borderTopWidth) + px(s.borderLeftWidth);
    const border = bw >= 1 && s.borderTopStyle !== 'none' && (rgba(s.borderTopColor) || { a: 0 }).a > 0.05;
    const shadow = s.boxShadow && s.boxShadow !== 'none';
    let tinted = false;
    const bg = rgba(s.backgroundColor);
    if (bg && bg.a > 0.05 && el.parentElement) {
      const pb = bgOf(el.parentElement);
      const me = bgOf(el);
      tinted = !!(pb && me && Math.abs(pb.r - me.r) + Math.abs(pb.g - me.g) + Math.abs(pb.b - me.b) > 9);
    }
    return border || shadow || tinted;
  };

  // ---- craft helpers (used by the bland rules and the craft probe) ----
  const surfaceOf = (el) => {
    const s = cs(el);
    const sides = ['Top', 'Right', 'Bottom', 'Left'].filter((d) => px(s['border' + d + 'Width']) >= 1 && s['border' + d + 'Style'] !== 'none').length;
    const shadow = s.boxShadow && s.boxShadow !== 'none';
    const img = s.backgroundImage && s.backgroundImage !== 'none';
    let tint = false;
    const bg = rgba(s.backgroundColor);
    if (bg && bg.a > 0.05 && el.parentElement) {
      const pb = bgOf(el.parentElement), me = bgOf(el);
      tint = !!(pb && me && Math.abs(pb.r - me.r) + Math.abs(pb.g - me.g) + Math.abs(pb.b - me.b) > 9);
    }
    return sides >= 3 || shadow || tint || img;
  };
  // First-screen visuals: media (img, video, canvas), drawings (a real SVG, not an icon) and product
  // surfaces (a framed block holding a built UI). Outermost only. frac = share of the first screen.
  const visuals = () => {
    if (cache.visuals) return cache.visuals;
    const vpA = vp.w * vp.h;
    const found = [];
    for (const e of all()) {
      const r = rect(e);
      const t = Math.max(0, r.top), b = Math.min(vp.h, r.bottom), l = Math.max(0, r.left), rr = Math.min(vp.w, r.right);
      if (b <= t || rr <= l) continue;
      const a = (b - t) * (rr - l);
      const tag = e.tagName.toUpperCase();
      let kind = null;
      if (['IMG', 'VIDEO', 'CANVAS', 'PICTURE'].includes(tag) && r.width >= 120 && r.height >= 80) kind = 'media';
      else if (tag === 'SVG' && r.width >= 160 && r.height >= 100 && e.querySelectorAll('*').length >= 6) kind = 'drawing';
      else if (a >= 0.06 * vpA && r.width < vp.w * 0.95 && !['BODY', 'MAIN', 'HEADER', 'NAV', 'FOOTER'].includes(tag) && e.querySelectorAll('*').length >= 12 && surfaceOf(e)) kind = 'surface';
      if (kind) found.push({ el: e, kind, area: a, frac: a / vpA });
    }
    cache.visuals = found.filter((v) => !found.some((o) => o !== v && o.el.contains(v.el)));
    return cache.visuals;
  };
  // Share of the first screen (32x20 grid) covered by text or visuals.
  const coverage = () => {
    const boxes = [...textEls().map((e) => rect(e)), ...visuals().map((v) => rect(v.el))];
    let hit = 0;
    const C = 32, R = 20;
    for (let i = 0; i < C; i++) for (let j = 0; j < R; j++) {
      const x = (i + 0.5) * vp.w / C, y = (j + 0.5) * vp.h / R;
      if (boxes.some((b) => x >= b.left && x <= b.right && y >= b.top && y <= b.bottom)) hit++;
    }
    return hit / (C * R);
  };
  // Most used font size by characters (the body size).
  const bodySize = () => {
    const w = new Map();
    for (const el of textEls()) { const f = Math.round(px(cs(el).fontSize)); w.set(f, (w.get(f) || 0) + own(el).length); }
    return w.size ? [...w].sort((a, b) => b[1] - a[1])[0][0] : 16;
  };
  const saturated = (c) => { if (!c || c.a < 0.5) return false; const k = hsl(c); return k.s >= 0.4 && k.l >= 0.2 && k.l <= 0.8; };
  // App screen: a data table with 5+ rows, or a tall side navigation on the left.
  const isApp = () => {
    const rows = [...document.querySelectorAll('table tr, [role=row]')].filter(visible).length;
    const side = [...document.querySelectorAll('aside, nav')].some((e) => { const r = rect(e); return visible(e) && r.height >= 0.6 * vp.h && r.width < 0.3 * vp.w && r.left < 40; });
    return rows >= 5 || side;
  };
  // Texture and tone: large areas painted with an image, a pattern, grain or a tonal gradient.
  const textures = () => {
    const vpA = vp.w * vp.h;
    const out = [];
    for (const e of [document.documentElement, document.body, ...all()]) {
      const s = cs(e), r = rect(e);
      const bi = s.backgroundImage;
      if (r.width * r.height < 0.04 * vpA) continue;
      if ((bi && bi !== 'none' && /url\(|gradient\(/.test(bi)) || (s.maskImage && s.maskImage !== 'none')) out.push({ el: e, kind: /url\(/.test(bi) ? 'image' : 'gradient' });
    }
    for (const f of document.querySelectorAll('svg feTurbulence')) out.push({ el: f.closest('svg'), kind: 'noise' });
    return out;
  };
  const motion = () => window.__unslopMotion || { raf: 0, mut: 0, nodes: [], mq: [] };

  return {
    vw: vp.w, vh: vp.h, mobile: vp.w < 600,
    cs, all, own, textEls, sel, snip, px, rect, rgba, lum, contrast, hsl, hex, bgOf, colorTokens, heading, isCard, visible,
    surfaceOf, visuals, coverage, bodySize, saturated, motion, isApp, textures,
  };
}
