import test from 'node:test';
import assert from 'node:assert/strict';
import { rulePoints, score, verdict } from '../skills/unslopslop/scripts/lib/score.mjs';
import { catalogue } from '../skills/unslopslop/scripts/lib/gen-catalogue.mjs';
import { readFile } from 'node:fs/promises';

test('points scale with severity and cap at 2x', () => {
  assert.equal(rulePoints('critical', 1), 12);
  assert.equal(rulePoints('major', 1), 6);
  assert.equal(rulePoints('minor', 1), 2);
  assert.equal(rulePoints('major', 3), 9);
  assert.equal(rulePoints('major', 99), 12);
});
test('score sums, rounds and caps at 100', () => {
  assert.equal(score([]), 0);
  assert.equal(score([{ severity: 'major', count: 1 }, { severity: 'minor', count: 1 }]), 8);
  assert.equal(score(Array.from({ length: 20 }, () => ({ severity: 'critical', count: 9 }))), 100);
});
test('verdict thresholds', () => {
  assert.equal(verdict(0, []), 'clean');
  assert.equal(verdict(9, [{ severity: 'major' }]), 'clean');
  assert.equal(verdict(9, [{ severity: 'critical' }]), 'light');
  assert.equal(verdict(10, []), 'light');
  assert.equal(verdict(34, []), 'light');
  assert.equal(verdict(35, []), 'heavy');
});
test('references/rules.md is in sync with rules.mjs', async () => {
  const disk = await readFile(new URL('../skills/unslopslop/references/rules.md', import.meta.url), 'utf8');
  assert.equal(disk, catalogue());
});
