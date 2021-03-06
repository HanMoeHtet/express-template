import { consoleLogger } from '@src/config/logger.config';
import { ROOT_PATH } from '@src/config/paths.config';
import { getRegisteredRoutes } from '@src/utils/routes.util';
import fs from 'fs';
import path from 'path';

const run = () => {
  const routes = getRegisteredRoutes();
  const dest = path.join(ROOT_PATH, 'routes.json');
  fs.writeFileSync(dest, JSON.stringify(routes, null, 2));
  consoleLogger.info(`Saved the output of the routes to ${dest}`);
};

run();
