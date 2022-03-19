import {
  successRouter,
  SUCCESS_BASE_URI,
} from '@src/http/routes/success.route';
import { userRouter, USER_BASE_URI } from '@src/http/routes/user.route';
import { Router } from 'express';

const router = Router();

router.use(SUCCESS_BASE_URI, successRouter);

router.use(USER_BASE_URI, userRouter);

export default router;
