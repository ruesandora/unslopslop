#!/usr/bin/env node
// Motion measurement. Reads durations, delays and easings the page declares, and optionally samples a
// moving element frame by frame to measure what actually happens.
//
//   node motion-probe.mjs <file|url> [--trigger "click:#btn" | "hover:.card" | "load"] [--sample "#el"] [--ms 1500] [--json]
//
// Declared: every running animation (document.getAnimations) and every element with a CSS transition.
// Sampled: opacity and bounding box of --sample on every animation frame after the trigger; the output gives
// start/end time, peak overshoot and a coarse easing class. Only timing is measured; looks are never copied.
import { launch } from './lib/browser.mjs';
import { toUrl } from './lib/analyze.mjs';

const args = process.argv.slice(2);
const o = { trigger: 'load', sample: null, ms: 1500, json: false };
let target;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--trigger') o.trigger = args[++i];
  else if (args[i] === '--sample') o.sample = args[++i];
  else if (args[i] === '--ms') o.ms = +args[++i];
  else if (args[i] === '--json') o.json = true;
  else target = args[i];
}
if (!target) { console.error('Usage: node motion-probe.mjs <file|url> [--trigger click:#id|hover:.sel|load] [--sample selector] [--ms 1500] [--json]'); process.exit(2); }

const browser = await launch();
const page = await (await browser.newContext({ viewport: { width: 1280, height: 720 }, reducedMotion: 'no-preference' })).newPage();
await page.goto(toUrl(target), { waitUntil: 'load', timeout: 20000 });

// Start the sampler before the trigger so the first frame is captured.
if (o.sample) {
  await page.evaluate(([selector, ms]) => {
    const el = document.querySelector(selector);
    window.__series = [];
    if (!el) return;
    const t0 = performance.now();
    const tick = () => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      window.__series.push({ t: performance.now() - t0, o: +s.opacity, x: r.left, y: r.top, w: r.width, h: r.height });
      if (performance.now() - t0 < ms) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [o.sample, o.ms]);
}
const [kind, sel] = o.trigger.split(/:(.+)/);
if (kind === 'click') await page.click(sel);
else if (kind === 'hover') await page.hover(sel);
await page.waitForTimeout(60);

const declared = await page.evaluate(() => {
  const name = (el) => {
    if (!el) return '?';
    return el.id ? '#' + el.id : el.tagName.toLowerCase() + ([...el.classList][0] ? '.' + [...el.classList][0] : '');
  };
  const rows = [];
  for (const a of document.getAnimations()) {
    const t = a.effect && a.effect.getTiming ? a.effect.getTiming() : {};
    const props = a.effect && a.effect.getKeyframes ? [...new Set(a.effect.getKeyframes().flatMap((k) => Object.keys(k)).filter((k) => !['offset', 'easing', 'composite', 'computedOffset'].includes(k)))] : [];
    rows.push({
      el: name(a.effect && a.effect.target), kind: a.transitionProperty ? 'transition' : 'animation', name: a.animationName || a.transitionProperty || '',
      props: props.join(',') || a.transitionProperty || '', duration: t.duration, delay: t.delay, easing: t.easing, iterations: t.iterations === Infinity ? 'infinite' : t.iterations,
    });
  }
  return rows;
});
await page.waitForTimeout(o.sample ? o.ms : 200);
let measured = null;
if (o.sample) {
  const series = await page.evaluate(() => window.__series || []);
  measured = analyse(series);
}
await browser.close();

function analyse(series) {
  if (series.length < 3) return { error: 'too few frames (is the selector right?)' };
  // pick the channel that changes most: opacity, x, y, w or h
  const ch = ['o', 'x', 'y', 'w', 'h'];
  const span = (k) => Math.max(...series.map((p) => p[k])) - Math.min(...series.map((p) => p[k]));
  const key = ch.sort((a, b) => span(b) - span(a))[0];
  const first = series[0][key], last = series[series.length - 1][key];
  const total = last - first;
  if (Math.abs(total) < 0.01 && span(key) < 0.5) return { error: 'nothing moved' };
  const prog = series.map((p) => ({ t: p.t, v: total === 0 ? 0 : (p[key] - first) / total }));
  const at = (frac) => (prog.find((p) => p.v >= frac) || prog[prog.length - 1]).t;
  const start = (prog.find((p) => Math.abs(p.v) > 0.02) || prog[0]).t;
  const end = (prog.find((p, i) => p.v >= 0.98 && prog.slice(i).every((q) => q.v >= 0.97 && q.v <= 1.03)) || prog[prog.length - 1]).t;
  const peak = Math.max(...prog.map((p) => p.v));
  const mid = (() => {
    const tm = start + (end - start) / 2;
    return (prog.find((p) => p.t >= tm) || prog[prog.length - 1]).v;
  })();
  const easing = peak > 1.04 ? 'overshoot (spring-like)' : mid > 0.62 ? 'ease-out' : mid < 0.38 ? 'ease-in' : Math.abs(mid - 0.5) < 0.07 && at(0.25) - start > (end - start) * 0.2 ? 'linear or ease-in-out' : 'ease-in-out';
  return { channel: { o: 'opacity', x: 'x', y: 'y', w: 'width', h: 'height' }[key], from: +first.toFixed(2), to: +last.toFixed(2), startMs: Math.round(start), endMs: Math.round(end), durationMs: Math.round(end - start), t50Ms: Math.round(at(0.5)), overshoot: +(Math.max(0, peak - 1)).toFixed(3), easingClass: easing, frames: series.length };
}

if (o.json) console.log(JSON.stringify({ declared, measured }, null, 2));
else {
  console.log('| Element | Kind | Name | Properties | Duration (ms) | Delay (ms) | Easing | Iterations |\n|---|---|---|---|---|---|---|---|');
  for (const r of declared) console.log(`| ${r.el} | ${r.kind} | ${r.name} | ${r.props} | ${r.duration} | ${r.delay} | ${r.easing} | ${r.iterations} |`);
  if (!declared.length) console.log('| (no running animations or transitions at probe time) | | | | | | | |');
  if (measured) console.log('\nMeasured: ' + JSON.stringify(measured));
}
