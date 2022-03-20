import * as UserController from '@src/http/controllers/user.controller';
import { validateRequest } from '@src/http/middlewares/validate-request.middleware';
import {
  createUserRequestSchema,
  deleteUserRequestSchema,
  getUserRequestSchema,
  updateUserRequestSchema,
} from '@src/http/requests/user.request';
import { Router } from 'express';

export const USER_BASE_URI = '/api/v1/users';

export const userRouter = Router();

userRouter.get('/', UserController.getAllUsers);

userRouter.get(
  '/:userId',
  validateRequest(getUserRequestSchema),
  UserController.getUser
);

userRouter.post(
  '/',
  validateRequest(createUserRequestSchema),
  UserController.createUser
);

userRouter.put(
  '/:userId(\\d+)',
  validateRequest(updateUserRequestSchema),
  UserController.updateUser
);

userRouter.delete(
  '/:userId(\\d+)',
  validateRequest(deleteUserRequestSchema),
  UserController.deleteUser
);
