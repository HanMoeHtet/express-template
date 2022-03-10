import supertest from 'supertest';
import { app } from '@src/config/app.config';
import { HttpStatus } from '@src/http/http-status';
import { STATUS_CODES } from 'http';
import { init as initLang } from '@src/config/lang.config';

const request = supertest(app);

beforeAll(async () => {
  await initLang();
});

test('Get /success should return success', async () => {
  const res = await request.get('/api/v1/success');

  expect(res.statusCode).toEqual(HttpStatus.OK);
  expect(res.headers['content-type'].includes('application/json')).toBe(true);
  expect(res.body).toEqual({
    data: 'Success!',
  });
});

test('Get /success with language my should return success', async () => {
  const res = await request
    .get('/api/v1/success')
    .set('Accept-Language', 'my_MM');

  expect(res.statusCode).toEqual(HttpStatus.OK);
  expect(res.headers['content-type'].includes('application/json')).toBe(true);
  expect(res.body).toEqual({
    data: 'အောင်မြင်ပါသည်။',
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
