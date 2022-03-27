import { rateLimiterByIp } from '@src/config/rate-limiter.config';
import { HttpException } from '@src/http/exceptions/http.exception';
import { asyncHandler } from '../async-handler';
import { HttpStatus } from '../http-status';

export const rateLimitByIp = asyncHandler(async function rateLimitByIp(
  /** @type {import('express').Request} */ req,
  res,
  next
) {
  try {
    await rateLimiterByIp.consume(req.ip);
  } catch (e) {
    throw new HttpException(HttpStatus.TOO_MANY_REQUESTS);
  }

  next();
});
