module.exports = {
  moduleNameMapper: {
    "\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
  },
  setupFiles: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
};
