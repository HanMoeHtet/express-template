/**
 * Bootstrap all requirements before starting the application
 */

import { config } from 'dotenv';

const env = process.env.NODE_ENV;
const envPath = env ? `.env.${env}` : '.env';

config({
  path: envPath,
});

export const init = async () => {
  const { consoleLogger } = await import('@src/config/logger.config');

  consoleLogger.info(`Loaded environment varaiables from path: ${envPath}`);
};
