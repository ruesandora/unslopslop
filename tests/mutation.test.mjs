// Proof that the fixtures test something: with a rule disabled, exactly that rule's
// "fires on bad fixture" test must fail (and its "quiet on good" test must still pass).
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { RULES } from '../skills/unslopslop/scripts/lib/rules.mjs';
import { BLAND } from '../skills/unslopslop/scripts/lib/rules-bland.mjs';

const cleanEnv = { ...process.env };
delete cleanEnv.NODE_TEST_CONTEXT;
const testFile = fileURLToPath(new URL('./rules.test.mjs', import.meta.url));

for (const rule of [...RULES, ...BLAND]) {
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

// Same proof for the craft score: switching a component off must fail exactly its test.
import { COMPONENTS } from '../skills/unslopslop/scripts/lib/craft.mjs';
const craftFile = fileURLToPath(new URL('./craft.test.mjs', import.meta.url));
for (const name of Object.keys(COMPONENTS)) {
  test(`switching off craft component ${name} breaks its test`, () => {
    const run = (off) =>
      spawnSync(process.execPath, ['--test', '--test-reporter=spec', craftFile], {
        encoding: 'utf8',
        env: { ...cleanEnv, UNSLOP_CRAFT_ONLY: name, UNSLOP_CRAFT_OFF: off },
      });
    const on = run('');
    assert.equal(on.status, 0, `control run must pass for ${name}:\n${on.stdout}`);
    const off = run(name);
    assert.notEqual(off.status, 0, `${name}: craft test still passes with the component off`);
    assert.match(off.stdout, new RegExp(`✖ rich page earns points for ${name}`));
  });
}
