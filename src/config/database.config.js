import { UserSchema } from '@src/models/user/user.entity';
import { DataSource } from 'typeorm';
import {
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
  ENV,
} from './env.config';
import { consoleLogger } from './logger.config';

export const appDataSource = new DataSource({
  type: 'mysql',
  host: DATABASE_HOST,
  port: 3306,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: 'express-template',
  synchronize: true,
  logging: ENV === 'development',
  entities: [UserSchema],
  migrations: [],
  subscribers: [],
});

export const init = async () => {
  await appDataSource.initialize();
  consoleLogger.info('Initialized database.');
};
