import faker from '@faker-js/faker';
import { User } from '@src/models/user/user.entity';
import { Factory } from './factory';

export const getNewUser = () => {
  const user = new User();
  user.name = `${faker.name.firstName} ${faker.name.lastName}`;
  user.birthDate = faker.date.past(18);

  return user;
};

export class UserFactory extends Factory {}

UserFactory.definitions = () => {
  return {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    birthDate: faker.date.past(18),
  };
};

UserFactory.entityClass = User;
