const { User, Cart } = require('../models');

const getAllUserExceptAdmin = async () => {
  try {
    const users = await User.findAll({ where: { admin: 0 } });
    return users;
  } catch (err) {
    throw err;
  }
};

const getUserInfo = async (userID) => {
  try {
    const user = await User.findOne({ where: { id: userID } });
    return user;
  } catch (err) {
    throw err;
  }
};

const createUser = async (
  email,
  password,
  nickname,
  phone,
  sex,
  birthday,
  admin
) => {
  try {
    const exUser = await User.findOne({ where: { email: email } });
    if (exUser) return false;

    const user = await User.create({
      email,
      password,
      nickname,
      phone,
      sex,
      birthday,
      admin,
    });
    await Cart.create({ title: email, userId: user.id });

    return true;
  } catch (err) {
    throw err;
  }
};

const updateUserInfo = async (
  email,
  password,
  nickname,
  phone,
  sex,
  birthday
) => {
  try {
    const user = await User.update(
      { password, nickname, phone, sex, birthday },
      { where: { email: email } }
    );
    return user;
  } catch (err) {
    throw err;
  }
};

const deleteUser = async (userID) => {
  try {
    await User.destroy({ where: { id: userID } });
  } catch (err) {
    throw err;
  }
};

const checkAdminPerm = async (userID) => {
  try {
    const user = await User.findOne({ where: { id: userID } });
    const isAdmin = user.admin;

    return isAdmin;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllUserExceptAdmin,
  getUserInfo,
  createUser,
  updateUserInfo,
  deleteUser,
  checkAdminPerm,
};
