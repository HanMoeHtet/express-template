import { removeAnsiEscapeCodes } from '@src/utils/index.js';
import chalk from 'chalk';
import moment from 'moment';
import path from 'path';
import { createStream, RotatingFileStream } from 'rotating-file-stream';
import { storagePath } from './paths.config';

export const LOG_LEVELS = {
  CRITICAL: 'CRITICAL',
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
};

class AbstractLogger {
  prependDateTime(message) {}

  critical(message) {}

  error(message) {}

  warn(message) {}

  info(message) {}

  debug(message) {}
}

export class FileLogger extends AbstractLogger {
  /**
   * @param {RotatingFileStream} logFileStream
   */
  constructor(logFileStream) {
    super();
    this.logFileStream = logFileStream;
  }

  /**
   * @param {string} message
   * @returns {string} message with datetime prepended
   */
  prependDateTime(message) {
    return `[${new Date().toISOString()}] ${message}`;
  }

  /**
   * @param {string} message
   */
  write(message) {
    message = removeAnsiEscapeCodes(message);
    this.logFileStream.write(`${this.prependDateTime(message)}\n`);
  }

  /**
   * @param {string} message
   */
  critical(message) {
    this.write(`[${LOG_LEVELS.CRITICAL}] ${message}`);
  }

  /**
   * @param {string} message
   */
  error(message) {
    this.write(`[${LOG_LEVELS.ERROR}] ${message}`);
  }

  /**
   * @param {string} message
   */
  warn(message) {
    this.write(`[${LOG_LEVELS.WARN}] ${message}`);
  }

  /**
   * @param {string} message
   */
  info(message) {
    this.write(`[${LOG_LEVELS.INFO}] ${message}`);
  }

  /**
   * @param {string} message
   */
  debug(message) {
    this.write(`[${LOG_LEVELS.DEBUG}] ${message}`);
  }
}

export class ConsoleLogger extends AbstractLogger {
  /**
   * @param {string} message
   * @returns {string} message with datetime prepended
   */
  prependDateTime(message) {
    return `[${chalk.green(new Date().toISOString())}] ${message}`;
  }

  /**
   * @param {string} message
   */
  critical(message) {
    console.error(
      this.prependDateTime(
        `[${chalk.redBright(LOG_LEVELS.CRITICAL)}] ${message}`
      )
    );
  }

  /**
   * @param {string} message
   */
  error(message) {
    console.error(
      this.prependDateTime(`[${chalk.red(LOG_LEVELS.ERROR)}] ${message}`)
    );
  }

  /**
   * @param {string} message
   */
  warn(message) {
    console.warn(
      this.prependDateTime(`[${chalk.yellow(LOG_LEVELS.WARN)}] ${message}`)
    );
  }

  /**
   * @param {string} message
   */
  info(message) {
    console.info(
      this.prependDateTime(`[${chalk.blue(LOG_LEVELS.INFO)}] ${message}`)
    );
  }

  /**
   * @param {string} message
   */
  debug(message) {
    console.debug(
      this.prependDateTime(`[${chalk.green(LOG_LEVELS.DEBUG)}] ${message}`)
    );
  }
}

export const consoleLogger = new ConsoleLogger();

export const fileLogger = new FileLogger(
  createStream(
    (time, index) => {
      if (typeof time === 'number' || time == null) {
        time = new Date();
      }

      return `${moment(time).format('YYYY-MM-DD')}${
        index != null ? `-(${index})` : ''
      }.log`;
    },
    {
      size: '10M',
      interval: '1d',
      path: path.resolve(storagePath, 'logs'),
    }
  )
);
