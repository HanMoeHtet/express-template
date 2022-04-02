import faker from '@faker-js/faker';
import { User } from '@src/models/user/user.entity';
import { DateTime } from 'luxon';
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
    birthDate: DateTime.fromJSDate(
      faker.date.past(1, DateTime.utc().minus({ year: 18 }).toISO())
    )
      .startOf('day')
      .toUnixInteger(),
    avatarPath: null,
  };
};

UserFactory.entityClass = User;
