import * as userService from '@src/services/user.service';
import { asyncHandler } from '../async-handler';

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();

  res.status(200).json({
    data: {
      users,
    },
  });
});

export const getUser = asyncHandler(async (req, res) => {
  const userId = Number(req.params.userId);
  const user = await userService.getUserById(userId);

  res.status(200).json({
    data: {
      user,
    },
  });
});
