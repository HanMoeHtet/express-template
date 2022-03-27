/**
 * Entry point for the application.
 * Order of the imports matter
 */
import { bootstrap } from './bootstrap';
import { initDatabase } from '@src/config/database.config';
import { initLang } from '@src/config/lang.config';
import { initApp } from '@src/config/app.config';
import { initWs } from '@src/config/ws.config';
import { initRedis } from './config/redis.config';

export const init = async () => {
  await bootstrap();
  await initLang();
  await initRedis();
  await initDatabase();
  await initApp();
  await initWs();
};

init();
