import { STATUS_CODES } from 'http';

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
}
