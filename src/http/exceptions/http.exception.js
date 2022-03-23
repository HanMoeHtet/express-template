import { ENV } from '@src/config/env.config';
import { HttpExecutionContext } from '@src/config/execution-context.config';
import { STATUS_CODES } from 'http';
import { HttpStatus } from '../http-status';

export class HttpException extends Error {
  /**
   * @param {number} status
   * @param {string} [message]
   */
  constructor(status, message) {
    if (message === undefined) {
      message = STATUS_CODES[status];
    }

    super(message);
    this.status = status;
  }

  handle() {
    const ctx = this.getExecutionContext();

    ctx.res.status(this.status).json(this.getResponse());
  }

  getExecutionContext() {
    const ctx = HttpExecutionContext.getCurrent();

    if (!ctx) {
      throw new Error(STATUS_CODES[HttpStatus.INTERNAL_SERVER_ERROR]);
    }

    return ctx;
  }

  getResponse() {
    return {
      message: this.message,
      stack: ENV === 'production' ? undefined : this.stack,
    };
  }
}
