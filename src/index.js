/**
 * Entry point for the application.
 * Order of the imports matter
 */
import { bootstrap } from './bootstrap';
import { initDatabase } from '@src/config/database.config';
import { initLang } from '@src/config/lang.config';
import { initApp } from '@src/config/app.config';
import '@src/config/ws.config';

export const init = async () => {
  await bootstrap();
  await initLang();
  await initDatabase();
  await initApp();
};

init();
