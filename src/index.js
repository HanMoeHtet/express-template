/**
 * Entry point for the application.
 * Order of the imports matter
 */

import { init as bootstrap } from './bootstrap';
import { init as initApp } from '@src/config/app.config';
import { init as initLang } from '@src/config/lang.config';

export const init = async () => {
  await bootstrap();
  await initLang();
  await initApp();
};

init();
