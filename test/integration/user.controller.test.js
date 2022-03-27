import faker from '@faker-js/faker';
import { app } from '@src/config/app.config';
import { initDatabase, closeDatabase } from '@src/config/database.config';
import { initLang } from '@src/config/lang.config';
import { UserFactory } from '@src/database/factories/user.factory';
import { HttpStatus } from '@src/http/http-status';
import { USER_BASE_URI } from '@src/http/routes/user.route';
import supertest from 'supertest';

const request = supertest(app);

/**
 * @type {any[]}
 */
let users;

beforeAll(async () => {
  await initLang();
  await initDatabase();

  users = await UserFactory.create(5);
});

test('Get all users', async () => {
  const response = await request.get(`${USER_BASE_URI}/`);

  expect(response.statusCode).toBe(HttpStatus.OK);

  expect(response.body.data.users).toEqual(users);
});

test('Get a user', async () => {
  const user = faker.random.arrayElement(users);

  const response = await request.get(`${USER_BASE_URI}/${user.id}`);

  expect(response.statusCode).toBe(HttpStatus.OK);

  expect(response.body.data.user).toEqual(user);
});

test('Get an unknown user should return not found', async () => {
  const userId = faker.datatype.number().toString();

  const response = await request.get(`${USER_BASE_URI}/${userId}`);

  expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
});

test('Create a user', async () => {
  const user = UserFactory.getRaw();

  const createResponse = await request.post(`${USER_BASE_URI}/`).send(user);

  console.log(createResponse.body);
  console.log(user);

  expect(createResponse.statusCode).toBe(HttpStatus.CREATED);

  const userId = createResponse.body.data.userId;

  expect(typeof userId).toBe('string');

  const getCreatedUserResponse = await request.get(
    `${USER_BASE_URI}/${userId}`
  );

  expect(getCreatedUserResponse.statusCode).toBe(HttpStatus.OK);

  const { id: _id, ...userWithOutId } = user;

  expect(getCreatedUserResponse.body.data.user).toMatchObject(userWithOutId);
});

afterAll(async () => {
  await closeDatabase();
});
