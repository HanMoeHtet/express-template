/**
 * Import orders matter
 */

import { init as bootstrap } from './bootstrap';
import { init as initApp } from '@src/config/app.config';

const init = async () => {
  await bootstrap();
  await initApp();
};

init();
