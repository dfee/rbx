module.exports = {
  setupFiles: ["raf/polyfill"],
  setupTestFrameworkScriptFile: "./__tests__/setup.ts",
  rootDir: "src",
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  coverageDirectory: "<rootDir>/../.coverage",
  collectCoverageFrom: [
    "**/*.ts",
    "**/*.tsx",
    "!**/node_modules/**",
    "!**/*.story.js",
    "!**/*.test.ts",
    "!**/*.test.tsx"
  ],
  coverageReporters: ["lcov", "text", "text-summary"],
  moduleDirectories: ["node_modules", "<rootDir>"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleNameMapper: {
    "\\.(css|less|s(c|a)ss)$": "<rootDir>/../__mocks__/style.ts",
    "services(.*)$": "<rootDir>/services$1"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"]
};
