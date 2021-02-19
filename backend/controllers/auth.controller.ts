import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import * as AuthService from '../services/auth.service';
import { HTTP401Error, HTTP418Error } from '../utils/errors';

async function getPermission(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userId } = req.decoded;
    const isAdmin = await AuthService.checkPermission(userId);
    const role = isAdmin ? 'admin' : 'normal';

    res.status(200).json({ status: 200, message: '권한 조회', role });
  } catch (err) {
    next(err);
  }
}

function getRefreshToken(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    'refresh-token',
    { session: false },
    (err, userID, info) => {
      if (err) return next(err);

      if (userID) {
        const accessToken = jwt.sign(
          { id: userID },
          process.env.ACCESS_TOKEN_SECRET as string,
          {
            expiresIn: '10m',
          }
        );

        return res
          .status(200)
          .json({ status: 200, message: '토큰 재발급', accessToken });
      }

      if (info.name === 'TokenExpiredError') {
        return next(new HTTP418Error('refresh 토큰이 만료되었습니다'));
      }

      next(new HTTP401Error('유효하지 않은 토큰입니다'));
    }
  )(req, res, next);
}

export { getPermission, getRefreshToken };
