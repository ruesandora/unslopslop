import { PASSES, RULES } from './rules.mjs';

const NEXT = {
  heavy: 'Rebuild: the page is carrying a lot of generic patterns. Re-direct (DESIGN.md), then run the fix passes in order and re-run this detector after each pass.',
  light: 'Polish: fix the findings below pass by pass; no need to redo the layout.',
  clean: 'Clean: do not touch it. Run the template test (swap the brand name; if it still fits, add one signature move).',
};

export function toJson(result) {
  const byPass = Object.fromEntries(PASSES.map((p) => [p, result.findings.filter((f) => f.pass === p).reduce((a, f) => a + f.points, 0)]));
  return {
    tool: 'unslopslop', version: 1, target: result.target, score: result.score, rawPoints: +result.findings.reduce((a, f) => a + f.points, 0).toFixed(1), verdict: result.verdict,
    rulesChecked: RULES.length - (result.disabled || 0), byPass, findings: result.findings, errors: result.errors,
  };
}

export function toMarkdown(result) {
  const j = toJson(result);
  const L = [];
  L.push(`# unslopslop report`, '');
  L.push(`- Target: \`${result.target}\``);
  L.push(`- Slop score: **${j.score}/100** (0 = clean; raw points before the 100 cap: ${j.rawPoints})`);
  L.push(`- Verdict: **${j.verdict.toUpperCase()}**. ${NEXT[j.verdict]}`);
  L.push(`- Rules checked: ${j.rulesChecked}; findings: ${j.findings.length}`, '');
  L.push('## Points by fix pass', '', '| Pass | Points |', '|---|---|');
  for (const p of PASSES) L.push(`| ${p} | ${+j.byPass[p].toFixed(1)} |`);
  L.push('');
  if (!j.findings.length) L.push('No findings.', '');
  for (const p of PASSES) {
    const fs = j.findings.filter((f) => f.pass === p);
    if (!fs.length) continue;
    L.push(`## ${p}`, '');
    for (const f of fs) {
      L.push(`### ${f.rule} (${f.severity}, ${f.points} pts, x${f.count}, ${f.viewports.join('+')})`);
      L.push(`${f.title}. ${f.why}`);
      L.push(`Fix: ${f.fix}`);
      for (const e of f.examples) L.push(`- \`${e.el}\`: ${e.detail} [${e.viewport}]`);
      L.push('');
    }
  }
  if (j.errors.length) L.push('## Rule errors', '', ...j.errors.map((e) => `- ${e}`), '');
  return L.join('\n');
}
