// intake.mjs writes notes with fonts, palette and motion, and appends a catalogue row.
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile, readdir, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const S = fileURLToPath(new URL('../skills/unslopslop/scripts/intake.mjs', import.meta.url));
const page = fileURLToPath(new URL('../examples/saas-landing/after.html', import.meta.url));
const env = { ...process.env };
delete env.NODE_TEST_CONTEXT;

test('intake captures fonts, palette, full easing curves and a catalogue row', async () => {
  const root = await mkdtemp(join(tmpdir(), 'unslop-insp-'));
  try {
    const r = spawnSync(process.execPath, [S, page, '--root', root, '--tags', 'domain:web, mood:calm', '--date', '2026-10-30'], { encoding: 'utf8', env });
    assert.equal(r.status, 0, r.stderr);
    const [dir] = (await readdir(root)).filter((d) => d.startsWith('2026-10-30-'));
    const notes = await readFile(join(root, dir, 'notes.md'), 'utf8');
    assert.match(notes, /Schibsted Grotesk/);
    assert.match(notes, /rgb\(12, 15, 23\)/);
    assert.match(notes, /cubic-bezier\(0\.16, 1, 0\.3, 1\)/);
    assert.match(notes, /`domain:web`/);
    assert.ok((await stat(join(root, dir, 'thumb.jpg'))).size > 1000);
    assert.match(await readFile(join(root, 'catalog.md'), 'utf8'), /\| 2026-10-30 \| Fluxly.*domain:web, mood:calm/);
  } finally { await rm(root, { recursive: true, force: true }); }
});
