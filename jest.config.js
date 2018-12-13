module.exports = {
  collectCoverageFrom: [
    "**/*.(ts|tsx)",
    "!**/node_modules/**",
    "!**/*.(story|test).(ts|tsx)"
  ],
  coverageDirectory: "<rootDir>/../.coverage",
  coverageReporters: ["lcov", "text", "text-summary"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
      // branches: 90,
      // functions: 90,
      // lines: 90,
      // statements: 90
    }
  },
  moduleDirectories: ["node_modules", "<rootDir>"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "\\.(css|less|s(c|a)ss)$": "<rootDir>/../__mocks__/style.ts",
    "@/(.*)": "<rootDir>/$1"
  },
  rootDir: "src",
  setupFiles: ["raf/polyfill"],
  setupTestFrameworkScriptFile: "./__tests__/setup.ts",
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  transform: {
    ".(ts|tsx)": "ts-jest"
  }
};
