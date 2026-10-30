FX.mount({
  title: 'Halftone',
  summary: 'A rotated print screen: each cell reads the brightness under it and draws a dot (or line, or square) whose size carries the tone. Ink on paper, or dots in the source colours.',
  cost: 'One texture read and a distance test per pixel. Cheap. Cell size is in CSS pixels so the screen ruling stays the same at any size.',
  fallback: 'No WebGL: the CSS gradient. For a fixed pattern over any image, a CSS radial-gradient dot grid with mix-blend-mode multiply gets halfway.',
  slop: 'Huge dots on a small card, cyan-magenta-yellow on a brand that never prints, or halftone plus dither plus grain together.',
  source: 'scene', palette: 'graphite', animated: false,
  params: [
    { id: 'cell', label: 'Cell (px)', min: 3, max: 40, step: 1, value: 9 },
    { id: 'angle', label: 'Screen angle', min: 0, max: 90, step: 1, value: 45 },
    { id: 'dot', label: 'Dot scale', min: 0.2, max: 1.4, step: 0.01, value: 1.0 },
    { id: 'style', label: 'Mark', options: [['Dots', 0], ['Lines', 1], ['Squares', 2], ['Rings', 3]], value: 0 },
    { id: 'colour', label: 'Colour', options: [['Ink on paper', 0], ['Source colours', 1]], value: 0 },
    { id: 'paper', label: 'Paper', min: 0, max: 1, step: 0.01, value: 1 },
    { id: 'grain', label: 'Grain', min: 0, max: 0.3, step: 0.01, value: 0.03 }
  ],
  frag: [
    'void main() {',
    '  float px = u_cell * u_dpr; float a = radians(u_angle); mat2 R = mat2(cos(a), sin(a), -sin(a), cos(a));',
    '  vec2 p = R * gl_FragCoord.xy / px;',
    '  vec2 id = floor(p) + 0.5; vec2 f = fract(p) - 0.5;',
    '  vec2 centre = (transpose2(R) * id) * px / u_res;',
    '  vec3 s = src(centre); float l = luma(s);',
    '  float ink = 1.0 - l;',
    '  float aa = 1.2 / px; float m;',
    '  if (u_style < 0.5) { m = smoothstep(sqrt(ink) * 0.5 * u_dot + aa, sqrt(ink) * 0.5 * u_dot - aa, length(f)); }',
    '  else if (u_style < 1.5) { m = smoothstep(ink * 0.5 * u_dot + aa, ink * 0.5 * u_dot - aa, abs(f.y)); }',
    '  else if (u_style < 2.5) { float h = sqrt(ink) * 0.5 * u_dot; m = smoothstep(h + aa, h - aa, max(abs(f.x), abs(f.y))); }',
    '  else { float r = sqrt(ink) * 0.42 * u_dot; m = smoothstep(0.09 * u_dot + aa, 0.09 * u_dot - aa, abs(length(f) - r)) * step(0.02, ink); }',
    '  vec3 paperC = mix(src(v_uv), u_c3, u_paper);',
    '  vec3 inkC = u_colour < 0.5 ? u_c0 : s * 0.9;',
    '  vec3 c = mix(paperC, inkC, m);',
    '  gl_FragColor = vec4(finish(c), 1.0);',
    '}'
  ].join('\n').replace('void main', 'vec2 transpose2_apply(mat2 m, vec2 v) { return vec2(dot(m[0], v), dot(m[1], v)); }\nvoid main').replace('transpose2(R) * id', 'transpose2_apply(R, id)')
});
