import { createClient } from 'redis';
import { ENV, REDIS_URL } from './env.config';
import { consoleLogger } from './logger.config';

export const client = createClient({
  url: REDIS_URL,
});

export const initRedis = async () => {
  new Promise((resolve, reject) => {
    client.on('error', (err) => {
      reject(err);
    });

    client.on('ready', () => {
      ENV === 'development' && consoleLogger.info('Initialized Redis.');
      resolve(null);
    });

    client.connect();
  });
};

export const closeRedis = async () => {
  await client.quit();
};
