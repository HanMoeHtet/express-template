import i18nextHttpMiddleware from 'i18next-http-middleware';
import { i18next } from '@src/config/lang.config';

export const i18nextMiddleware = i18nextHttpMiddleware.handle(i18next);
