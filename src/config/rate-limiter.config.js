import { RateLimiterMemory } from 'rate-limiter-flexible';
import { ENV } from './env.config';

export const REQUESTS_PER_SECOND_PER_IP = ENV !== 'test' ? 20 : 10;

export const rateLimiterByIp = new RateLimiterMemory({
  points: REQUESTS_PER_SECOND_PER_IP,
  duration: 1, // per 1 second
});
