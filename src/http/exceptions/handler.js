import { ENV } from '@src/config/env.config.js';
import { HttpStatus } from '../http-status.js';
import { HttpException } from './http.exception.js';
import { ValidationException } from './validation.exception.js';

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
    if (err instanceof ValidationException) {
      res.status(err.status).json({
        message: err.message,
        errors: err.errors,
        stack: isProduction ? undefined : err.stack,
      });

      return;
    }

    res.status(err.status).json({
      message: err.message,
      stack: isProduction ? undefined : err.stack,
    });

    return;
  }

  const DEFAULT_ERROR_MESSAGE = 'An error ocurred.';

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    message: isProduction
      ? DEFAULT_ERROR_MESSAGE
      : err.message || DEFAULT_ERROR_MESSAGE,
    stack: isProduction ? undefined : err.stack,
  });
};
