import { rateLimiterByIp } from '@src/config/rate-limiter.config';
import { HttpException } from '@src/http/exceptions/HttpException';
import { STATUS_CODES } from 'http';
import { HttpStatus } from '../http-status';
import { asyncHandler } from './async-handler.middleware';

export const rateLimitByIp = asyncHandler(async (req, res, next) => {
  try {
    await rateLimiterByIp.consume(req.ip);
  } catch (e) {
    throw new HttpException(
      HttpStatus.TOO_MANY_REQUESTS,
      STATUS_CODES[HttpStatus.TOO_MANY_REQUESTS]
    );
  }

  next();
});
