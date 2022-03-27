const {
  init: initDatabase,
  close: closeDatabase,
} = require('@src/config/database.config');
import faker from '@faker-js/faker';
import { init as initLang } from '@src/config/lang.config';
import { UserFactory } from '@src/database/factories/user.factory';
import { UserNotFoundException } from '@src/http/exceptions/user-not-found.exception';
import * as userService from '@src/services/user.service';

/**
 * @type {any[]}
 */
let users;

beforeAll(async () => {
  await initLang();
  await initDatabase();

  users = await UserFactory.create(5);
});

test('Should return all users', async () => {
  expect(await userService.getAllUsers()).toEqual(users);
});

test('Should return user by id', async () => {
  const user = faker.random.arrayElement(users);
  expect(await userService.getUserById(user.id)).toEqual(user);
});

test('Should not return user by incorrect id', async () => {
  const [user1, user2] = faker.random.arrayElements(users, 2);
  expect(await userService.getUserById(user1.id)).not.toEqual(user2);
});

test('Should throw when user with id is not found', async () => {
  expect(
    async () => await userService.getUserById(Math.random().toString())
  ).rejects.toThrow(UserNotFoundException);
});

test('Should create a user', async () => {
  const newUser = UserFactory.getRaw();

  const newUserId = await userService.createUser(newUser);

  expect(newUserId).toBeDefined();

  if (newUserId) {
    const createdUser = await userService.getUserById(newUserId);

    expect(createdUser).toEqual(newUser);
  }
});

test('Should update a user', async () => {
  const updatedUser = {
    ...faker.random.arrayElement(users),
    ...UserFactory.getRaw(),
  };

  await userService.updateUser(updatedUser);

  expect(await userService.getUserById(updatedUser.id)).toEqual(updatedUser);
});

test('Should throw error if user id is not found when updating', async () => {
  const updatedUser = {
    ...UserFactory.getRaw(),
    id: faker.datatype.number().toString(),
  };
  expect(async () => await userService.updateUser(updatedUser)).rejects.toThrow(
    UserNotFoundException
  );
});

test('Should delete a user', async () => {
  const user = faker.random.arrayElement(users);

  await userService.deleteUser(user.id);

  expect(async () => await userService.getUserById(user.id)).rejects.toThrow(
    UserNotFoundException
  );
});

test('Should throw error if user id is not found when deleting', async () => {
  const userId = faker.datatype.number().toString();

  expect(async () => await userService.deleteUser(userId)).rejects.toThrow(
    UserNotFoundException
  );
});

afterAll(async () => {
  await closeDatabase();
});
