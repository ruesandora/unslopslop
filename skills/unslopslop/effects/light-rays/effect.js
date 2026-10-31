FX.mount({
  title: 'Light rays',
  summary: 'Beams fanning out from one source point, like sun through haze. Ray strength comes from smooth noise around the source, so the beams have uneven widths and drift slowly.',
  cost: 'Two noise calls per pixel. Light. Animated at 30 fps; still frame under reduced motion.',
  fallback: 'No WebGL: the CSS gradient. A conic-gradient with repeating thin stops and a radial mask is a passable static CSS version.',
  slop: 'A sunburst behind a product shot (it reads as a clip-art reveal), or rays plus glow plus lens flare together.',
  source: 'gradient', palette: 'ember', animated: true, fps: 30,
  params: [
    { id: 'density', label: 'Beam count', min: 4, max: 80, step: 1, value: 26 },
    { id: 'intensity', label: 'Intensity', min: 0, max: 1.5, step: 0.01, value: 0.75 },
    { id: 'reach', label: 'Reach', min: 0.1, max: 2, step: 0.01, value: 0.9 },
    { id: 'glow', label: 'Source glow', min: 0, max: 1, step: 0.01, value: 0.5 },
    { id: 'sx', label: 'Source X', min: -0.2, max: 1.2, step: 0.01, value: 0.75 },
    { id: 'sy', label: 'Source Y', min: -0.2, max: 1.2, step: 0.01, value: 1.05 },
    { id: 'speed', label: 'Drift', min: 0, max: 1, step: 0.01, value: 0.25 },
    { id: 'grain', label: 'Grain', min: 0, max: 0.3, step: 0.01, value: 0.08 }
  ],
  frag: [
    'void main() {',
    '  float asp = u_res.x / u_res.y; vec2 d = (v_uv - vec2(u_sx, u_sy)) * vec2(asp, 1.0);',
    '  float r = length(d); float ang = atan(d.y, d.x) / (2.0 * PI) + 0.5; float t = u_time * u_speed * 0.15;',
    '  float n = vnoise(vec2(ang * u_density, t)) * 0.6 + vnoise(vec2(ang * u_density * 2.3 + 4.0, t * 1.7)) * 0.4;',
    '  float beams = pow(smoothstep(0.35, 1.0, n), 1.4);',
    '  float fall = exp(-r / u_reach * 1.6);',
    '  vec3 base = src(v_uv) * 0.75;',
    '  vec3 lightC = mix(u_c2, u_c3, 0.7);',
    '  vec3 c = base + lightC * beams * fall * u_intensity + lightC * u_glow * exp(-r * r * 18.0);',
    '  gl_FragColor = vec4(finish(c), 1.0);',
    '}'
  ].join('\n')
});
