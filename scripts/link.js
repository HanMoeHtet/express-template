const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const publicPath = path.resolve(__dirname, '../public');
const storagePath = path.resolve(__dirname, '../storage/public');
const relativeLink = path.relative(publicPath, storagePath);

fs.symlinkSync(relativeLink, `${publicPath}/storage`, 'dir');

console.log(
  `Created symlink from ${chalk.green(storagePath)} to ${chalk.green(
    `${publicPath}/storage`
  )}`
);
