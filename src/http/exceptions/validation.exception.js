import { STATUS_CODES } from 'http';
import { HttpStatus } from '../http-status';
import { HttpException } from './http.exception';

export class ValidationException extends HttpException {
  constructor(errors, message) {
    super(
      HttpStatus.UNPROCESSABLE_ENTITY,
      message || STATUS_CODES[HttpStatus.UNPROCESSABLE_ENTITY]
    );
    this.errors = errors;
  }

  getResponse() {
    return {
      ...super.getResponse(),
      errors: this.errors,
    };
  }
}
