import { UserSchema } from '@src/models/user/user.entity';
import { DataSource } from 'typeorm';
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
  ENV,
} from './env.config';
import { consoleLogger } from './logger.config';

/** @type {import('typeorm').DataSourceOptions} */
const dataSourceOptions = (() => {
  /** @type {import('typeorm').DataSourceOptions} */
  const commonOptions = {
    type: 'mysql',
    host: DATABASE_HOST,
    port: 3306,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    synchronize: true,
    entities: [UserSchema],
    migrations: [],
    subscribers: [],
  };

  if (ENV === 'production') {
    return {
      ...commonOptions,
    };
  }

  if (ENV === 'test') {
    return {
      ...commonOptions,
      dropSchema: true,
    };
  }

  return {
    ...commonOptions,
    logging: true,
  };
})();

export const appDataSource = new DataSource(dataSourceOptions);

export const initDatabase = async () => {
  await appDataSource.initialize();
  ENV === 'development' && consoleLogger.info('Initialized database.');
};

export const closeDatabase = async () => {
  ENV === 'test' && (await appDataSource.dropDatabase());
  await appDataSource.destroy();
};
