export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {'^.+\\.ts?$': 'ts-jest'},
  testMatch: ['<rootDir>/src/test/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['dotenv/config'],
  moduleNameMapper: {
    '^@client(.*)$': '<rootDir>/src/client$1',
    '^@commands(.*)$': '<rootDir>/src/commands$1',
  }
}
