import { t } from '@src/config/lang.config';
import { HttpStatus } from '../http-status';
import { HttpException } from './http.exception';

export class UserNotFoundException extends HttpException {
  constructor(userId) {
    super(
      HttpStatus.NOT_FOUND,
      t('exception.user-not-found', {
        userId,
      })
    );
  }
}
