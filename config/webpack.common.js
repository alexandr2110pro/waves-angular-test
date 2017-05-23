const path = require('path');

const webpack            = require('webpack');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const NgAnnotatePlugin   = require('ng-annotate-webpack-plugin');

const DefinePlugin = webpack.DefinePlugin;


const ENTRIES         = require('./entries');
const POST_CSS_CONFIG = require('./postcss');

const {
        SRC_DIR_NAME,
        DIST_DIR_NAME,
        ROOT_DIR, SRC_DIR, DIST_DIR,
      } = require('./directories');

const { AUTHORIZATION_TOKEN } = require('./application');

const NODE_ENV = process.env.NODE_ENV;


//
// ------------------------------------


const COMMON_WEBPACK_CONFIG = module.exports = {

  entry: ENTRIES,

  resolve: {
    extensions: ['.js', '.sass', '.scss', '.less'],
    modules: [
      path.resolve('node_modules'),
      SRC_DIR,
    ],
    alias: {
      'src': path.resolve(SRC_DIR_NAME),
      'shared': path.resolve(SRC_DIR_NAME, 'shared'),
    },
  },

  performance: { hints: false },

  devtool: '#eval-source-map',

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(SRC_DIR_NAME, 'index.html'),
      inject: 'body',
    }),
    new NgAnnotatePlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'process.env.AUTHORIZATION_TOKEN': JSON.stringify(AUTHORIZATION_TOKEN),
    }),
  ],


  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          path.resolve('node_modules'),
          path.resolve(DIST_DIR_NAME),
          /\.spec\.js$/,
        ],
        use: ['babel-loader'],
      },

      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: POST_CSS_CONFIG },
            { loader: 'less-loader', options: { sourceMap: true } },
          ],
        }),
      },

      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: POST_CSS_CONFIG },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        }),
      },

      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: POST_CSS_CONFIG },
          ],
        }),
      },

      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: './assets/fonts/[hash].[ext]',
        },
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          mimetype: 'application/octet-stream',
          name: './assets/fonts/[hash].[ext]',
        },
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          mimetype: 'image/svg',
          name: './assets/fonts/[hash].[ext]',
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        query: {
          name: './assets/images/[hash].[ext]',
        },
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        query: {
          name: './assets/fonts/[hash].[ext]',
        },
      },
      {
        test: /src[/\\].+\.template\.html$/,
        loader: 'raw-loader',
      },
    ],
  },
};
