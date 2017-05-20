const autoprefixer = require('autoprefixer');

const POST_CSS_CONFIG = module.exports = {
  plugins: () => [autoprefixer],
  sourceMap: true,
};
