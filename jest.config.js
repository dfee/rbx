module.exports = {
  collectCoverageFrom: [
    "**/*.(ts|tsx)",
    "!**/node_modules/**",
    "!**/__tests__/*",
    "!**/*.(story|test).(ts|tsx)"
  ],
  coverageDirectory: "<rootDir>/../.coverage",
  coverageReporters: ["lcov", "text", "text-summary"],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    }
  },
  moduleDirectories: ["node_modules", "<rootDir>"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "\\.(css|less|s(c|a)ss)$": "<rootDir>/../src/__mocks__/style.ts",
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
