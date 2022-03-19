import * as successService from '@src/services/success.service';
import { HttpException } from '../exceptions/http.exception';
import { HttpStatus } from '../http-status';

export const success = (req, res) => {
  res.status(200).json({
    data: successService.success(),
  });
};

export const fail = () => {
  throw new HttpException(HttpStatus.BAD_REQUEST);
};
