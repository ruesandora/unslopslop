// The fonts agents reach for without a reason. Keep in sync with references/ai-default-fonts.md
// (tests/hard-rules.test.mjs checks that every name here is listed there).
// A page may justify one of them for its project with
//   <meta name="unslop-brief" content="font: Family Name, reason in at least a sentence">
export const AI_DEFAULT_FONTS = {
  display: [
    'gloock', 'instrument serif', 'fraunces', 'newsreader', 'dm serif display', 'dm serif text', 'playfair display', 'playfair',
    'cormorant', 'cormorant garamond', 'young serif', 'bricolage grotesque', 'clash display', 'cabinet grotesk', 'syne', 'unbounded',
  ],
  text: [
    'inter', 'inter tight', 'inter display', 'geist', 'roboto', 'open sans', 'poppins', 'dm sans', 'space grotesk', 'outfit',
    'plus jakarta sans', 'manrope', 'figtree', 'instrument sans', 'satoshi', 'general sans', 'montserrat', 'lato', 'nunito', 'urbanist', 'sora',
  ],
  mono: ['geist mono', 'jetbrains mono', 'space mono', 'ibm plex mono', 'dm mono', 'fira code', 'roboto mono'],
};
export const AI_DEFAULT_LIST = [...AI_DEFAULT_FONTS.display, ...AI_DEFAULT_FONTS.text, ...AI_DEFAULT_FONTS.mono];
