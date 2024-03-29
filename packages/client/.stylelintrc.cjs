module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-styled-components',
    'stylelint-config-prettier',
  ],
  overrides: [
    {
      files: ['**/*.js'],
      customSyntax: 'postcss-scss',
    },
  ],
};
