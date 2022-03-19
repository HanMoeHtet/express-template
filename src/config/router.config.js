import {
  successRouter,
  SUCCESS_BASE_URI,
} from '@src/http/routes/success.route';
import { Router } from 'express';

const router = Router();

router.use(SUCCESS_BASE_URI, successRouter);

export default router;
