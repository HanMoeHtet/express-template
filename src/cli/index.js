import '@src/bootstrap';
import {
  CliExecutionContext,
  executionContextStorage,
} from '@src/config/execution-context.config';
import { CLI_PATH } from '@src/config/paths.config';
import fs from 'fs';
import path from 'path';

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
      }),
      async () => {
        await import(path.join(CLI_PATH, target));
      }
    );
  }
};

run();
