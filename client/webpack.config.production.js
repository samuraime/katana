const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: resolve(__dirname, 'src'),

  entry: [
    // the entry point of our app
    './index.js',
  ],
  output: {
    // the output bundle
    filename: '[name].[hash].js',

    path: resolve(__dirname, 'dist'),

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
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader',
          'sass-loader?sourceMap',
        ],
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=2048&name=[name]-[hash].[ext]',
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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: '../../server/views/index.html',
    }),
  ],
};
