import { userRepository } from '@src/database/repositories/user.repository';
import { UserNotFoundException } from '@src/http/exceptions/user-not-found.exception';

export const getAllUsers = async () => {
  return await userRepository.find();
};

export const getUserById = async (/** @type {number} */ userId) => {
  const user = await userRepository.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new UserNotFoundException(userId);
  }

  return user;
};
