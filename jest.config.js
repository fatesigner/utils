module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'html', 'lcov', 'text', 'text-summary', 'clover'],
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsConfig: 'tsconfig.test.json'
    }
  },
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.tsx?$',
  // testMatch: ['./test/*.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
