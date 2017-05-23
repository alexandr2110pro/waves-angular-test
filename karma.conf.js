const path = require('path');

const WEBPACK_TEST_CONFIG = require('./config/webpack.test');
const { SRC_DIR_NAME }    = require('./config/directories');

const SPEC_ENTRY = path.join(SRC_DIR_NAME, 'karma.entry.js');

module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    files: [
      SPEC_ENTRY,
    ],

    preprocessors: {
      [SPEC_ENTRY]: ['webpack'],
    },

    webpack: WEBPACK_TEST_CONFIG,
    webpackMiddleware: {
      stats: {
        chunkModules: false,
        colors: true,
      },
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
  });
};
