import {
  appDataSource,
  init as initDatabase,
} from '@src/config/database.config';
import { CliExecutionContext } from '@src/config/execution-context.config';
import { UserSeeder } from '@src/database/seeders/user.seeder';

const run = async () => {
  await initDatabase();

  await appDataSource.transaction(async (entityManager) => {
    const ctx = CliExecutionContext.getCurrent();

    if (!ctx) {
      throw new Error('CLI execution context is not set.');
    }

    ctx.data.entityManager = entityManager;

    await UserSeeder.run();
  });

  process.exit(0);
};

run();
