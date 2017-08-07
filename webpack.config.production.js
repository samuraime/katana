const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  context: resolve(__dirname, 'client/src'),

  entry: [
    // the entry point of our app
    './index.js',
  ],
  output: {
    // the output bundle
    filename: 'bundle.js',

    path: resolve(__dirname, 'client/dist'),

    // necessary for HMR to know where to load the hot update chunks
    publicPath: '/static/',
  },

  devtool: 'cheap-module-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss-loader'],
      },
    ],
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
    }),
  ],
};
