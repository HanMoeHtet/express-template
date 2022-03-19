import { Router } from 'express';
import * as UserController from '@src/http/controllers/user.controller';

export const USER_BASE_URI = '/api/v1/users';

export const userRouter = Router();

userRouter.get('/', UserController.getAllUsers);

userRouter.get('/:userId', UserController.getUser);
