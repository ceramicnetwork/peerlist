/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
const { defaults } = require('jest-config')

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: ".(spec|test).ts$",
  transformIgnorePatterns: [],
  modulePathIgnorePatterns: [
    "lib"
  ],
  resolver: "jest-resolver-enhanced"
};
