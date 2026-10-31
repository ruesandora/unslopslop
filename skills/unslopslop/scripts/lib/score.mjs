import { WEIGHTS } from './rules.mjs';

// Points for one rule: its severity weight, +25% per extra occurrence, capped at 2x.
export function rulePoints(severity, count) {
  const w = WEIGHTS[severity];
  return Math.min(w * 2, w * (1 + 0.25 * Math.max(0, count - 1)));
}

// findings: [{rule, severity, count}]. Score 0 (clean) to 100 (pure slop).
export function score(findings) {
  const total = findings.reduce((a, f) => a + rulePoints(f.severity, f.count), 0);
  return Math.min(100, Math.round(total));
}

// clean: nothing to do. light: polish the listed items. heavy: rebuild the page, then re-run.
// cleanBelow: 10 for pattern points; 20 for the owner reading (a proven page keeps a small "not yet perfect" remainder).
export function verdict(points, findings, cleanBelow = 10) {
  if (points >= 35) return 'heavy';
  if (points < cleanBelow && !findings.some((f) => f.severity === 'critical')) return 'clean';
  return 'light';
}
