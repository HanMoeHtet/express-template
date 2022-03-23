import '@src/bootstrap';
import {
  CliExecutionContext,
  executionContextStorage,
} from '@src/config/execution-context.config';
import { cliPath } from '@src/config/paths.config';
import fs from 'fs';
import path from 'path';

const defaultRun = () => {
  fs.readdirSync(cliPath, { withFileTypes: true }).forEach((dirent) => {
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
        await import(path.join(cliPath, target));
      }
    );
  }
};

run();
