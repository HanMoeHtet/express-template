const path = require('path');

module.exports = {
  moduleFileExtensions: ['js', 'json'],
  rootDir: 'test',
  testRegex: '.*\\.test\\.js$',
  collectCoverageFrom: ['**/*.js'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  setupFiles: [path.join(__dirname, './src/bootstrap.js')],
};
