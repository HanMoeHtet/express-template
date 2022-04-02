import { app } from '@src/config/app.config';
import { CLIENT_ORIGIN } from '@src/config/env.config';
import { initLang } from '@src/config/lang.config';
import { rateLimiterByIp } from '@src/config/rate-limiter.config';
import { HttpStatus } from '@src/http/http-status';
import supertest from 'supertest';

const MOCKED_POINTS = (rateLimiterByIp.points = 7);

beforeAll(async () => {
  await initLang();
});

const request = supertest(app);

describe('Test CORS', () => {
  test('Unknown origin should have CORS issue', async () => {
    const SUSPICIOUS_ORIGIN = 'http://suspious.origin';
    const res = await request.get('/').set('Origin', SUSPICIOUS_ORIGIN);
    expect(res.headers['access-control-allow-origin']).not.toBe(
      SUSPICIOUS_ORIGIN
    );
  });

  test('Client origin should not have CORS issue', async () => {
    const res = await request.get('/').set('Origin', CLIENT_ORIGIN);
    expect(res.headers['access-control-allow-origin']).toBe(CLIENT_ORIGIN);
  });
});

describe('Test rate limiter', () => {
  beforeEach(() => {
    // set trust proxy to true to enable x-forwarded-for
    app.set('trust proxy', true);
  });

  test('Can handle specified requests per second', async () => {
    let res;
    for (let i = 0; i < MOCKED_POINTS; i++) {
      res = await request.get('/').set('X-Forwarded-For', '10.10.10.10');
    }
    expect(res?.status).toBe(HttpStatus.OK);
  });

  test('Cannot handle more than specified requests per second', async () => {
    let res;
    for (let i = 0; i < MOCKED_POINTS + 1; i++) {
      res = await request.get('/').set('X-Forwarded-For', '10.10.10.10');
    }
    expect(res?.status).toBe(HttpStatus.TOO_MANY_REQUESTS);
  });

  afterEach(() => {
    app.set('trust proxy', false);
  });
});
