module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-styled-components",
    "stylelint-config-prettier",
  ],
  overrides: [
    {
      files: ['**/*.js'],
      customSyntax: '@stylelint/postcss-css-in-js',
    },
  ],
};
