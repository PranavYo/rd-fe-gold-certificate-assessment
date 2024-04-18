module.exports = {
  testEnvironment: "jsdom",
  transform: { "^.+\\.(js|jsx|ts|tsx)?$": "babel-jest" },
  testPathIgnorePatterns: ["/node_modules/", "/public/"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.js",
  },
  coverageReporters: ["json", "lcov", "text", "clover"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/index.tsx",
    "!**/*-app-env.d.ts",
    "!**/node_modules/**",
    "!src/types/*.{js,jsx,ts,tsx}",
    "!src/reportWebVitals.js",
    "!src/setupTests.js"
  ],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
