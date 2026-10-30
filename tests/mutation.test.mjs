// Proof that the fixtures test something: with a rule disabled, exactly that rule's
// "fires on bad fixture" test must fail (and its "quiet on good" test must still pass).
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { RULES } from '../skills/unslopslop/scripts/lib/rules.mjs';

const cleanEnv = { ...process.env };
delete cleanEnv.NODE_TEST_CONTEXT;
const testFile = fileURLToPath(new URL('./rules.test.mjs', import.meta.url));

for (const rule of RULES) {
  test(`disabling ${rule.id} breaks its test`, () => {
    const run = (disable) =>
      spawnSync(process.execPath, ['--test', '--test-reporter=spec', testFile], {
        encoding: 'utf8',
        env: { ...cleanEnv, UNSLOP_ONLY: rule.id, UNSLOP_DISABLE: disable },
      });
    const enabled = run('');
    assert.equal(enabled.status, 0, `control run must pass for ${rule.id}:\n${enabled.stdout}`);
    const disabled = run(rule.id);
    assert.notEqual(disabled.status, 0, `${rule.id}: tests still pass with the rule disabled`);
    assert.match(disabled.stdout, new RegExp(`✖ ${rule.id} fires on bad fixture`));
    assert.match(disabled.stdout, new RegExp(`✔ ${rule.id} stays quiet on good fixture`));
  });
}
