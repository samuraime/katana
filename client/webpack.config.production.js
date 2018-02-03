const { resolve } = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: resolve(__dirname, 'src'),

  entry: {
    // the entry point of our app
    app: './index.js',
    vendor: ['babel-polyfill', 'react', 'react-dom'],
  },

  output: {
    // the output bundle
    filename: '[name].[chunkhash].js',

    // determines the name of non-entry chunk files
    chunkFilename: '[name].[chunkhash].js',

    path: resolve(__dirname, 'dist'),

    // replace cdn, https://cdn.example.com/static/
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
          'css-loader?modules&importLoaders=1&localIdentName=_[hash:base64:5]',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=2048&name=[name].[hash].[ext]',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      API_URL: JSON.stringify('/api'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    }),
  ],
};
