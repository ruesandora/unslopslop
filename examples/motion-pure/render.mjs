// A texture as a pure function of time: same (t, size, pointer) in, same dots out.
// No Date.now, no Math.random, no state. That makes it testable and lets you export frame-exact
// video by stepping t by 1/30 s and screenshotting each frame. Loops every PERIOD seconds.
export const PERIOD = 6;

export function render(t, { w = 640, h = 360, pointer = null, gap = 24 } = {}) {
  const dots = [];
  const phase = ((t % PERIOD) + PERIOD) % PERIOD / PERIOD; // 0..1, loops
  for (let y = gap / 2; y < h; y += gap) {
    for (let x = gap / 2; x < w; x += gap) {
      const wave = Math.sin(2 * Math.PI * (phase - (x + y) / (w + h)));
      let r = 1.6 + 0.6 * wave;
      if (pointer) {
        const d = Math.hypot(x - pointer.x, y - pointer.y);
        r += 3 * Math.max(0, 1 - d / 120) ** 2; // swells near the pointer, one smooth falloff
      }
      dots.push({ x, y, r: +r.toFixed(3) });
    }
  }
  return dots;
}
