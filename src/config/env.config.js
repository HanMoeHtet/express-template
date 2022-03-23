import { getValueFromEnvOrFail } from '@src/utils/env.util';
import { removeTrailingForwardSlash } from '@src/utils/string.util';

export const CLIENT_ORIGIN = removeTrailingForwardSlash(
  getValueFromEnvOrFail('CLIENT_ORIGIN')
);

export const PORT = (() => {
  const value = Number.parseInt(getValueFromEnvOrFail('PORT'), 10);

  if (isNaN(value)) {
    throw new Error('Invalid port number.');
  }

  return value;
})();

/**
 * @type {'production' | 'development' | 'test'}
 */
export const ENV = (() => {
  const env = process.env.NODE_ENV;
  if (!env) {
    return 'development';
  }

  if (env !== 'production' && env !== 'development' && env !== 'test') {
    throw new Error('Invalid NODE_ENV.');
  }

  return env;
})();

export const DATABASE_HOST = getValueFromEnvOrFail('DATABASE_HOST');

export const DATABASE_USERNAME = getValueFromEnvOrFail('DATABASE_USERNAME');

export const DATABASE_PASSWORD = getValueFromEnvOrFail('DATABASE_PASSWORD');

export const DATABASE_NAME = getValueFromEnvOrFail('DATABASE_NAME');
