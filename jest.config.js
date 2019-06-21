module.exports = {
  collectCoverageFrom: [
    "src/**/*.(ts|tsx)",
    "!**/node_modules/**",
    "!**/__docs__/**",
    "!**/__tests__/*",
  ],
  coverageDirectory: "<rootDir>/.coverage",
  coverageReporters: ["lcov", "text", "text-summary"],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  moduleDirectories: ["node_modules", "<rootDir>"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/$1",
    "\\.(css|less|s(c|a)ss)$": "<rootDir>/src/__mocks__/style.ts",
  },
  rootDir: ".",
  setupFiles: ["raf/polyfill"],
  setupFilesAfterEnv: ["./src/__tests__/setup.ts"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  testPathIgnorePatterns: ["/node_modules/", "/examples/"],
  transform: { ".(ts|tsx)": "ts-jest" },
};
