module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  transformIgnorePatterns: ["node_modules/(?!axios)"],
  collectCoverageFrom: [
    "**/src/**/*.{js,vue}",
    "!**/src/router/index.js",
    "!**/src/main.js",
    "!**/src/store/index.js",
    "!**/node_modules/**",
  ],
};
