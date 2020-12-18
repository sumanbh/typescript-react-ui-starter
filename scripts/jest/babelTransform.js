const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: [['react-app', { flow: false, typescript: true }]],
  babelrc: false,
  configFile: false,
});
