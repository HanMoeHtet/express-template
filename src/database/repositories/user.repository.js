import { appDataSource } from '@src/config/database.config';
import { User } from '../entities/user.entity';

export const userRepository = appDataSource.getRepository(User);
