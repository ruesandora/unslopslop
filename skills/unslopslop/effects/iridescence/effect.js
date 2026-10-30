FX.mount({
  title: 'Iridescence',
  summary: 'An oil-film sheen: a slowly warped thickness field is turned into colour with a cosine rainbow, so hues shift in thin bands like soap or holographic foil. Mix it back over the palette to keep it quiet.',
  cost: 'Two noise layers and a cosine per pixel. Light to medium. 30 fps cap.',
  fallback: 'No WebGL: the CSS gradient. A conic-gradient with a blur filter is a weak but static CSS stand-in.',
  slop: 'Full-strength rainbow over the whole page (y2k sticker), or on text. Keep it on one object or one band, mixed under 50 percent.',
  source: 'none', palette: 'graphite', animated: true, fps: 30,
  params: [
    { id: 'bands', label: 'Band frequency', min: 0.5, max: 16, step: 0.05, value: 5 },
    { id: 'warp', label: 'Warp', min: 0, max: 3, step: 0.01, value: 0.9 },
    { id: 'scale', label: 'Scale', min: 0.3, max: 5, step: 0.05, value: 1.5 },
    { id: 'mixamt', label: 'Sheen over palette', min: 0, max: 1, step: 0.01, value: 0.6 },
    { id: 'speed', label: 'Flow', min: 0, max: 1, step: 0.01, value: 0.25 },
    { id: 'grain', label: 'Grain', min: 0, max: 0.3, step: 0.01, value: 0.05 }
  ],
  frag: [
    'void main() {',
    '  float asp = u_res.x / u_res.y; vec2 p = v_uv * vec2(asp, 1.0) * u_scale; float t = u_time * u_speed * 0.2;',
    '  vec2 q = vec2(fbm(p + t, 4.0), fbm(p + 3.7 - t, 4.0));',
    '  float th = fbm(p + u_warp * q, 4.0);',
    '  vec3 film = 0.78 + 0.22 * cos(2.0 * PI * (th * u_bands * 3.0 + vec3(0.0, 0.33, 0.67)));',
    '  vec3 base = ramp(0.55 + 0.45 * th);',
    '  vec3 c = mix(base, film * (0.6 + 0.6 * luma(base)), u_mixamt);',
    '  c += pow(max(0.0, 1.0 - abs(th - 0.55) * 6.0), 4.0) * 0.25;',   /* a thin specular ridge */
    '  gl_FragColor = vec4(finish(c), 1.0);',
    '}'
  ].join('\n')
});
