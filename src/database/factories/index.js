import { User } from '@src/models/user/user.entity';
import { UserFactory } from './user.factory';

export const factories = {
  [User.name]: UserFactory,
};
