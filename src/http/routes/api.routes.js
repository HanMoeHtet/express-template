import * as ApiController from '@src/http/controllers/api.controller';
import { Router } from 'express';

const apiRouter = Router();

export const API_BASE_URI = '/api/v1/';

apiRouter.get('/success', ApiController.successController);

apiRouter.get('/fail', ApiController.failController);

export { apiRouter };
