FX.mount({
  title: 'Warped field',
  summary: 'Noise that bends its own coordinates twice before it is read, mapped through the palette. It gives soft, painterly, smoke-like bands that never repeat. The most organic background here.',
  cost: 'Three layered noise calls of up to six octaves per pixel: the heaviest generator in this set. On phones lower Detail, cap at 30 fps, or render one still frame.',
  fallback: 'No WebGL: the CSS gradient. Export one frame as a 1600 px WebP for a zero-script version.',
  slop: 'Full saturation and full contrast (it turns into a screensaver), or used behind long text. Keep contrast low and let one colour dominate.',
  source: 'none', palette: 'dusk', animated: true, fps: 30,
  params: [
    { id: 'scale', label: 'Scale', min: 0.3, max: 6, step: 0.05, value: 1.6 },
    { id: 'warp', label: 'Warp', min: 0, max: 3, step: 0.01, value: 0.9 },
    { id: 'detail', label: 'Detail (octaves)', min: 1, max: 6, step: 1, value: 4 },
    { id: 'contrast', label: 'Contrast', min: 0.3, max: 2.5, step: 0.01, value: 0.9 },
    { id: 'speed', label: 'Flow', min: 0, max: 1, step: 0.01, value: 0.25 },
    { id: 'grain', label: 'Grain', min: 0, max: 0.3, step: 0.01, value: 0.07 }
  ],
  frag: [
    'void main() {',
    '  float asp = u_res.x / u_res.y; vec2 p = v_uv * vec2(asp, 1.0) * u_scale; float t = u_time * u_speed * 0.2;',
    '  vec2 q = vec2(fbm(p + vec2(0.0, t), u_detail), fbm(p + vec2(5.2, 1.3 - t), u_detail));',
    '  vec2 r = vec2(fbm(p + u_warp * q + vec2(1.7, 9.2) + t * 0.6, u_detail), fbm(p + u_warp * q + vec2(8.3, 2.8), u_detail));',
    '  float f = fbm(p + u_warp * r, u_detail);',
    '  f = smoothstep(0.0, 1.0, clamp((f - 0.5) * u_contrast * 1.4 + 0.5, 0.0, 1.0));',
    '  vec3 c = ramp(f);',
    '  c = mix(c, ramp(length(q) * 0.9), 0.25);',
    '  gl_FragColor = vec4(finish(c), 1.0);',
    '}'
  ].join('\n')
});
