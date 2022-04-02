import { UpdateUserAvatarDto } from '@src/models/user/user.dto';
import * as userService from '@src/services/user.service';
import { getRelativePublicPathFromStoragePath } from '@src/utils/paths.util';
import { asyncHandler } from '../async-handler';
import { HttpStatus } from '../http-status';

export const getAllUsers = asyncHandler(async function getAllUsers(req, res) {
  const users = await userService.getAllUsers();

  res.status(HttpStatus.OK).json({
    data: {
      users,
    },
  });
});

export const getUser = asyncHandler(async function getUser(req, res) {
  const userId = req.params.userId;
  const user = await userService.getUserById(userId);

  res.status(HttpStatus.OK).json({
    data: {
      user,
    },
  });
});

export const createUser = asyncHandler(async function createUser(req, res) {
  const createUserDto = req.body;
  const userId = await userService.createUser(createUserDto);

  res.status(HttpStatus.CREATED).json({
    data: {
      userId,
    },
  });
});

export const updateUserAvatar = asyncHandler(async function updateUserAvatar(
  req,
  res
) {
  const userAvatarPhoto = req.file;

  const userId = req.params.userId;

  const avatarPath = userAvatarPhoto
    ? getRelativePublicPathFromStoragePath(userAvatarPhoto.path)
    : undefined;

  await userService.updateUserAvatar(
    new UpdateUserAvatarDto({
      id: userId,
      avatarPath,
    })
  );

  res.status(HttpStatus.OK).json({
    data: {
      avatarPath,
    },
  });
});

export const updateUser = asyncHandler(async function updateUser(req, res) {
  const updateUserDto = {
    ...req.body,
    id: req.params.userId,
  };
  await userService.updateUser(updateUserDto);

  res.status(HttpStatus.OK).end();
});

export const deleteUser = asyncHandler(async function deleteUser(req, res) {
  const userId = req.params.userId;
  await userService.deleteUser(userId);

  res.status(HttpStatus.OK).end();
});
