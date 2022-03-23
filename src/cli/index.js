import { cliPath } from '@src/config/paths.config';
import fs from 'fs';
import path from 'path';

const run = async () => {
  const target = process.argv[2];

  if (!target) {
    fs.readdirSync(cliPath, { withFileTypes: true }).forEach((dirent) => {
      console.log(dirent.name);
    });
  } else {
    await import(path.join(cliPath, target));
  }
};

run();
