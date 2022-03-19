import * as SuccessController from '@src/http/controllers/success.controller';
import { Router } from 'express';

export const SUCCESS_BASE_URI = '/api/v1/';

export const successRouter = Router();

successRouter.get('/success', SuccessController.success);

successRouter.get('/fail', SuccessController.fail);
