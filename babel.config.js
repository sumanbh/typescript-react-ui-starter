const defaultPresets = [
  [
    '@babel/preset-env',
    {
      modules: ['esm'].includes(process.env.BABEL_ENV) ? false : 'commonjs',
    },
  ],
  ['@babel/preset-typescript'],
];

const productionPlugins = ['@babel/plugin-transform-react-constant-elements'];

module.exports = {
  ignore: ['**/*.test.ts', '**/*.test.tsx'],
  presets: defaultPresets.concat([
    [
      // eslint-disable-next-line global-require
      require('@babel/preset-react').default,
      {
        runtime: 'automatic',
      },
    ],
  ]),
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    '@babel/plugin-transform-runtime',
    // for IE 11 support
    '@babel/plugin-transform-object-assign',
  ],
  env: {
    cjs: {
      plugins: productionPlugins,
      ignore: ['**/*.test.js'],
    },
    esm: {
      plugins: [
        ...productionPlugins,
        ['@babel/plugin-transform-runtime', { useESModules: true }],
      ],
      ignore: ['**/*.test.js'],
    },
  },
};
