module.exports = {
  collectCoverageFrom: [
    "src/**/*.(ts|tsx)",
    "!**/node_modules/**",
    "!**/__docs__/**",
    "!**/__tests__/*"
  ],
  coverageDirectory: "<rootDir>/.coverage",
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
    "\\.(css|less|s(c|a)ss)$": "<rootDir>/src/__mocks__/style.ts",
    "@/(.*)": "<rootDir>/$1"
  },
  rootDir: ".",
  setupFiles: ["raf/polyfill"],
  setupTestFrameworkScriptFile: "./src/__tests__/setup.ts",
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  transform: { ".(ts|tsx)": "ts-jest" }
};
