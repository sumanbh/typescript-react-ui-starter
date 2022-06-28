module.exports = {
  transform: {
    '^.+\\.(js|jsx|mjs|ts|tsx)$': '<rootDir>/scripts/jest/babelTransform.js',
    '^.+\\.css$': '<rootDir>/scripts/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)':
      '<rootDir>/scripts/jest/fileTransform.js',
  },
  testMatch: [
    '<rootDir>/packages/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/packages/**/?(*.)(spec|test).{js,jsx,ts,tsx}',
  ],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/scripts/jest/__mocks__/styleMock.js',
  },
  modulePathIgnorePatterns: ['dist/', 'build/', 'node_modules'],
  collectCoverageFrom: ['<rootDir>/packages/**/src/**/*.{js,jsx,mjs,ts,tsx}'],
  setupFilesAfterEnv: ['<rootDir>/scripts/jest/setupTests.js'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: { url: 'http://localhost' },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleDirectories: ['node_modules', 'src'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
