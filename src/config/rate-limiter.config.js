import { RateLimiterMemory } from 'rate-limiter-flexible';

export const REQUESTS_PER_SECOND_PER_IP = 10;

export const rateLimiterByIp = new RateLimiterMemory({
  points: REQUESTS_PER_SECOND_PER_IP,
  duration: 1, // per 1 second
});
