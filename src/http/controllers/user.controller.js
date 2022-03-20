import * as userService from '@src/services/user.service';
import { asyncHandler } from '../async-handler';
import { HttpStatus } from '../http-status';

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();

  res.status(HttpStatus.OK).json({
    data: {
      users,
    },
  });
});

export const getUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const user = await userService.getUserById(userId);

  res.status(HttpStatus.OK).json({
    data: {
      user,
    },
  });
});

export const createUser = asyncHandler(async (req, res) => {
  const createUserDto = req.body;
  const userId = await userService.createUser(createUserDto);

  res.status(HttpStatus.CREATED).json({
    data: {
      userId,
    },
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const updateUserDto = {
    ...req.body,
    id: req.params.userId,
  };
  await userService.updateUser(updateUserDto);

  res.status(HttpStatus.OK).end();
});

export const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  await userService.deleteUser(userId);

  res.status(HttpStatus.OK).end();
});
