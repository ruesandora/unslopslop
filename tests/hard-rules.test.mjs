// The AI-default font list in code and in references/ai-default-fonts.md must agree.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { AI_DEFAULT_LIST } from '../skills/unslopslop/scripts/lib/ai-default-fonts.mjs';

test('every AI-default font in code is listed in the reference', async () => {
  const md = (await readFile(new URL('../skills/unslopslop/references/ai-default-fonts.md', import.meta.url), 'utf8')).toLowerCase();
  for (const f of AI_DEFAULT_LIST) assert.ok(md.includes(`- ${f}\n`), f);
});
