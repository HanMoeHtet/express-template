import { UserNotFoundException } from '@src/http/exceptions/user-not-found.exception';
import { userRepository } from '@src/models/user/user.repository';
import { getStoragePathFromRelativePublicPath } from '@src/utils/paths.util';
import fs from 'fs';

export const getAllUsers = async () => {
  return await userRepository.find({
    cache: true,
  });
};

export const getUserById = async (/** @type {string} */ userId) => {
  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
    cache: true,
  });

  if (!user) {
    throw new UserNotFoundException(userId);
  }

  return user;
};

export const createUser = async (
  /** @type {import('@src/models/user/user.dto').CreateUserDto} */ createUserDto
) => {
  const user = await userRepository.save(createUserDto);

  return user.id;
};

export const updateUserAvatar = async (
  /** @type {import('@src/models/user/user.dto').UpdateUserAvatarDto} */ updateUserAvatarDto
) => {
  const user = await getUserById(updateUserAvatarDto.id);

  if (user.avatarPath) {
    const avatarPath = getStoragePathFromRelativePublicPath(user.avatarPath);

    try {
      fs.unlinkSync(avatarPath);
    } catch (e) {
      //
    }
  }

  await userRepository.update(updateUserAvatarDto.id, {
    avatarPath: updateUserAvatarDto.avatarPath,
  });
};

export const updateUser = async (
  /** @type {import('@src/models/user/user.dto').UpdateUserDto} */ updateUserDto
) => {
  await getUserById(updateUserDto.id);
  await userRepository.save(updateUserDto);
};

export const deleteUser = async (/** @type {string} */ userId) => {
  await getUserById(userId);
  await userRepository.delete(userId);
};
