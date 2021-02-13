import { getRepository } from 'typeorm';
import { User } from '../models/user';

const checkPermission = async (userId: number) => {
  try {
    const userRepository = getRepository(User);

    const user = await userRepository.findOneOrFail({ id: userId });
    const isAdmin = user.isAdmin;

    return isAdmin;
  } catch (err) {
    throw err;
  }
};

export { checkPermission };
