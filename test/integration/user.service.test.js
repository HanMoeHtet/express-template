import faker from '@faker-js/faker';
import {
  appDataSource,
  closeDatabase,
  initDatabase,
} from '@src/config/database.config';
import {
  CliExecutionContext,
  executionContextStorage,
} from '@src/config/execution-context.config';
import { initLang, i18next } from '@src/config/lang.config';
import { UserNotFoundException } from '@src/http/exceptions/user-not-found.exception';
import { UserFactory } from '@src/database/factories/user.factory';

/**
 * @type {any[]}
 */
let users;

/**
 * @type {import('@src/services/user.service')}
 */
let userService;

const TEST_USER_SIZE = 5;

beforeAll(async () => {
  await initLang();
  await initDatabase();

  executionContextStorage.enterWith(
    new CliExecutionContext({
      entityManager: appDataSource.manager,
      translator: i18next.cloneInstance(),
    })
  );

  userService = await import('@src/services/user.service');

  users = await UserFactory.create(TEST_USER_SIZE);
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

test('Should update user avatar', async () => {
  const user = faker.random.arrayElement(users);
  const avatarPath = Math.random().toString();

  await userService.updateUserAvatar({
    id: user.id,
    avatarPath,
  });

  const updatedUser = await userService.getUserById(user.id);

  expect(updatedUser.avatarPath).toEqual(avatarPath);
});

test('Should remove user avatar', async () => {
  const user = faker.random.arrayElement(users);

  await userService.updateUserAvatar({
    id: user.id,
    avatarPath: undefined,
  });

  const updatedUser = await userService.getUserById(user.id);

  expect(updatedUser.avatarPath).toEqual(null);
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
    id: faker.datatype
      .number({
        min: TEST_USER_SIZE + 1,
      })
      .toString(),
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
  const userId = faker.datatype
    .number({
      min: TEST_USER_SIZE,
    })
    .toString();

  expect(async () => await userService.deleteUser(userId)).rejects.toThrow(
    UserNotFoundException
  );
});

afterAll(async () => {
  await closeDatabase();
});
