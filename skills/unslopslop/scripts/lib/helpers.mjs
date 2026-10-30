// Page-side helpers. This function is serialised with toString() and executed
// inside the page, so it must stay fully self-contained (no imports, no closures).
export function makeHelpers(vp) {
  const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'META', 'LINK', 'HEAD', 'TITLE', 'BR', 'TEMPLATE', 'HTML']);
  const cs = (el) => getComputedStyle(el);
  const cache = { all: null, textEls: null, canvas: null, colors: new Map() };

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

  return {
    vw: vp.w, vh: vp.h, mobile: vp.w < 600,
    cs, all, own, textEls, sel, snip, px, rect, rgba, lum, contrast, hsl, hex, bgOf, colorTokens, heading, isCard, visible,
  };
}
