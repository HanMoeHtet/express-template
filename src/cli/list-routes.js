import '@src/bootstrap';
import { consoleLogger } from '@src/config/logger.config';
import { rootPath } from '@src/config/paths.config';
import { getRegisteredRoutes } from '@src/utils/routes';
import fs from 'fs';
import path from 'path';

const run = () => {
  const routes = getRegisteredRoutes();
  const dest = path.join(rootPath, 'routes.json');
  fs.writeFileSync(dest, JSON.stringify(routes, null, 2));
  consoleLogger.info(`Saved the output of the routes to ${dest}`);
};

run();
