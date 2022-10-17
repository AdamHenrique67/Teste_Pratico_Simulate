module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'jest-environment-node',
  transform: {                  
    '\\.ts$': 'ts-jest'     
  },
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/src/(.+)': '<rootDir>/src/$1'
  },
  testMatch: ['**/*.spec.ts'],
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
} 