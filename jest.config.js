module.exports = {
  collectCoverage: false,
  preset: 'ts-jest',
  collectCoverageFrom: [
    '<rootDir>/packages/**/src/**/*.ts',
    '!<rootDir>/packages/**/src/**/index.ts',
    '!<rootDir>/packages/flex-plugins-api-utils/src/exceptions/*.ts',
  ],
  testMatch: ['<rootDir>/packages/**/*.test.ts'],
  transform: {
    '^.+\\.js?$': '<rootDir>/node_modules/babel-jest',
  },
  testPathIgnorePatterns: ['/node_modules/'],
  coveragePathIgnorePatterns: ['/node_modules/'],
};
