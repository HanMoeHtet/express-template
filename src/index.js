/**
 * Entry point for the application.
 * Order of the imports matter
 */

import { bootstrap } from './bootstrap';
import { initApp } from '@src/config/app.config';
import { initDatabase } from '@src/config/database.config';
import { initLang } from '@src/config/lang.config';
import { initMail } from '@src/config/mail.config';
import { initWs } from '@src/config/ws.config';
import { initRedis } from '@src/config/redis.config';

export const init = async () => {
  await bootstrap();
  await initLang();
  await initMail();
  await initRedis();
  await initDatabase();
  await initApp();
  await initWs();
};

init();
