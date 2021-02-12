import { User } from '../models/user';
import { Cart } from '../models/cart';
import { getRepository, getCustomRepository } from 'typeorm';
import { UserRepository } from '../repository/UserRepository';

const createUser = async (
  email: string,
  nickname: string,
  password: string,
  contact: string,
  birthday: string
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

const deleteUser = async (userId: number) => {
  try {
    const userRepository = getRepository(User);
    await userRepository.softDelete(userId);
  } catch (err) {
    throw err;
  }
};

export { getAllUserExceptAdmin, getUserInfo, createUser, deleteUser };
