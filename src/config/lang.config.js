import chalk from 'chalk';
import i18next from 'i18next';
import { ENV } from './env.config';
import { consoleLogger } from './logger.config';
import i18nextHttpMiddleware from 'i18next-http-middleware';
import i18nextFsBackend from 'i18next-fs-backend';
import path from 'path';
import { resourcesPath } from './paths.config';

if (ENV === 'development') {
  i18next.on('added', (lng, ns) => {
    consoleLogger.info(
      `Added language ${chalk.green(lng)} to namespace ${chalk.green(ns)}.`
    );
  });

  i18next.on('failedLoading', (lng, ns, msg) => {
    consoleLogger.error(
      `Failed loading language ${chalk.red(lng)} to namespace ${chalk.red(
        ns
      )}: ${msg}.`
    );
  });

  i18next.on('initialized', () => {
    consoleLogger.info('Initialized i18next.');
  });

  i18next.on('languageChanged', (lng) => {
    consoleLogger.info(`Language changed to ${chalk.green(lng)}.`);
  });

  i18next.on('loaded', (loaded) => {
    consoleLogger.info(
      `Loaded languages ${chalk.green(Object.keys(loaded).join(', '))}.`
    );
  });

  i18next.on('missingKey', (lngs, ns, key, res) => {
    consoleLogger.error(
      `Missing key ${chalk.red(key)} in namespace ${chalk.red(
        ns
      )} while translating ${chalk.red(res)}.`
    );
  });

  i18next.on('removed', (lng, ns) => {
    consoleLogger.info(
      `Removed language ${chalk.green(lng)} from namespace ${chalk.green(ns)}.`
    );
  });
}

i18next
  .use(i18nextHttpMiddleware.LanguageDetector)
  .use(i18nextFsBackend)
  .init({
    preload: ['en'],
    fallbackLng: 'en',
    defaultNS: 'common',
    backend: {
      loadPath: path.join(resourcesPath, 'lang/{{lng}}/{{ns}}.json'),
      addPath: path.join(resourcesPath, 'lang/{{lng}}/{{ns}}.missing.json'),
    },
  });

export { i18next };
