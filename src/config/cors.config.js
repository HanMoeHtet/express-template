import { removeTrailingForwardSlash } from '@src/utils';
import { CLIENT_ORIGIN } from './env.config';

/**
 * @type {import('cors').CorsOptions}
 */
export const corsOptions = {
  origin: [CLIENT_ORIGIN].map(removeTrailingForwardSlash),
};
