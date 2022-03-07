import { ENV } from '@src/config/env.config.js';
import { consoleLogger } from '@src/config/logger.config.js';
import chalk from 'chalk';

export const requestLogger = (req, res, next) => {
  if (ENV === 'development') {
    res.on('finish', () => {
      if (res.statusCode >= 500) {
        consoleLogger.error(
          `${chalk.green(req.method)} ${req.originalUrl} ${chalk.red(
            res.statusCode
          )}`
        );
      } else if (res.statusCode >= 400) {
        consoleLogger.warn(
          `${chalk.green(req.method)} ${req.originalUrl} ${chalk.yellow(
            res.statusCode
          )}`
        );
      } else {
        consoleLogger.info(
          `${chalk.green(req.method)} ${req.originalUrl} ${res.statusCode}`
        );
      }
    });
  }

  next();
};
