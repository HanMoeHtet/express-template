import { app } from '@src/config/app.config';
import { CLIENT_ORIGIN } from '@src/config/env.config';
import { REQUESTS_PER_SECOND_PER_IP } from '@src/config/rate-limiter.config';
import supertest from 'supertest';

const request = supertest(app);

describe('Test CORS', () => {
  test('Unknown origin should have CORS issue', async () => {
    const SUSPIOUS_ORIGIN = 'http://suspious.origin';
    const res = await request.get('/').set('Origin', SUSPIOUS_ORIGIN);
    expect(res.headers['access-control-allow-origin']).not.toBe(
      SUSPIOUS_ORIGIN
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

  test(`Can handle ${REQUESTS_PER_SECOND_PER_IP} requests per second`, async () => {
    for (let i = 0; i < REQUESTS_PER_SECOND_PER_IP; i++) {
      const res = await request.get('/').set('X-Forwarded-For', '10.10.10.10');
      expect(res.status).toBe(200);
    }
  });

  test('Cannot handle 11 requests per second', async () => {
    for (let i = 0; i < REQUESTS_PER_SECOND_PER_IP + 1; i++) {
      const res = await request.get('/').set('X-Forwarded-For', '10.10.10.10');
      expect(res.status).toBe(429);
    }
  });

  afterEach(() => {
    app.set('trust proxy', false);
  });
});
