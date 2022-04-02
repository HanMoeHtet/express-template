import { symlinkSync } from 'fs';
import path from 'path';
import { green } from 'chalk';
import { PUBLIC_PATH, ROOT_PATH, STORAGE_PATH } from '@src/config/paths.config';
import { consoleLogger } from '@src/config/logger.config';

const publicPath = PUBLIC_PATH;
const storagePath = path.join(STORAGE_PATH, 'public');
const relativeLink = path.relative(publicPath, storagePath);

try {
  symlinkSync(relativeLink, `${publicPath}/storage`, 'dir');
} catch {
  //
}

consoleLogger.info(
  `Created symlink from ${green(storagePath)} to ${green(
    `${publicPath}/storage`
  )}`
);

const testPublicPath = path.join(ROOT_PATH, 'test/app/public');
const testStoragePath = path.join(ROOT_PATH, 'test/app/storage/public');
const testRelativeLink = path.relative(testPublicPath, testStoragePath);

try {
  symlinkSync(testRelativeLink, `${testPublicPath}/storage`, 'dir');
} catch {
  //
}

consoleLogger.info(
  `Created symlink from ${green(testStoragePath)} to ${green(
    `${testPublicPath}/storage`
  )}`
);
