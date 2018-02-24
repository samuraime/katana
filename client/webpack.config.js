const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = {
  context: resolve(__dirname, 'src'),

  entry: {
    app: [
      // activate HMR for React
      'react-hot-loader/patch',

      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      'webpack-dev-server/client?http://localhost:8080',

      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates
      'webpack/hot/only-dev-server',

      // the entry point of our app
      './index.js',
    ],
    vendor: ['babel-polyfill', 'react', 'react-dom'],
  },

  output: {
    // the output bundle
    filename: '[name].js',

    // determines the name of non-entry chunk files
    chunkFilename: '[name].[chunkhash].js',

    path: resolve(__dirname, 'dist'),

    // necessary for HMR to know where to load the hot update chunks
    publicPath: '/static/',
  },

  devtool: 'inline-source-map',

  devServer: {
    // enable HMR on the server
    hot: true,

    historyApiFallback: true,

    // match the output path
    contentBase: resolve(__dirname, 'dist'),

    proxy: {
      '/static': 'http://localhost:3000',
    },
    // match the output `publicPath`
    publicPath: '/static/',
  },

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
          'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]',
          'postcss-loader?sourceMap',
          'sass-loader?sourceMap',
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
        NODE_ENV: JSON.stringify('development'),
      },
      API_URL: JSON.stringify(`//localhost:${process.env.PORT || 3000}/api`),
    }),
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
};
