FX.mount({
  title: 'Ripple lens',
  summary: 'Concentric rings travel out from one point and push the picture along them, like looking down through disturbed water. Rings fade with distance.',
  cost: 'Two texture reads per pixel. Animated at 30 fps it is light, but it is still a full-screen loop: pause it off screen (the runtime does).',
  fallback: 'No WebGL: the CSS gradient. Reduced motion: one still frame of the rings.',
  slop: 'Used as a cursor toy on a page about something else, or with strong rings behind text.',
  source: 'scene', palette: 'seaglass', animated: true, fps: 30,
  params: [
    { id: 'amount', label: 'Displacement', min: 0, max: 1, step: 0.01, value: 0.45 },
    { id: 'freq', label: 'Rings', min: 2, max: 60, step: 1, value: 9 },
    { id: 'falloff', label: 'Falloff', min: 0, max: 1, step: 0.01, value: 0.55 },
    { id: 'speed', label: 'Speed', min: 0, max: 2, step: 0.01, value: 0.4 },
    { id: 'ox', label: 'Origin X', min: 0, max: 1, step: 0.01, value: 0.5 },
    { id: 'oy', label: 'Origin Y', min: 0, max: 1, step: 0.01, value: 0.5 },
    { id: 'shade', label: 'Ring light', min: 0, max: 1, step: 0.01, value: 0.35 },
    { id: 'grain', label: 'Grain', min: 0, max: 0.3, step: 0.01, value: 0.05 }
  ],
  frag: [
    'void main() {',
    '  float asp = u_res.x / u_res.y; vec2 d = (v_uv - vec2(u_ox, u_oy)) * vec2(asp, 1.0);',
    '  float r = length(d); vec2 dir = r > 0.0001 ? d / r : vec2(0.0);',
    '  float ph = r * u_freq * 2.0 * PI - u_time * u_speed * 6.0;',
    '  float fall = exp(-r * u_falloff * 5.0);',
    '  float w = sin(ph) * fall;',
    '  vec2 off = dir * w * u_amount * 0.03 / vec2(asp, 1.0);',
    '  vec3 c = src(v_uv + off);',
    '  c *= 1.0 + u_shade * 0.35 * cos(ph) * fall;',                 /* slope of the ripple catches the light */
    '  gl_FragColor = vec4(finish(c), 1.0);',
    '}'
  ].join('\n')
});
