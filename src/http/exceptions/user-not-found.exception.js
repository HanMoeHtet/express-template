import { t } from '@src/config/lang.config';
import { HttpException } from './http.exception';

export class UserNotFoundException extends HttpException {
  constructor(userId) {
    super(
      404,
      t('exception.user-not-found', {
        userId,
      })
    );
  }
}
