import { apiRouter, API_BASE_URI } from '@src/routes/api.routes';
import { Router } from 'express';

const router = Router();

router.use(API_BASE_URI, apiRouter);

export default router;
