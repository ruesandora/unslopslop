// Craft score: the positive half of the report. Slop score says what is wrong (lower is better);
// craft score says whether the page has the qualities a good studio would ship (higher is better).
//
// craftProbe(h) runs in the page (serialised with toString(), keep it self-contained) and returns
// raw signals. craftScore(signals, css) runs in Node and turns them into six components:
//
//   hierarchy 15  type scale: display size against body, and number of distinct steps
//   focal     15  one dominant element on the first screen (display headline and/or a large visual)
//   visual    20  a real visual on the first screen (product view, image, canvas, drawing), by area
//   motion    15  something moves, it moves inside the visual (a demo, not wallpaper), reduced motion handled
//   identity  20  a chosen web font, a display face distinct from the text face, an accent combination, depth, texture
//   density   15  amount of content on the first screen fits the page type (app screens dense, landings balanced)
//
// A page passes only with a clean slop verdict AND craft >= CRAFT_PASS.

export const CRAFT_PASS = 70;
export const COMPONENTS = { hierarchy: 15, focal: 15, visual: 20, motion: 15, identity: 20, density: 15 };

export function craftProbe(h) {
  const vpA = h.vw * h.vh;
  const body = h.bodySize();
  const texts = h.textEls();
  const firsts = texts.filter((e) => h.rect(e).top < h.vh && h.rect(e).bottom > 0);
  const sizes = new Set(texts.map((e) => Math.round(h.px(h.cs(e).fontSize))));
  const display = Math.max(body, ...firsts.map((e) => h.px(h.cs(e).fontSize)));
  const vis = h.visuals();
  const visFrac = Math.min(1, vis.reduce((a, v) => a + v.frac, 0));
  const bestVis = vis.reduce((a, v) => Math.max(a, v.frac), 0);

  // motion: frames requested, DOM changes, running or declared animations, and where they happen
  const m = h.motion();
  const animTargets = [];
  if (document.getAnimations) for (const a of document.getAnimations()) if (a.effect && a.effect.target) animTargets.push(a.effect.target);
  for (const e of h.all()) if (h.cs(e).animationName !== 'none') animTargets.push(e);
  const movers = [...new Set([...animTargets, ...(m.nodes || []).filter(Boolean)])].filter((e) => e.nodeType === 1 && e !== document.body && e !== document.documentElement);
  const inVisual = movers.filter((e) => vis.some((v) => v.el.contains(e))).length;
  const canvasLive = m.raf >= 10 && vis.some((v) => v.el.tagName === 'CANVAS' || v.el.querySelector('canvas, svg'));

  // identity: fonts, accent, depth
  const loaded = [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replace(/["']/g, '').toLowerCase());
  const famOf = (el) => (el ? h.cs(el).fontFamily.split(',')[0].replace(/["']/g, '').trim().toLowerCase() : '');
  const h1 = document.querySelector('h1');
  const bodyFam = famOf(document.body), headFam = famOf(h1);
  const hues = [];
  let accentUses = 0;
  for (const e of h.all()) {
    const s = h.cs(e);
    for (const t of [s.color, s.backgroundColor, s.borderTopColor, s.fill, s.stroke]) {
      const c = t && t !== 'none' ? h.rgba(t) : null;
      if (h.saturated(c)) { accentUses++; hues.push(Math.round(h.hsl(c).h / 30)); }
    }
  }
  let shadows = 0, layered = 0;
  for (const e of h.all()) {
    const s = h.cs(e);
    if (s.boxShadow && s.boxShadow !== 'none') shadows++;
    if (s.position === 'absolute' && h.rect(e).width * h.rect(e).height > 0.01 * vpA) layered++;
  }

  const tex = h.textures();
  // density: page type and first-screen coverage
  const app = h.isApp();
  return {
    body, display, steps: sizes.size, visFrac, bestVis, visKinds: vis.map((v) => v.kind),
    raf: m.raf, mut: m.mut, movers: movers.length, inVisual, canvasLive, mq: (m.mq || []).filter((q) => /reduced-motion/.test(q)).length,
    webfont: !!loaded.length && (loaded.includes(bodyFam) || loaded.includes(headFam)), distinctFaces: !!headFam && headFam !== bodyFam,
    accentUses, accentHues: new Set(hues).size, shadows, layered, textures: tex.length, textureKinds: [...new Set(tex.map((t) => t.kind))],
    app, firstTexts: firsts.length, coverage: h.coverage(),
  };
}

const clamp = (v) => Math.max(0, Math.min(1, v));
const ramp = (v, lo, hi) => clamp((v - lo) / (hi - lo));

/** signals -> {score, components:{name:{points,max,why}}}. `off` zeroes components (mutation tests). */
export function craftScore(s, css = '', off = craftDisabled()) {
  const c = {};
  const put = (name, frac, why) => { c[name] = { points: off.has(name) ? 0 : Math.round(COMPONENTS[name] * clamp(frac)), max: COMPONENTS[name], why }; };
  const ratio = s.display / s.body;
  put('hierarchy', 0.7 * (s.app ? ramp(ratio, 1.3, 2.4) : ramp(ratio, 1.6, 3.5)) + 0.3 * ramp(s.steps, 3, 6), `display ${Math.round(s.display)}px / body ${s.body}px = ${ratio.toFixed(2)}x, ${s.steps} sizes`);
  const bigType = s.app ? ratio >= 1.8 : ratio >= 2.5;
  put('focal', Math.max(s.app ? ramp(ratio, 1.4, 2.4) : ramp(ratio, 2, 4), ramp(s.bestVis, 0.08, 0.3)) * 0.7 + (bigType && s.bestVis >= 0.12 ? 0.3 : 0), `headline ${ratio.toFixed(1)}x, largest visual ${Math.round(s.bestVis * 100)}% of the screen`);
  put('visual', ramp(s.visFrac, 0.04, 0.3), `${Math.round(s.visFrac * 100)}% of the first screen is visual (${s.visKinds.join(', ') || 'none'})`);
  const moves = s.raf >= 10 || s.mut >= 5 || s.movers > 0;
  const reduced = s.mq > 0 || /prefers-reduced-motion/i.test(css);
  const demo = s.inVisual > 0 || s.canvasLive;
  put('motion', moves ? 0.45 + (demo ? 0.35 : 0) + (reduced ? 0.2 : 0) - (s.movers > 24 ? 0.25 : 0) : 0,
    moves ? `${demo ? 'moves inside the visual' : 'moves outside any visual'}, ${s.movers} moving elements, reduced motion ${reduced ? 'handled' : 'not handled'}` : 'nothing moves');
  const oneAccent = s.accentUses >= 3 && s.accentHues <= 3;
  put('identity', (s.webfont ? 0.25 : 0) + (s.distinctFaces ? 0.1 : 0) + (oneAccent ? 0.25 : s.accentUses > 0 ? 0.1 : 0) + ramp(s.shadows + s.layered, 0, 3) * 0.2 + ramp(s.textures, 0, 2) * 0.2,
    `${s.webfont ? 'web font' : 'no web font'}, ${s.distinctFaces ? 'display face differs from text' : 'one face'}, accent used ${s.accentUses}x in ${s.accentHues} hue band(s), ${s.shadows} shadows, ${s.layered} layers, ${s.textures} textured areas (${(s.textureKinds || []).join(', ') || 'none'})`);
  const dens = s.app ? ramp(s.firstTexts, 15, 70) : Math.min(ramp(s.coverage, 0.1, 0.3), 1 - ramp(s.coverage, 0.75, 0.95));
  put('density', dens, s.app ? `app screen, ${s.firstTexts} text items on the first screen` : `landing, ${Math.round(s.coverage * 100)}% of the first screen holds content`);
  const score = Object.values(c).reduce((a, v) => a + v.points, 0);
  return { score, pass: score >= CRAFT_PASS, components: c };
}

export function craftDisabled() {
  return new Set((process.env.UNSLOP_CRAFT_OFF || '').split(',').map((x) => x.trim()).filter(Boolean));
}

// Installed before any page script runs: counts animation frames, DOM changes and media queries.
export const MOTION_INIT = `(() => {
  const m = window.__unslopMotion = { raf: 0, mut: 0, nodes: [], mq: [] };
  const R = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = (cb) => { m.raf++; return R(cb); };
  const MM = window.matchMedia.bind(window);
  window.matchMedia = (q) => { m.mq.push(String(q)); return MM(q); };
  const start = () => new MutationObserver((list) => { for (const r of list) { m.mut++; const n = r.target.nodeType === 1 ? r.target : r.target.parentElement; if (n && m.nodes.length < 400) m.nodes.push(n); } })
    .observe(document.documentElement, { subtree: true, attributes: true, characterData: true, childList: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})()`;
