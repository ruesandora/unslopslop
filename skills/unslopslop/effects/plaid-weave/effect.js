FX.mount({
  title: 'Plaid weave',
  summary: 'Rows and columns of colour bands laid over each other and multiplied, so crossings get darker, like woven cloth. Each band takes its colour from the picture at its centre, so a centred glow stays a glow.',
  cost: 'Two texture reads per pixel. Cheap and static.',
  fallback: 'No WebGL: the CSS gradient. Two repeating-linear-gradients at 0 and 90 degrees with mix-blend-mode multiply make the mono version in pure CSS.',
  slop: 'Tartan as decoration on a brand with no textile, picnic or heritage story, or bands so dense they shimmer.',
  source: 'gradient', palette: 'ember', animated: false,
  params: [
    { id: 'size', label: 'Band pitch (px)', min: 6, max: 120, step: 1, value: 34 },
    { id: 'width', label: 'Band width', min: 0.05, max: 1, step: 0.01, value: 0.45 },
    { id: 'colstr', label: 'Column strength', min: 0, max: 1, step: 0.01, value: 0.7 },
    { id: 'rowstr', label: 'Row strength', min: 0, max: 1, step: 0.01, value: 0.7 },
    { id: 'angle', label: 'Angle', min: -45, max: 45, step: 0.5, value: 0 },
    { id: 'paper', label: 'Paper', min: 0, max: 1, step: 0.01, value: 0.8 },
    { id: 'blend', label: 'Blend', options: [['Multiply (cloth)', 0], ['Screen (light)', 1]], value: 0 },
    { id: 'grain', label: 'Grain', min: 0, max: 0.3, step: 0.01, value: 0.05 }
  ],
  frag: [
    'void main() {',
    '  float px = u_size * u_dpr; float a = radians(u_angle); mat2 R = mat2(cos(a), sin(a), -sin(a), cos(a));',
    '  vec2 p = R * (gl_FragCoord.xy - u_res * 0.5) / px;',
    '  vec2 id = floor(p) + 0.5, f = fract(p);',
    '  mat2 Ri = mat2(cos(a), -sin(a), sin(a), cos(a));',
    '  vec3 colC = src((Ri * vec2(id.x, p.y) * px + u_res * 0.5) / u_res);',
    '  vec3 rowC = src((Ri * vec2(p.x, id.y) * px + u_res * 0.5) / u_res);',
    '  float cm = smoothstep(u_width * 0.5 + 0.02, u_width * 0.5 - 0.02, abs(f.x - 0.5)) * u_colstr;',
    '  float rm = smoothstep(u_width * 0.5 + 0.02, u_width * 0.5 - 0.02, abs(f.y - 0.5)) * u_rowstr;',
    '  vec3 base = mix(src(v_uv), vec3(0.97, 0.95, 0.92), u_paper);',
    '  vec3 c;',
    '  if (u_blend < 0.5) { c = base * mix(vec3(1.0), colC, cm) * mix(vec3(1.0), rowC, rm); }',
    '  else { c = 1.0 - (1.0 - base * (1.0 - u_paper * 0.9)) * (1.0 - colC * cm) * (1.0 - rowC * rm); }',
    '  gl_FragColor = vec4(finish(c), 1.0);',
    '}'
  ].join('\n')
});
