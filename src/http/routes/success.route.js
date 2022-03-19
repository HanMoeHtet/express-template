import * as SuccessController from '@src/http/controllers/success.controller';
import { Router } from 'express';

const successRouter = Router();

export const SUCCESS_BASE_URI = '/api/v1/';

successRouter.get('/success', SuccessController.success);

successRouter.get('/fail', SuccessController.fail);

export { successRouter };
