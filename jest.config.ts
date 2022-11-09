import type {Config} from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  resetMocks: true,
  moduleDirectories: ["node_modules"],
  testEnvironment: "node",
  collectCoverageFrom: [
    "src/**/*.{ts,js}",
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
//   globals: {
//     "ts-jest": {
//         isolatedModules: true
//     }
//   }
};
export default config;