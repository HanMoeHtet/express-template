import {
  getValueFromEnvOrFail,
  removeTrailingForwardSlash,
} from '@src/utils/index.js';

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

export const LOCALE = process.env.LOCALE || 'en_US';
