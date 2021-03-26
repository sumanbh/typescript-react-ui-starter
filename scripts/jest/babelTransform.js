/* eslint-disable global-require */

const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: [
    [
      // ES features necessary for user's Node version
      require('@babel/preset-env').default,
      {
        targets: {
          node: 'current',
        },
      },
    ],
    [
      require('@babel/preset-react').default,
      {
        // Adds component stack to warning messages
        // Adds __self attribute to JSX which React will use for some warnings
        development: true,
        // Will use the native built-in instead of trying to polyfill
        // behavior for any plugins that require one.
        runtime: 'automatic',
      },
    ],
    [require('@babel/preset-typescript').default],
  ],
  babelrc: false,
  configFile: false,
});
