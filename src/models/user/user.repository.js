import { appDataSource } from '@src/config/database.config';
import { ExecutionContext } from '@src/config/execution-context.config';
import { User } from './user.entity';

export const userRepository =
  ExecutionContext.getCurrent()?.entityManager?.getRepository(User) ||
  appDataSource.getRepository(User);
