const UserService = require('../services/users');

const getPermission = async (req, res, next) => {
  try {
    const { id: userID } = req.decoded;
    const isAdmin = await UserService.checkPermission(userID);
    const role = isAdmin ? 'admin' : 'normal';

    res.status(200).json({ status: 'ok', message: '권한 조회', role });
  } catch (err) {
    next(err);
  }
};

const getRefreshToken = (req, res, next) => {
  //TODO: 리프레시 토큰 검사 후 accessToken 재발급
  next();
};

module.exports = { getPermission, getRefreshToken };
