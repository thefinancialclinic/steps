module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  modulePaths: ['<rootDir>/src'],
  testMatch: ['**/*.test.*'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  setupTestFrameworkScriptFile: '<rootDir>setupTests.ts',
  testPathIgnorePatterns: ['__snapshots__'],
  snapshotSerializers: ['enzyme-to-json/serializer']
};
