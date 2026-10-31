FX.mount({
  title: 'Ribbed glass',
  summary: 'The picture seen through vertical glass flutes: each rib is a small cylinder lens that squeezes and shifts its slice, with a dark groove and a bright edge between ribs.',
  cost: 'One full-screen pass, 5 texture reads per pixel. Fine on phones at DPR 1.5; static, so it renders once and costs nothing after.',
  fallback: 'No WebGL: the CSS gradient. A cheap CSS-only cousin is a repeating-linear-gradient of 6 to 8 percent dark and light bands over a blurred image.',
  slop: 'It sits behind body text, the ribs are thinner than about 12 px (it reads as a striped fabric), or it is the third glass effect on the page.',
  source: 'gradient', palette: 'ember', animated: false,
  params: [
    { id: 'ribs', label: 'Ribs across', min: 4, max: 60, step: 1, value: 14 },
    { id: 'amount', label: 'Refraction', min: 0, max: 1, step: 0.01, value: 0.55 },
    { id: 'tilt', label: 'Tilt (degrees)', min: -30, max: 30, step: 1, value: 0 },
    { id: 'shadow', label: 'Groove shadow', min: 0, max: 1, step: 0.01, value: 0.35 },
    { id: 'highlight', label: 'Edge highlight', min: 0, max: 1, step: 0.01, value: 0.25 },
    { id: 'split', label: 'Colour fringe', min: 0, max: 1, step: 0.01, value: 0.15 },
    { id: 'grain', label: 'Grain', min: 0, max: 0.3, step: 0.01, value: 0.07 }
  ],
  frag: [
    'void main() {',
    '  vec2 uv = v_uv; float asp = u_res.x / u_res.y;',
    '  float a = radians(u_tilt); mat2 R = mat2(cos(a), -sin(a), sin(a), cos(a));',
    '  vec2 p = R * ((uv - 0.5) * vec2(asp, 1.0));',            /* rib space, aspect correct */
    '  float x = p.x / asp * u_ribs;',
    '  float s = fract(x) - 0.5;',                                /* -0.5..0.5 across one rib */
    '  float bend = (s * 1.7 + sin(s * PI) * 0.5) * u_amount * 7.0 / u_ribs;', /* prism plus a little cylinder: each rib shows a squeezed, shifted window */
    '  vec2 dir = R * vec2(1.0, 0.0); dir.x /= asp;',
    '  vec2 base = uv + dir * bend;',
    '  float w = u_amount * 0.6 / u_ribs;',                       /* blur across the rib, never along it */
    '  vec3 c = vec3(0.0);',
    '  for (int i = -2; i <= 2; i++) { c += src(base + dir * w * float(i) * 0.5); }',
    '  c /= 5.0;',
    '  float f = u_split * 0.8 / u_ribs * s;',
    '  c.r = mix(c.r, src(base + dir * f).r, 0.85); c.b = mix(c.b, src(base - dir * f).b, 0.85);',
    '  float edge = abs(s) * 2.0;',
    '  c *= 1.0 - u_shadow * pow(edge, 4.0);',
    '  c += u_highlight * smoothstep(0.07, 0.0, abs(s + 0.40)) * 0.6;',
    '  c += u_highlight * 0.12 * (0.5 - s);',                      /* soft sheen falls across each rib */
    '  gl_FragColor = vec4(finish(c), 1.0);',
    '}'
  ].join('\n')
});
