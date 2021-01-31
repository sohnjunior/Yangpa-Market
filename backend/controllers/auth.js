const passport = require('passport');
const jwt = require('jsonwebtoken');
const UserService = require('../services/users');
const { HTTP401Error, HTTP419Error } = require('../utils/errors');

const getPermission = async (req, res, next) => {
  try {
    const { id: userID } = req.decoded;
    const isAdmin = await UserService.checkPermission(userID);
    const role = isAdmin ? 'admin' : 'normal';

    res.status(200).json({ status: 200, message: '권한 조회', role });
  } catch (err) {
    next(err);
  }
};

const getRefreshToken = (req, res, next) => {
  passport.authenticate(
    'refresh-token',
    { session: false },
    (err, userID, info) => {
      if (userID !== -1) {
        const accessToken = jwt.sign(
          { id: userID },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '1m',
          }
        );

        return res
          .status(200)
          .json({ status: 200, message: '토큰 재발급', accessToken });
      }

      if (info.name === 'TokenExpiredError') {
        return next(new HTTP419Error('토큰이 만료되었습니다'));
      }

      next(new HTTP401Error('유효하지 않은 토큰입니다'));
    }
  )(req, res, next);
};

module.exports = { getPermission, getRefreshToken };
