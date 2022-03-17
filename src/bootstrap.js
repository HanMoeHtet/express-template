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
  const { ENV } = await import('@src/config/env.config');

  ENV === 'development' &&
    consoleLogger.info(`Loaded environment variables from path: ${envPath}`);
};
