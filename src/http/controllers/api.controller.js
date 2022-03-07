import * as apiService from '@src/services/api.service';
import { HttpException } from '../exceptions/HttpException';
import { HttpStatus } from '../http-status';

export const successController = (req, res) => {
  res.status(200).json({
    data: apiService.success(),
  });
};

export const failController = () => {
  throw new HttpException(HttpStatus.BAD_REQUEST);
};
