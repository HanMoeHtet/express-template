import multer from 'multer';
import { STORAGE_PATH } from './paths.config';
import path from 'path';
import { HttpException } from '@src/http/exceptions/http.exception';
import { HttpStatus } from '@src/http/http-status';

export const userAvatarUpload = multer({
  storage: multer.diskStorage({
    destination: path.join(STORAGE_PATH, 'public/avatars'),
  }),

  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new HttpException(HttpStatus.UNPROCESSABLE_ENTITY));
      return;
    }

    cb(null, true);
  },

  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
  },
});
