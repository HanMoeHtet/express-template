import '@src/bootstrap';
import { appDataSource } from '@src/config/database.config';
import {
  CliExecutionContext,
  executionContextStorage,
} from '@src/config/execution-context.config';
import { CLI_PATH } from '@src/config/paths.config';
import fs from 'fs';
import path from 'path';
import { i18next } from '@src/config/lang.config';

const defaultRun = () => {
  fs.readdirSync(CLI_PATH, { withFileTypes: true }).forEach((dirent) => {
    console.log(dirent.name);
  });
};

const run = async () => {
  const target = process.argv[2];
  if (!target) {
    defaultRun();
  } else {
    executionContextStorage.run(
      new CliExecutionContext({
        args: process.argv.slice(3),
        entityManager: appDataSource.manager,
        translator: i18next.cloneInstance(),
      }),
      async () => {
        await import(path.join(CLI_PATH, target));
      }
    );
  }
};

run();
