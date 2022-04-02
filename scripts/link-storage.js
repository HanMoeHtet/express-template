const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const publicPath = path.resolve(__dirname, '../public');
const storagePath = path.resolve(__dirname, '../storage/public');
const relativeLink = path.relative(publicPath, storagePath);

try {
  fs.symlinkSync(relativeLink, `${publicPath}/storage`, 'dir');
} catch {
  //
}

console.log(
  `Created symlink from ${chalk.green(storagePath)} to ${chalk.green(
    `${publicPath}/storage`
  )}`
);

const testPublicPath = path.resolve(__dirname, '../test/app/public');
const testStoragePath = path.resolve(__dirname, '../test/app/storage/public');
const testRelativeLink = path.relative(testPublicPath, testStoragePath);

try {
  fs.symlinkSync(testRelativeLink, `${testPublicPath}/storage`, 'dir');
} catch {
  //
}

console.log(
  `Created symlink from ${chalk.green(testStoragePath)} to ${chalk.green(
    `${testPublicPath}/storage`
  )}`
);
