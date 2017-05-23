const webpack           = require('webpack');
const merge             = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const WEBPACK_COMMON_CONFIG = require('./webpack.common');
const { DIST_DIR }          = require('./directories');

const WEBPACK_DEV_CONFIG = module.exports = merge(WEBPACK_COMMON_CONFIG, {
  devtool: '#inline-source-map',

  output: {
    path: DIST_DIR,
    filename: '[name].js',
  },

  devServer: {
    watchOptions: {
      aggregateTimeout: 1500,
      ignored: /node_modules/,
    },
    inline: true,
    historyApiFallback: true,
    noInfo: false,
    clientLogLevel: 'error',
    compress: false,
    stats: 'normal',
    proxy: {
      '/api.twitter.com': 'http://localhost:3030',
    },
  },

  plugins: [
    new ExtractTextPlugin({ filename: '[name].css', allChunks: true }),
    new CommonsChunkPlugin({
      name: ['vendor', 'dependencies'],
      minChunks: Infinity,
    }),
  ],
});
