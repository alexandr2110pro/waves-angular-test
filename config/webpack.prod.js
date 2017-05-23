const read = require('fs').readFileSync;
const path = require('path');

const webpack = require('webpack');
const merge   = require('webpack-merge');

const CompressionPlugin        = require('compression-webpack-plugin');
const ExtractTextPlugin        = require('extract-text-webpack-plugin');
const AssetsPlugin             = require('assets-webpack-plugin');
const ChunkManifestPlugin      = require('chunk-manifest-webpack-plugin');
const WebpackChunkHash         = require('webpack-chunk-hash');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const HashedModuleIdsPlugin = webpack.HashedModuleIdsPlugin;
const CommonsChunkPlugin    = webpack.optimize.CommonsChunkPlugin;
const LoaderOptionsPlugin   = webpack.LoaderOptionsPlugin;
const IgnorePlugin          = webpack.IgnorePlugin;
const OccurrenceOrderPlugin = webpack.optimize.OccurrenceOrderPlugin;
const UglifyJsPlugin        = webpack.optimize.UglifyJsPlugin;

const COMMON_WEBPACK_CONFIG  = require('./webpack.config');
const { DIST_DIR, ROOT_DIR } = require('./directories');

const DEBUG = !!process.env.DEBUG || false;


const PROD_WEBPACK_CONFIG = module.exports = merge(COMMON_WEBPACK_CONFIG, {
  devtool: '#cheap-module-source-map',
  output: {
    path: DIST_DIR,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  stats: {
    assets: true,
    assetsSort: 'field',
    cached: true,
    children: true,
    chunks: true,
    chunkModules: true,
    chunkOrigins: true,
    chunksSort: 'field',
    context: path.resolve('src'),
    colors: true,
    errors: true,
    errorDetails: true,
    hash: true,
    modules: true,
    modulesSort: 'field',
    publicPath: true,
    reasons: true,
    source: true,
    timings: true,
    version: true,
    warnings: true,
  },

  plugins: [
    new CleanWebpackPlugin([DIST_DIR_NAME], {
      root: ROOT_DIR,
    }),
    new LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),

    new WebpackChunkHash(),
    new HashedModuleIdsPlugin(),
    new CommonsChunkPlugin({
      name: ['vendor', 'dependencies', 'manifest'],
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest',
    }),

    new ExtractTextPlugin({
      filename: '[name].[contenthash].bundle.css',
      allChunks: true,
    }),

    new IgnorePlugin(/^\.\/locale$/, [/moment$/]),

    new OccurrenceOrderPlugin(),

    new UglifyJsPlugin({
      mangle: true,
      compress: {
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: !DEBUG,
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: true,
    }),

    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 0,
      minRatio: 1,
    }),

    new AssetsPlugin({
      filename: 'assets.json',
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8888,
      reportFilename: 'report.html',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info',
    }),
  ],

  performance: {},
});
