import { ENV } from '@src/config/env.config.js';
import { consoleLogger } from '@src/config/logger.config.js';
import chalk from 'chalk';

export const requestLogger = (req, res, next) => {
  if (ENV === 'development') {
    const start = new Date();
    res.on('finish', () => {
      const end = new Date();
      const diff = end.getTime() - start.getTime();
      if (res.statusCode >= 500) {
        consoleLogger.error(
          `${chalk.green(req.method)} ${req.originalUrl} ${chalk.red(
            res.statusCode
          )} (${diff} ms)`
        );
      } else if (res.statusCode >= 400) {
        consoleLogger.warn(
          `${chalk.green(req.method)} ${req.originalUrl} ${chalk.yellow(
            res.statusCode
          )} (${diff} ms)`
        );
      } else {
        consoleLogger.info(
          `${chalk.green(req.method)} ${req.originalUrl} ${
            res.statusCode
          } (${diff} ms)`
        );
      }
    });
  }

  next();
};
