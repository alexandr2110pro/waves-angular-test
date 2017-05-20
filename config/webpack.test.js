const _find    = require('lodash/find');
const minimist = require('minimist');
const path     = require('path');

const webpack           = require('webpack');
const NgAnnotatePlugin  = require('ng-annotate-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const COMMON_WEBPACK_CONFIG = require('./webpack.common');

const { SRC_DIR } = require('./directories');

const ARGV         = minimist(process.argv.slice(2));
const HAS_COVERAGE = _find(ARGV._, /coverage/);

const include = [path.resolve(SRC_DIR)];

const basicLoaders = [
  {
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  },

  {
    test: /src[/\\].+\.template\.html$/,
    loader: 'raw-loader',
  },

  {
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'less-loader'],
  },

  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  },
];

const preLoaders = HAS_COVERAGE

  ? [
    {
      test: /\.spec\.js$/,
      use: ['babel-loader'],
      enforce: 'pre',
      include,
    },

    {
      test: /\.js$/,
      use: ['isparta-loader'],
      exclude: [
        /node_modules/,
        /src\/shared\/vendor-modules/,
        /karma\.entry\.js$/,
        /\.spec\.js$/,
        /\.mock\.js$/,
      ],
      enforce: 'pre',
      include,
    },
  ]

  : [
    {
      test: /\.js$/,
      use: ['babel-loader'],
      enforce: 'pre',
      include,
    },
  ];


const rules = [
  ...preLoaders,
  ...basicLoaders,
];


// ------------------------------------


const WEBPACK_TEST_CONFIG = module.exports = Object.assign(COMMON_WEBPACK_CONFIG, {
  cache: true,
  devtool: 'inline-source-map',
  entry: () => ({}),
  output: {},
  devServer: {},
  plugins: [
    new NgAnnotatePlugin(),
  ],
  module: { rules },
});
