/**
 * jest.config
 */

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'html', 'lcov', 'text', 'text-summary', 'clover'],
  globals: {},
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  transform: {
    '^.+\\.[jt]sx?$': [
      'babel-jest',
      {
        configFile: './babel.test.config.js'
      }
    ]
  },
  testRegex: ['(/tests/.*|(\\.|/)(test))\\.jsx?$', '(/tests/.*|(\\.|/)(test))\\.tsx?$'],
  // testMatch: ['./test/*.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^\\.\\./dist/(.*)$': '<rootDir>/dist/$1.cjs'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(chai|lodash-es)/)']
};
