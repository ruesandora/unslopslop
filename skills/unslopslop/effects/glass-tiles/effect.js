FX.mount({
  title: 'Glass tiles',
  summary: 'A wall of square glass blocks. Every tile is a small two-way prism that shows its own shifted, slightly magnified piece of the picture, with a dark seam and a lit top edge.',
  cost: 'Five texture reads per pixel. Cheap and static.',
  fallback: 'No WebGL: the CSS gradient. A CSS approximation is a background-size grid of inset shadows over a blurred image.',
  slop: 'Tiles under about 24 px (it turns into a screen-door), or used behind text.',
  source: 'gradient', palette: 'seaglass', animated: false,
  params: [
    { id: 'cells', label: 'Tiles across', min: 3, max: 40, step: 1, value: 9 },
    { id: 'amount', label: 'Refraction', min: 0, max: 1, step: 0.01, value: 0.6 },
    { id: 'blur', label: 'Softness', min: 0, max: 1, step: 0.01, value: 0.35 },
    { id: 'shadow', label: 'Seam shadow', min: 0, max: 1, step: 0.01, value: 0.4 },
    { id: 'highlight', label: 'Edge light', min: 0, max: 1, step: 0.01, value: 0.3 },
    { id: 'grain', label: 'Grain', min: 0, max: 0.3, step: 0.01, value: 0.05 }
  ],
  frag: [
    'void main() {',
    '  float asp = u_res.x / u_res.y; vec2 g = v_uv * vec2(asp, 1.0) * u_cells / asp;',
    '  vec2 id = floor(g), s = fract(g) - 0.5;',
    '  vec2 cellUV = (id + 0.5) / (u_cells / asp) / vec2(asp, 1.0);',
    '  vec2 off = s * u_amount * -1.6 / (u_cells / asp) / vec2(asp, 1.0);',   /* each tile magnifies around its centre */
    '  vec2 base = v_uv + off;',
    '  float r = u_blur * 0.4 / u_cells;',
    '  vec3 c = src(base) * 0.4 + (src(base + vec2(r, 0.0)) + src(base - vec2(r, 0.0)) + src(base + vec2(0.0, r)) + src(base - vec2(0.0, r))) * 0.15;',
    '  vec2 e = abs(s) * 2.0; float edge = max(e.x, e.y);',
    '  c *= 1.0 - u_shadow * pow(edge, 6.0);',
    '  c += u_highlight * 0.5 * smoothstep(0.08, 0.0, abs(s.y - 0.43)) * step(abs(s.x), 0.45);',
    '  c += u_highlight * 0.15 * (s.y + 0.5) * (0.5 - s.x);',
    '  gl_FragColor = vec4(finish(c), 1.0);',
    '}'
  ].join('\n')
});
