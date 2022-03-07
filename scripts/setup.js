/**
 * Set up requirements when the project is cloned for the first time
 */

const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');
const chalk = require('chalk');

const DEFAULT_APP_NAME = 'express-template';
const APP_NAME = process.argv[2] || DEFAULT_APP_NAME; // Change here if you want to use a different name

console.log(`Using app name: ${chalk.green(APP_NAME)}.`);

// Copy .env.example to .env, .env.production and .env.test.
const envExamplePath = path.join(__dirname, '../.env.example');
fs.copyFileSync(envExamplePath, path.join(__dirname, '../.env'));
fs.copyFileSync(envExamplePath, path.join(__dirname, '../.env.production'));
fs.copyFileSync(envExamplePath, path.join(__dirname, '../.env.test'));

console.log(`Created .env files.`);

// Change app name in package.json
packageJson.name = APP_NAME;
packageJson.scripts.pm2 = packageJson.scripts.pm2.replace(
  DEFAULT_APP_NAME,
  APP_NAME
);
fs.writeFileSync(
  path.join(__dirname, '../package.json'),
  JSON.stringify(packageJson, null, 2)
);

console.log(`Changed app name in package.json.`);

// Change app name in public/index.html
let publicHtmlContent = fs
  .readFileSync(path.join(__dirname, '../public/index.html'))
  .toString();
publicHtmlContent = publicHtmlContent.replace(DEFAULT_APP_NAME, APP_NAME);
fs.writeFileSync(
  path.join(__dirname, '../public/index.html'),
  publicHtmlContent
);

console.log(`Changed app name in public/index.html.`);
