module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'html', 'lcov', 'text', 'text-summary', 'clover'],
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsconfig: 'tsconfig.test.json'
    }
  },
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.tsx?$',
  // testMatch: ['./test/*.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)']
};
