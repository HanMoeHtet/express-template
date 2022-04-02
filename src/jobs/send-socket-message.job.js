import { consoleLogger } from '@src/config/logger.config';
import { initWs, io } from '@src/config/ws.config';
import { CronJob } from 'cron';

export const sendSocketMessageJob = new CronJob({
  cronTime: '*/5 * * * * *', // every 5 seconds
  onTick: function () {
    const date = new Date();
    io.emit('message', date);
    consoleLogger.info('Sent socket message.');
  },
});

const run = async () => {
  await initWs();
  sendSocketMessageJob.start();
};

run();
