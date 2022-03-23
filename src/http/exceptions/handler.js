import { ENV } from '@src/config/env.config.js';
import { HttpStatus } from '../http-status.js';
import { HttpException } from './http.exception.js';
import { STATUS_CODES } from 'http';

export const handler = (err, req, res, next) => {
  /*
   * When headers are already sent, let default handler handle.
   * See https://expressjs.com/en/guide/error-handling.html
   */
  if (res.headersSent) {
    next(err);
    return;
  }

  const isProduction = ENV === 'production';

  if (err instanceof HttpException) {
    err.handle();
    return;
  }

  const DEFAULT_ERROR_MESSAGE = STATUS_CODES[HttpStatus.INTERNAL_SERVER_ERROR];

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    message: isProduction
      ? DEFAULT_ERROR_MESSAGE
      : err.message || DEFAULT_ERROR_MESSAGE,
    stack: isProduction ? undefined : err.stack,
  });
};
