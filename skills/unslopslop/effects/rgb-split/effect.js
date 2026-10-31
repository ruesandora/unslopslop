FX.mount({
  title: 'RGB split',
  summary: 'The red and blue channels slide apart from green, growing toward the edges like a cheap lens. Glitch mode shifts thin horizontal bands sideways instead.',
  cost: 'Three texture reads per pixel. Cheap. Glitch mode animates; keep it to a short moment, not a loop.',
  fallback: 'No WebGL: the CSS gradient. A CSS cousin: two copies of an image with mix-blend-mode screen, tinted red and cyan, offset by 2 px.',
  slop: 'On text, on logos, or as a permanent loop. Fringes over 4 px on a sharp UI read as a bug.',
  source: 'scene', palette: 'dusk', animated: true, fps: 30,
  params: [
    { id: 'amount', label: 'Split', min: 0, max: 1, step: 0.01, value: 0.65 },
    { id: 'power', label: 'Edge weighting', min: 0, max: 3, step: 0.05, value: 1.6 },
    { id: 'mode', label: 'Mode', options: [['Lens (radial)', 0], ['Glitch bands', 1]], value: 0 },
    { id: 'bands', label: 'Glitch bands', min: 4, max: 120, step: 1, value: 36 },
    { id: 'grain', label: 'Grain', min: 0, max: 0.3, step: 0.01, value: 0.05 }
  ],
  stillTime: 3.3,
  frag: [
    'void main() {',
    '  vec2 uv = v_uv; vec2 off;',
    '  if (u_mode < 0.5) { vec2 d = uv - 0.5; off = d * pow(length(d) * 1.6, u_power) * u_amount * 0.06; }',
    '  else { float row = floor(uv.y * u_bands); float t = floor(u_time * 8.0);',
    '    float k = hash(vec2(row, t)); float on = step(0.82, k);',
    '    uv.x += on * (hash(vec2(row, t + 3.0)) - 0.5) * u_amount * 0.12;',
    '    off = vec2((0.3 + on * 1.5) * u_amount * 0.012, 0.0); }',
    '  vec3 c = vec3(src(uv + off).r, src(uv).g, src(uv - off).b);',
    '  gl_FragColor = vec4(finish(c), 1.0);',
    '}'
  ].join('\n')
});
