const path = require('path');

module.exports = {
  moduleFileExtensions: ['js', 'json'],
  rootDir: 'test',
  testRegex: '.*\\.test\\.js$',
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  setupFiles: [path.join(__dirname, './src/bootstrap.js')],
};

// A hack for jest environment not picking up TZ.
// See https://github.com/bmaupin/jest-timezone-bug
process.env.TZ = 'UTC';
