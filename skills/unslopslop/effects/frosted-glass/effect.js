FX.mount({
  title: 'Frosted glass',
  summary: 'Hand-poured glass with no grid: a smooth noise field bends the picture, then a small jittered blur softens it. Panel mode limits it to one rounded pane so the sharp scene stays around it.',
  cost: 'Nine texture reads per pixel plus noise. Medium. On phones keep it to one pane, or use the CSS backdrop-filter version (frosted-panel).',
  fallback: 'No WebGL: the CSS gradient. For UI panes prefer backdrop-filter, with a solid tinted fill where it is unsupported.',
  slop: 'Every card is frosted, it floats over a purple-blue blob, or text sits on it below 4.5:1 contrast. One frosted surface per screen at most.',
  source: 'scene', palette: 'dusk', animated: false,
  params: [
    { id: 'amount', label: 'Refraction', min: 0, max: 1, step: 0.01, value: 0.35 },
    { id: 'scale', label: 'Bump scale', min: 1, max: 40, step: 0.5, value: 26 },
    { id: 'rough', label: 'Roughness', min: 0, max: 1, step: 0.01, value: 0.6 },
    { id: 'blur', label: 'Blur', min: 0, max: 1, step: 0.01, value: 0.6 },
    { id: 'split', label: 'Colour fringe', min: 0, max: 1, step: 0.01, value: 0.2 },
    { id: 'panel', label: 'Area', options: [['Whole frame', 0], ['One pane', 1]], value: 0 },
    { id: 'grain', label: 'Grain', min: 0, max: 0.3, step: 0.01, value: 0.06 }
  ],
  frag: [
    'float field(vec2 p) { return fbm(p, 2.0 + u_rough * 3.0); }',
    'void main() {',
    '  vec2 uv = v_uv; float asp = u_res.x / u_res.y; vec2 p = uv * vec2(asp, 1.0) * u_scale;',
    '  float e = 0.05;',
    '  vec2 g = vec2(field(p + vec2(e, 0.0)) - field(p - vec2(e, 0.0)), field(p + vec2(0.0, e)) - field(p - vec2(0.0, e))) / (2.0 * e);',
    '  vec2 off = g * u_amount * 0.012;',
    '  vec3 c = vec3(0.0); float r = u_blur * 0.06;',
    '  for (int i = 0; i < 12; i++) { float a = float(i) * 2.39996 + hash(gl_FragCoord.xy) * 6.28; float d = sqrt((float(i) + 0.5) / 12.0);',
    '    c += src(uv + off + vec2(cos(a), sin(a)) * d * r * vec2(1.0 / asp, 1.0)); }',
    '  c /= 12.0;',
    '  float f = u_split * 0.012;',
    '  c.r = mix(c.r, src(uv + off * 1.15 + f).r, 0.6); c.b = mix(c.b, src(uv + off * 0.85 - f).b, 0.6);',
    '  c = mix(c, vec3(1.0), 0.06);',                                   /* glass lifts the blacks a touch */
    '  vec3 sharp = src(uv);',
    '  float m = 1.0;',
    '  if (u_panel > 0.5) { vec2 q = (uv - vec2(0.62, 0.5)) * vec2(asp, 1.0); vec2 b = vec2(0.42, 0.32);',
    '    vec2 d = abs(q) - b + 0.05; float sd = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - 0.05;',
    '    m = smoothstep(0.002, -0.002, sd);',
    '    c += smoothstep(0.004, 0.0, abs(sd)) * 0.35 * (0.6 + 0.4 * (q.y > 0.0 ? 1.0 : 0.3)); }',  /* thin lit rim */
    '  gl_FragColor = vec4(finish(mix(sharp, c, m)), 1.0);',
    '}'
  ].join('\n')
});
