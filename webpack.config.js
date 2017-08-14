const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  context: resolve(__dirname, 'client/src'),

  entry: [
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
  output: {
    // the output bundle
    filename: 'bundle.js',

    path: resolve(__dirname, 'client/dist'),

    // necessary for HMR to know where to load the hot update chunks
    publicPath: '/staitc/',
  },

  devtool: 'inline-source-map',

  devServer: {
    // enable HMR on the server
    hot: true,

    historyApiFallback: true,

    // match the output path
    contentBase: resolve(__dirname, 'client/dist'),

    proxy: {
      '/static': 'http://localhost:3000',
    },
    // match the output `publicPath`
    publicPath: '/static/',
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
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
        use: ['style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss-loader'],
      },
    ],
  },

  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
  ],
};
