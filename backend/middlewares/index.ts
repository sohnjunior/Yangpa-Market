import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import passport from 'passport';
import { HTTP401Error, HTTP419Error } from '../utils/errors';

function uploadImage(dirname: string) {
  return multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, `public/images/${dirname}/`);
      },

      filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        const base = path.basename(file.originalname, ext);
        const currentDate = Date.now();
        const filename = base + '-' + currentDate + ext;

        cb(null, filename);
      },
    }),
  });
}

// 토큰오류 확인방법 : https://github.com/mikenicholson/passport-jwt/issues/75
function verifyToken(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    'access-token',
    { session: false },
    (err, user, info) => {
      if (user) {
        req.decoded = user;
        return next();
      }

      if (info.name === 'TokenExpiredError') {
        return next(new HTTP419Error('토큰이 만료되었습니다'));
      }

      next(new HTTP401Error('유효하지 않은 토큰입니다'));
    }
  )(req, res, next);
}

export { uploadImage, verifyToken };
