FX.mount({
  title: 'Mesh gradient',
  summary: 'Five colour points (four near the corners, one pooled near the middle) blended by distance, then gently bent with low-frequency noise so no edge is straight. The points drift slowly when motion is on.',
  cost: 'Five distance terms and two noise calls per pixel. Light. Cap it at 30 fps or render once; a still mesh looks the same.',
  fallback: 'No WebGL: the CSS gradient. Four stacked radial-gradients on one element are a close CSS-only version for static pages.',
  slop: 'Purple to blue to pink with nothing on top, used as the whole hero. A mesh needs a subject, type or a texture over it, and colours chosen for the project.',
  source: 'none', palette: 'seaglass', animated: true, fps: 30,
  params: [
    { id: 'soft', label: 'Blend softness', min: 0.5, max: 4, step: 0.05, value: 2.2 },
    { id: 'warp', label: 'Warp', min: 0, max: 1, step: 0.01, value: 0.35 },
    { id: 'centre', label: 'Centre pool', min: 0, max: 1, step: 0.01, value: 0.6 },
    { id: 'speed', label: 'Drift', min: 0, max: 1, step: 0.01, value: 0.3 },
    { id: 'grain', label: 'Grain', min: 0, max: 0.3, step: 0.01, value: 0.07 }
  ],
  frag: [
    'void main() {',
    '  float asp = u_res.x / u_res.y; vec2 uv = v_uv; float t = u_time * u_speed * 0.25;',
    '  vec2 w = vec2(fbm(uv * 1.6 + t, 3.0), fbm(uv * 1.6 + 7.3 - t, 3.0)) - 0.5;',
    '  uv += w * u_warp * 0.5;',
    '  vec2 P[5]; vec3 C[5];',
    '  P[0] = vec2(0.08, 0.10) + 0.06 * vec2(sin(t * 1.3), cos(t * 1.1)); C[0] = u_c0;',
    '  P[1] = vec2(0.92, 0.12) + 0.06 * vec2(cos(t * 0.9), sin(t * 1.4)); C[1] = u_c1;',
    '  P[2] = vec2(0.90, 0.92) + 0.06 * vec2(sin(t * 1.2 + 2.0), cos(t)); C[2] = u_c3;',
    '  P[3] = vec2(0.10, 0.88) + 0.06 * vec2(cos(t * 1.5), sin(t * 0.8)); C[3] = u_c1;',
    '  P[4] = vec2(0.55, 0.48) + 0.10 * vec2(sin(t * 0.7), cos(t * 0.9)); C[4] = u_c2;',
    '  vec3 acc = vec3(0.0); float tot = 0.0;',
    '  for (int i = 0; i < 5; i++) { vec2 d = (uv - P[i]) * vec2(asp, 1.0); float k = 1.0 / pow(dot(d, d) + 0.002, u_soft * 0.5);',
    '    if (i == 4) k *= 0.3 + u_centre * 1.4; acc += C[i] * k; tot += k; }',
    '  gl_FragColor = vec4(finish(acc / tot), 1.0);',
    '}'
  ].join('\n')
});
