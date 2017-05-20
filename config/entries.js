path = require('path');

const { SRC_DIR } = require('./directories');
const MAIN_ENTRY  = path.join(SRC_DIR, 'main.js');

const ENTRIES = module.exports = {
  main: [
    // 'babel-polyfill',
    'webpack-dev-server/client?http://localhost:8080',
    MAIN_ENTRY,
  ],
  vendor: path.resolve(SRC_DIR, 'shared/vendor-modules/index.js'),
  dependencies: path.resolve(SRC_DIR, 'main.dependencies.js'),
};
