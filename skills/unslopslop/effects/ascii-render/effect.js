(function () {
  var RAMP = ' .,:-=+*o#%@';
  function atlas() {
    var cw = 32, ch = 48, c = document.createElement('canvas'); c.width = cw * RAMP.length; c.height = ch;
    var x = c.getContext('2d'); x.fillStyle = '#000'; x.fillRect(0, 0, c.width, c.height);
    x.fillStyle = '#fff'; x.font = '600 40px ui-monospace, Menlo, Consolas, monospace'; x.textAlign = 'center'; x.textBaseline = 'middle';
    for (var i = 0; i < RAMP.length; i++) x.fillText(RAMP[i], i * cw + cw / 2, ch / 2 + 2);
    return c;
  }
  FX.mount({
    title: 'ASCII render',
    summary: 'The picture is sampled once per character cell and each cell prints a glyph from a light-to-heavy ramp, so brightness becomes type. Also as blocks, dots or vertical strokes.',
    cost: 'One source read and one glyph read per pixel. Cheap. The glyph sheet is drawn once in a hidden canvas from the system monospace font.',
    fallback: 'No WebGL: the CSS gradient. A real-text version (a pre element filled from a canvas) is better for SEO and screen readers but costs layout; keep it under about 120 by 60 cells.',
    slop: 'Green on black terminal cosplay for a product that is not a developer tool, or characters small enough that it reads as noise. The glyphs should be legible as glyphs.',
    source: 'scene', palette: 'graphite', animated: false,
    textures: { u_atlas: atlas },
    params: [
      { id: 'cell', label: 'Cell width (px)', min: 4, max: 40, step: 1, value: 10 },
      { id: 'ratio', label: 'Cell height / width', min: 1, max: 2.5, step: 0.05, value: 1.6 },
      { id: 'style', label: 'Mark', options: [['Characters', 0], ['Blocks', 1], ['Dots', 2], ['Strokes', 3]], value: 0 },
      { id: 'colour', label: 'Colour', options: [['Source colours', 1], ['Palette ink', 0]], value: 1 },
      { id: 'gain', label: 'Exposure', min: 0.5, max: 3, step: 0.05, value: 1.5 },
      { id: 'back', label: 'Picture under the glyphs', min: 0, max: 1, step: 0.01, value: 0.45 }
    ],
    frag: [
      'void main() {',
      '  vec2 sz = vec2(u_cell, u_cell * u_ratio) * u_dpr;',
      '  vec2 id = floor(gl_FragCoord.xy / sz); vec2 f = fract(gl_FragCoord.xy / sz);',
      '  vec3 s = src((id + 0.5) * sz / u_res);',
      '  float l = clamp(luma(s) * u_gain, 0.0, 1.0);',
      '  float m;',
      '  if (u_style < 0.5) { float n = 12.0; float k = floor(l * (n - 0.001));',
      '    m = texture2D(u_atlas, vec2((k + f.x) / n, f.y)).r; }',
      '  else if (u_style < 1.5) { float h = l; m = step(abs(f.x - 0.5), h * 0.5) * step(abs(f.y - 0.5), h * 0.5); }',
      '  else if (u_style < 2.5) { vec2 g = (f - 0.5) * vec2(1.0, u_ratio); m = smoothstep(0.06, 0.0, length(g) - sqrt(l) * 0.48); }',
      '  else { m = step(abs(f.x - 0.5), l * 0.45) * step(0.08, f.y) * step(f.y, 0.92); }',
      '  vec3 ink = u_colour > 0.5 ? mix(s, vec3(1.0), 0.15) * 1.5 : u_c3;',
      '  vec3 bg = mix(u_c0, src(v_uv), u_back);',
      '  gl_FragColor = vec4(bg + ink * m * (1.0 - u_back * 0.5), 1.0);',
      '}'
    ].join('\n')
  });
})();
