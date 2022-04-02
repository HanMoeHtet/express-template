import { userAvatarUpload } from '@src/config/storage.config';
import { MulterError } from 'multer';
import { HttpException } from '../exceptions/http.exception';
import { HttpStatus } from '../http-status';

export function uploadUserAvatar(req, res, next) {
  userAvatarUpload.single('avatar')(req, res, (err) => {
    if (err instanceof MulterError) {
      next(new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, err.message));
    }

    next(err);
  });
}
