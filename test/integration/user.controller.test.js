import faker from '@faker-js/faker';
import { app } from '@src/config/app.config';
import { closeDatabase, initDatabase } from '@src/config/database.config';
import { initLang } from '@src/config/lang.config';
import { ROOT_PATH } from '@src/config/paths.config';
import { UserFactory } from '@src/database/factories/user.factory';
import { HttpStatus } from '@src/http/http-status';
import { USER_BASE_URI } from '@src/http/routes/user.route';
import path from 'path';
import supertest from 'supertest';
import fs from 'fs';

const request = supertest(app);

const TEST_USER_SIZE = 5;

/**
 * @type {any[]}
 */
let users;

beforeAll(async () => {
  await initLang();
  await initDatabase();

  users = await UserFactory.create(TEST_USER_SIZE);
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
  const userId = faker.datatype
    .number({
      min: TEST_USER_SIZE + 1,
    })
    .toString();

  const response = await request.get(`${USER_BASE_URI}/${userId}`);

  expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
});

test('Create a user', async () => {
  const user = UserFactory.getRaw();

  const createResponse = await request.post(`${USER_BASE_URI}/`).send(user);

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

test('Update user avatar', async () => {
  const user = faker.random.arrayElement(users);

  const avatarPath = path.join(ROOT_PATH, 'test/app/data/avatar.png');

  const uploadUserAvatarResponse = await request
    .put(`${USER_BASE_URI}/${user.id}/avatar`)
    .attach('avatar', avatarPath);

  expect(uploadUserAvatarResponse.statusCode).toBe(HttpStatus.OK);

  const userAvatarPath = uploadUserAvatarResponse.body.data.avatarPath;

  {
    const getUserAvatarResponse = await request.get(`${userAvatarPath}`);
    expect(getUserAvatarResponse.statusCode).toBe(HttpStatus.OK);
  }

  const deleteUserAvatarResponse = await request
    .put(`${USER_BASE_URI}/${user.id}/avatar`)
    .attach('avatar', false);
  expect(deleteUserAvatarResponse.statusCode).toBe(HttpStatus.OK);

  {
    const getUserAvatarResponse = await request.get(`${userAvatarPath}`);
    expect(getUserAvatarResponse.statusCode).toBe(HttpStatus.NOT_FOUND);
  }
});

test('Update suspicious user avatar', async () => {
  const user = faker.random.arrayElement(users);

  const avatarPath = path.join(ROOT_PATH, 'test/app/data/suspicious_avatar.js');

  const uploadUserAvatarResponse = await request
    .put(`${USER_BASE_URI}/${user.id}/avatar`)
    .attach('avatar', avatarPath);

  expect(uploadUserAvatarResponse.statusCode).toBe(
    HttpStatus.UNPROCESSABLE_ENTITY
  );
});

test('Update too large user avatar', async () => {
  const user = faker.random.arrayElement(users);

  const avatarPath = path.join(
    ROOT_PATH,
    'test/app/data/too_large_user_avatar.png'
  );

  const uploadUserAvatarResponse = await request
    .put(`${USER_BASE_URI}/${user.id}/avatar`)
    .attach('avatar', avatarPath);

  expect(uploadUserAvatarResponse.statusCode).toBe(
    HttpStatus.UNPROCESSABLE_ENTITY
  );
});

test('Update a user', async () => {
  const user = faker.random.arrayElement(users);

  const updateData = UserFactory.getRaw();

  const updateResponse = await request
    .put(`${USER_BASE_URI}/${user.id}`)
    .send(updateData);

  expect(updateResponse.statusCode).toBe(HttpStatus.OK);

  const getUpdatedUserResponse = await request.get(
    `${USER_BASE_URI}/${user.id}`
  );

  expect(getUpdatedUserResponse.statusCode).toBe(HttpStatus.OK);

  const { id: _id, ...userWithOutId } = updateData;

  expect(getUpdatedUserResponse.body.data.user).toMatchObject(userWithOutId);
});

test('Update unknown user id throw error', async () => {
  const userId = faker.datatype.number({ min: TEST_USER_SIZE + 1 }).toString();

  const updateData = UserFactory.getRaw();

  const updateResponse = await request
    .put(`${USER_BASE_URI}/${userId}`)
    .send(updateData);

  expect(updateResponse.statusCode).toBe(HttpStatus.NOT_FOUND);
});

test('Delete a user', async () => {
  const user = faker.random.arrayElement(users);

  const deleteResponse = await request.delete(`${USER_BASE_URI}/${user.id}`);

  expect(deleteResponse.statusCode).toBe(HttpStatus.OK);

  const getDeletedUserResponse = await request.get(
    `${USER_BASE_URI}/${user.id}`
  );

  expect(getDeletedUserResponse.statusCode).toBe(HttpStatus.NOT_FOUND);
});

test('Delete unknown user id throw error', async () => {
  const userId = faker.datatype.number({ min: TEST_USER_SIZE + 1 }).toString();

  const deleteResponse = await request.delete(`${USER_BASE_URI}/${userId}`);

  expect(deleteResponse.statusCode).toBe(HttpStatus.NOT_FOUND);
});

afterAll(async () => {
  try {
    fs.rmdirSync(path.join(ROOT_PATH, 'test/app/storage/public/avatars'));
  } catch (e) {
    console.log(e);
  }

  await closeDatabase();
});
