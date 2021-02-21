import { User } from '../models/user';
import { Cart } from '../models/cart';
import { getRepository, getCustomRepository } from 'typeorm';
import { UserRepository } from '../repository/UserRepository';
import { HTTP401Error } from '../utils/errors';

const createUser = async (
  email: string,
  nickname: string,
  password: string,
  contact: string,
  birthday: string,
  avatar: string | undefined
) => {
  try {
    const userRepository = getCustomRepository(UserRepository);
    const cartRepository = getRepository(Cart);
    const isDuplicate = await userRepository.checkDuplicate(email, nickname);

    if (isDuplicate) return false;

    const user = await userRepository.create({
      email,
      password,
      nickname,
      contact,
      birthday,
      avatar,
    });
    const cart = await cartRepository.create({
      owner: user,
    });

    await cartRepository.save(cart);

    return true;
  } catch (err) {
    throw err;
  }
};

const getAllUserExceptAdmin = async () => {
  try {
    const userRepository = getRepository(User);
    const users = await userRepository.findOneOrFail({ isAdmin: false });

    return users;
  } catch (err) {
    throw err;
  }
};

const getUserInfo = async (userId: number) => {
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOneOrFail({ id: userId });

    return user;
  } catch (err) {
    throw err;
  }
};

const updateUserProfile = async (
  userId: number,
  email: string,
  nickname: string,
  contact: string
) => {
  try {
    const userRepository = getCustomRepository(UserRepository);
    const updatedUser = await userRepository.updateAndReload(userId, {
      email,
      nickname,
      contact,
    });

    return updatedUser;
  } catch (err) {
    throw err;
  }
};

const updateUserAvatar = async (userId: number, avatar?: string) => {
  try {
    const userRepository = getCustomRepository(UserRepository);
    const updatedUser = await userRepository.updateAndReload(userId, {
      avatar,
    });

    return updatedUser.avatar;
  } catch (err) {
    throw err;
  }
};

const updateUserPassword = async (
  userId: number,
  oldPassword: string,
  newPassword: string
) => {
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOneOrFail({
      select: ['password'],
      where: { id: userId },
    });

    if (oldPassword !== user.password)
      throw new HTTP401Error('비밀번호가 일치하지 않습니다.');

    await userRepository.update(userId, { password: newPassword });
  } catch (err) {
    throw err;
  }
};

const deleteUser = async (userId: number) => {
  try {
    const userRepository = getRepository(User);
    await userRepository.softDelete(userId);
  } catch (err) {
    throw err;
  }
};

export {
  createUser,
  getAllUserExceptAdmin,
  getUserInfo,
  updateUserProfile,
  updateUserAvatar,
  updateUserPassword,
  deleteUser,
};
