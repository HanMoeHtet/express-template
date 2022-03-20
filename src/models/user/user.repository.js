import { appDataSource } from '@src/config/database.config';
import { User } from './user.entity';

export const userRepository = appDataSource.getRepository(User);
