export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {'^.+\\.ts?$': 'ts-jest'},
  testMatch: ['<rootDir>/src/test/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['dotenv/config'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
