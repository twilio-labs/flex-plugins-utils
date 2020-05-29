module.exports = {
  collectCoverage: false,
  preset: 'ts-jest',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/index.ts'
  ],
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  transform: {
    '^.+\\.js?$': '<rootDir>/node_modules/babel-jest',
  },
  testPathIgnorePatterns: ['/node_modules/'],
  coveragePathIgnorePatterns: ['/node_modules/'],
};
