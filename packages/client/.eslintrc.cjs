module.exports = {
  extends: ['react-app', 'prettier'],
  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': 0,
    'react/jsx-wrap-multilines': [
      2,
      {
        declaration: false,
        assignment: false,
      },
    ],
  },
};
