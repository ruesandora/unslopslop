FX.mount({
  title: 'Scanlines',
  summary: 'Dark horizontal lines at a fixed pitch, an optional red-green-blue stripe mask and a slow rolling band, like a tube screen or a video still.',
  cost: 'One texture read per pixel. Cheap. The roll is the only motion; switch it off for a still.',
  fallback: 'No WebGL: the CSS gradient. A repeating-linear-gradient of 1 px dark lines every 3 px is the CSS version and is often enough.',
  slop: 'On body text, or as a nostalgia filter with no reason in the brief. Lines finer than 2 px moire on phones.',
  source: 'scene', palette: 'moss', animated: true, fps: 30,
  params: [
    { id: 'pitch', label: 'Line pitch (px)', min: 2, max: 12, step: 1, value: 5 },
    { id: 'strength', label: 'Line strength', min: 0, max: 1, step: 0.01, value: 0.65 },
    { id: 'mask', label: 'RGB stripe mask', min: 0, max: 1, step: 0.01, value: 0.2 },
    { id: 'roll', label: 'Rolling band', min: 0, max: 1, step: 0.01, value: 0.3 },
    { id: 'glow', label: 'Bleed', min: 0, max: 1, step: 0.01, value: 0.3 },
    { id: 'grain', label: 'Grain', min: 0, max: 0.3, step: 0.01, value: 0.06 }
  ],
  frag: [
    'void main() {',
    '  float px = u_pitch * u_dpr; vec2 uv = v_uv;',
    '  vec3 c = src(uv); vec3 b = (src(uv + vec2(0.004, 0.0)) + src(uv - vec2(0.004, 0.0))) * 0.5;',
    '  c = mix(c, max(c, b), u_glow);',
    '  float y = fract(gl_FragCoord.y / px);',
    '  c *= 1.0 - u_strength * smoothstep(0.35, 0.5, abs(y - 0.5) * 1.0 + 0.15);',
    '  float col = mod(floor(gl_FragCoord.x / u_dpr), 3.0);',
    '  vec3 m = col < 1.0 ? vec3(1.0, 0.7, 0.7) : col < 2.0 ? vec3(0.7, 1.0, 0.7) : vec3(0.7, 0.7, 1.0);',
    '  c *= mix(vec3(1.0), m * 1.15, u_mask);',
    '  float band = fract(uv.y - u_time * 0.08); c *= 1.0 + u_roll * 0.18 * smoothstep(0.0, 0.08, band) * smoothstep(0.2, 0.08, band);',
    '  gl_FragColor = vec4(finish(c), 1.0);',
    '}'
  ].join('\n')
});
