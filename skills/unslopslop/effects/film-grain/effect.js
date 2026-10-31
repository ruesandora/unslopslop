FX.mount({
  title: 'Film grain',
  summary: 'Fine per-pixel noise added as the very last step. It breaks up gradient banding, gives flat colour a material, and flickers slightly when motion is on. Drag the split to compare with and without.',
  cost: 'Two hashes per pixel, the cheapest effect here. For a static page the CSS grain overlay (grain-overlay) is cheaper still: no canvas at all.',
  fallback: 'No WebGL: the CSS gradient. Reduced motion: the grain is still there, it just stops flickering.',
  slop: 'Amount above about 0.15 on text-heavy pages (it reads as dirt), coloured grain on brand colours, or grain over a UI screenshot that should look crisp.',
  source: 'gradient', palette: 'dusk', animated: true, fps: 24,
  params: [
    { id: 'grain', label: 'Amount', min: 0, max: 0.3, step: 0.005, value: 0.12 },
    { id: 'size', label: 'Grain size', min: 1, max: 4, step: 0.1, value: 1.4 },
    { id: 'chroma', label: 'Colour noise', min: 0, max: 1, step: 0.01, value: 0.15 },
    { id: 'split', label: 'Compare split (0 = all grain)', min: 0, max: 1, step: 0.01, value: 0.0 }
  ],
  frag: [
    'void main() {',
    '  vec3 c = src(v_uv);',
    '  if (v_uv.x < u_split) { gl_FragColor = vec4(c, 1.0); return; }',
    '  vec2 cell = floor(gl_FragCoord.xy / u_size); float t = floor(u_time * 24.0);',
    '  float n = hash(cell + t * 7.13) + hash(cell * 1.37 + t * 3.1) - 1.0;',          /* triangular, film-like */
    '  vec3 nc = vec3(hash(cell + t + 1.7), hash(cell + t + 9.2), hash(cell + t + 4.4)) - 0.5;',
    '  float l = luma(c);',
    '  float w = 0.55 + 1.8 * l * (1.0 - l);',                                            /* strongest in the midtones */
    '  c += (vec3(n) * (1.0 - u_chroma) + nc * u_chroma * 1.4) * u_grain * w;',
    '  float edge = smoothstep(0.003, 0.0, abs(v_uv.x - u_split)) * step(0.001, u_split);',
    '  gl_FragColor = vec4(mix(c, vec3(1.0), edge * 0.8), 1.0);',
    '}'
  ].join('\n')
});
