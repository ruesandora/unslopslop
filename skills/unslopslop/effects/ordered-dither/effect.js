FX.mount({
  title: 'Ordered dither',
  summary: 'Colour is cut down to a few levels, and a fixed threshold pattern decides which pixels round up or down, so tone becomes a texture of dots. Pick the classic 2, 4 or 8 matrix, or an even noise pattern, and map the result to the palette.',
  cost: 'A few arithmetic steps per pixel, one texture read. Cheap. Pattern cells are in CSS pixels so it looks the same on every screen.',
  fallback: 'No WebGL: the CSS gradient. A static PNG export of the same pattern is a fine fallback because dither does not animate.',
  slop: 'Retro for its own sake on a calm brand, or dither on photos of people (faces turn to noise). Works best on one hero image or one texture band.',
  source: 'scene', palette: 'graphite', animated: false,
  params: [
    { id: 'matrix', label: 'Pattern', options: [['Matrix 2 x 2', 2], ['Matrix 4 x 4', 4], ['Matrix 8 x 8', 8], ['Even noise', 0]], value: 4 },
    { id: 'cell', label: 'Dot size (px)', min: 1, max: 12, step: 1, value: 3 },
    { id: 'levels', label: 'Levels', min: 2, max: 16, step: 1, value: 2 },
    { id: 'strength', label: 'Strength', min: 0, max: 1, step: 0.01, value: 1 },
    { id: 'colour', label: 'Colour', options: [['Palette ramp', 0], ['Source colours', 1]], value: 0 },
    { id: 'contrast', label: 'Contrast', min: 0.5, max: 2, step: 0.01, value: 1.15 }
  ],
  frag: [
    'float b2(vec2 a) { a = mod(a, 2.0); return (a.x * 2.0 + a.y * 3.0 - 4.0 * a.x * a.y) / 4.0; }',   /* 0,2,3,1 pattern */
    'float bayer(vec2 a, float n) {',
    '  if (n < 1.0) return fract(52.9829189 * fract(dot(a, vec2(0.06711056, 0.00583715))));',           /* interleaved noise */
    '  float v = b2(a);',                                     /* coarse bit from this pixel */
    '  if (n > 3.0) v += b2(floor(a / 2.0)) / 4.0;',          /* finer bits from the parent cells */
    '  if (n > 7.0) v += b2(floor(a / 4.0)) / 16.0;',
    '  float m = n > 7.0 ? 64.0 : n > 3.0 ? 16.0 : 4.0;',
    '  return v + 0.5 / m;',
    '}',
    'void main() {',
    '  float px = u_cell * u_dpr;',
    '  vec2 cell = floor(gl_FragCoord.xy / px);',
    '  vec2 uv = (cell + 0.5) * px / u_res;',
    '  vec3 c = src(uv); c = (c - 0.5) * u_contrast + 0.5;',
    '  float th = bayer(cell, u_matrix) - 0.5;',
    '  float L = u_levels - 1.0;',
    '  vec3 q; ',
    '  if (u_colour < 0.5) { float l = luma(c); float d = floor(l * L + 0.5 + th * u_strength) / L; q = ramp(d); }',
    '  else { q = floor(c * L + 0.5 + th * u_strength) / L; }',
    '  gl_FragColor = vec4(clamp(q, 0.0, 1.0), 1.0);',
    '}'
  ].join('\n')
});
