import { rateLimiterByIp } from '@src/config/rate-limiter.config';
import { HttpException } from '@src/http/exceptions/http.exception';
import { HttpStatus } from '../http-status';
import { asyncHandler } from './async-handler.middleware';

export const rateLimitByIp = asyncHandler(
  async (/** @type {import('express').Request} */ req, res, next) => {
    try {
      await rateLimiterByIp.consume(req.ip);
    } catch (e) {
      throw new HttpException(HttpStatus.TOO_MANY_REQUESTS);
    }

    next();
  }
);
