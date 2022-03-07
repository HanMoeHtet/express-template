import supertest from 'supertest';
import { app } from '@src/config/app.config';
import { HttpStatus } from '@src/http/http-status';
import { STATUS_CODES } from 'http';

const request = supertest(app);

test('Get /success should return success', async () => {
  const res = await request.get('/api/v1/success');

  expect(res.statusCode).toEqual(HttpStatus.OK);
  expect(res.headers['content-type'].includes('application/json')).toBe(true);
  expect(res.body).toEqual({
    data: 'Success!',
  });
});

test('Get /error should return error', async () => {
  const res = await request.get('/api/v1/fail');

  expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
  expect(res.headers['content-type'].includes('application/json')).toBe(true);
  expect(res.body).toHaveProperty(
    'message',
    STATUS_CODES[HttpStatus.BAD_REQUEST]
  );
});
