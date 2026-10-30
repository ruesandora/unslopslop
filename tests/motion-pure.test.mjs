import test from 'node:test';
import assert from 'node:assert/strict';
import { render, PERIOD } from '../examples/motion-pure/render.mjs';

test('render(t) is deterministic', () => {
  assert.deepEqual(render(1.25, { pointer: { x: 100, y: 80 } }), render(1.25, { pointer: { x: 100, y: 80 } }));
});
test('render loops exactly every PERIOD seconds', () => {
  assert.deepEqual(render(0.5), render(0.5 + PERIOD));
  assert.deepEqual(render(0.5), render(0.5 + 3 * PERIOD));
});
test('time changes the frame, and the pointer enlarges nearby dots only', () => {
  assert.notDeepEqual(render(0), render(1.5));
  const a = render(0), b = render(0, { pointer: { x: 12, y: 12 } });
  assert.ok(b[0].r > a[0].r + 1);
  assert.equal(b[b.length - 1].r, a[a.length - 1].r);
});
