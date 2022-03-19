import { apiRouter, API_BASE_URI } from '@src/http/routes/api.route';
import { Router } from 'express';

const router = Router();

router.use(API_BASE_URI, apiRouter);

export default router;
