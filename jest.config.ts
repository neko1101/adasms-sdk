import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  resetMocks: true,
  moduleDirectories: ["node_modules"],
  testEnvironment: "node",
  collectCoverageFrom: [
    "src/*",
    "!src/**/*.d.ts"
],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  preset: 'ts-jest',
  rootDir: ".",
  displayName: "adasms-client",
  moduleFileExtensions: ["ts", "js", "json"],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  coverageReporters: [
    "json-summary", 
    "text",
    "lcov"
  ]
}

export default config