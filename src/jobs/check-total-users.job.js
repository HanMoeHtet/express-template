import { initDatabase } from '@src/config/database.config';
import { consoleLogger } from '@src/config/logger.config';
import { userRepository } from '@src/models/user/user.repository';
import { CronJob } from 'cron';

export const checkTotalUsersJob = new CronJob({
  cronTime: '*/5 * * * * *', // every 5 seconds
  onTick: async function () {
    const totalUsers = await userRepository.count();
    consoleLogger.info(`Total users: ${totalUsers}`);
  },
});

const run = async () => {
  await initDatabase();
  checkTotalUsersJob.start();
};

run();
