import { PASSES, RULES } from './rules.mjs';
import { BLAND } from './rules-bland.mjs';
import { CRAFT_PASS } from './craft.mjs';
import { PROOF_PASS } from './taste.mjs';

const NEXT = {
  heavy: 'Rebuild: the page is carrying a lot of generic patterns. Re-direct (DESIGN.md), then run the fix passes in order and re-run this detector after each pass.',
  light: 'Polish: fix the findings below pass by pass; no need to redo the layout.',
  clean: 'Clean: do not touch it. Run the template test (swap the brand name; if it still fits, add one signature move).',
};

export function toJson(result) {
  const byPass = Object.fromEntries(PASSES.map((p) => [p, result.findings.filter((f) => f.pass === p).reduce((a, f) => a + f.points, 0)]));
  return {
    tool: 'unslopslop', version: 1, target: result.target, score: result.score, patternScore: result.patternScore ?? result.score, tells: result.tells ?? null, taste: result.taste ?? null, rawPoints: +result.findings.reduce((a, f) => a + f.points, 0).toFixed(1), verdict: result.verdict,
    rulesChecked: RULES.length + BLAND.length - (result.disabled || 0), byPass, findings: result.findings,
    craft: result.craft ? { score: result.craft.score, passMark: CRAFT_PASS, pass: result.craft.pass, components: result.craft.components, findings: result.craft.findings, signals: result.craft.signals } : null,
    overall: result.overall ?? null, errors: result.errors,
  };
}

export function toMarkdown(result) {
  const j = toJson(result);
  const L = [];
  L.push(`# unslopslop report`, '');
  L.push(`- Target: \`${result.target}\``);
  L.push(`- Slop score: **${j.score}/100** (owner reading: 100 is the worst). It is the worse of "taste not proven" (100 minus the taste proof${j.taste ? ' ' + j.taste.proof : ''}) and the genre-default tells${j.tells !== null ? ' (' + j.tells + ' pts)' : ''}, which count less the more taste is proven. Rule-only pattern slop: ${j.patternScore} (raw ${j.rawPoints}).`);
  if (j.taste) {
    L.push(`- Taste proof: **${j.taste.proof}/100** (higher is better; pass mark ${PROOF_PASS})${j.taste.caps.length ? '. ' + j.taste.caps.join('; ') : ''}`);
    for (const [k, v] of Object.entries(j.taste.components)) L.push(`  - ${k} ${v.points}/${v.max}: ${v.why}`);
  }
  if (j.craft && j.craft.score !== null) L.push(`- Craft score: **${j.craft.score}/100** (higher is better; pass mark ${j.craft.passMark})`);
  if (j.overall) L.push(`- Overall: **${j.overall.toUpperCase()}** (needs a slop verdict that is not HEAVY, craft >= ${CRAFT_PASS}, taste proof >= ${PROOF_PASS}; UNPROVEN until a side-by-side reference compare was run: detect --compared <compare.png>)`);
  L.push(`- Slop verdict: **${j.verdict.toUpperCase()}**. ${NEXT[j.verdict]}`);
  L.push(`- Rules checked: ${j.rulesChecked}; findings: ${j.findings.length}`, '');
  L.push('## Points by fix pass', '', '| Pass | Points |', '|---|---|');
  for (const p of PASSES) L.push(`| ${p} | ${+j.byPass[p].toFixed(1)} |`);
  L.push('');
  if (j.craft && j.craft.score !== null) {
    L.push('## Craft', '', '| Component | Points | Reading |', '|---|---|---|');
    for (const [k, v] of Object.entries(j.craft.components)) L.push(`| ${k} | ${v.points}/${v.max} | ${v.why} |`);
    L.push('');
    if (j.craft.findings.length) {
      L.push('### Bland signals (the opposite failure: stripped too far)', '');
      for (const f of j.craft.findings) {
        L.push(`- **${f.rule}** (${f.severity}): ${f.title}. ${f.why} Fix: ${f.fix}`);
        for (const e of f.examples) L.push(`  - \`${e.el}\`: ${e.detail}`);
      }
      L.push('');
    }
  }
  if (!j.findings.length) L.push('No slop findings.', '');
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
