module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  modulePaths: ['<rootDir>/src'],
  testMatch: ['**/*.test.*'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  setupTestFrameworkScriptFile: '<rootDir>setupTests.ts',
  testPathIgnorePatterns: ['__snapshots__'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$':
      '<rootDir>/__mocks__/fileMock.ts',
  },
};
