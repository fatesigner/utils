/**
 * jest.config
 */

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'html', 'lcov', 'text', 'text-summary', 'clover'],
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jest.babel.js',
    '^.+\\.tsx?$': '<rootDir>/jest.babel.js'
  },
  // testMatch: ['./test/*.ts'],
  testRegex: ['(/tests/.*|(\\.|/)(test))\\.jsx?$', '(/tests/.*|(\\.|/)(test))\\.tsx?$'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!)']
};
