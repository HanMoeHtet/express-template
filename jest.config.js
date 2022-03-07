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

// A hack for jest environment not picking up TZ.
// See https://github.com/bmaupin/jest-timezone-bug.
// Since we already have TZ set in the environment, we can just re-assign it.
const TZ = process.env.TZ;
process.env.TZ = TZ;
