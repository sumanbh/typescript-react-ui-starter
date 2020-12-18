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
  presets: defaultPresets.concat(['@babel/preset-react']),
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      '@babel/plugin-proposal-object-rest-spread',
      {
        loose: true,
      },
    ],
    '@babel/plugin-transform-runtime',
    // for IE 11 support
    '@babel/plugin-transform-object-assign',
  ],
  env: {
    cjs: {
      plugins: productionPlugins,
      ignore: ['**/*.test.js'],
    },
    es: {
      plugins: [
        ...productionPlugins,
        ['@babel/plugin-transform-runtime', { useESModules: true }],
      ],
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
