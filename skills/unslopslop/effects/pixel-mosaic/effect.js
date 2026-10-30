FX.mount({
  title: 'Pixel mosaic',
  summary: 'Square blocks sampled from their centres, crisp edges, no blur. Add a gap and round the corners and it becomes an LED wall or a bead grid.',
  cost: 'One texture read per pixel. The cheapest image treatment here.',
  fallback: 'No WebGL: the CSS gradient. A small image scaled up with image-rendering: pixelated gives the plain version with no script at all.',
  slop: 'Blocks so big the subject is gone, or the LED look on a brand with no screen or signage story.',
  source: 'gradient', palette: 'ember', animated: false,
  params: [
    { id: 'blocks', label: 'Blocks on long edge', min: 4, max: 160, step: 1, value: 22 },
    { id: 'gap', label: 'Gap', min: 0, max: 0.6, step: 0.01, value: 0 },
    { id: 'round', label: 'Corner round', min: 0, max: 1, step: 0.01, value: 0 },
    { id: 'levels', label: 'Colour steps (0 = off)', min: 0, max: 12, step: 1, value: 0 },
    { id: 'grain', label: 'Grain', min: 0, max: 0.3, step: 0.01, value: 0.06 }
  ],
  frag: [
    'void main() {',
    '  float px = max(u_res.x, u_res.y) / u_blocks;',
    '  vec2 id = floor(gl_FragCoord.xy / px), f = fract(gl_FragCoord.xy / px) - 0.5;',
    '  vec3 c = src((id + 0.5) * px / u_res);',
    '  if (u_levels > 0.5) c = floor(c * u_levels + 0.5) / u_levels;',
    '  float h = 0.5 - u_gap * 0.5; float r = u_round * h;',
    '  vec2 d = abs(f) - (h - r); float sd = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - r;',
    '  float m = smoothstep(1.0 / px, -1.0 / px, sd);',
    '  vec3 gapC = u_c0 * 0.6;',
    '  gl_FragColor = vec4(finish(mix(gapC, c, u_gap > 0.001 || u_round > 0.001 ? m : 1.0)), 1.0);',
    '}'
  ].join('\n')
});
