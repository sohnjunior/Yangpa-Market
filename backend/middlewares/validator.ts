import { Request, Response, NextFunction } from 'express';
import { HTTP400Error } from '../utils/errors';

function checkBodyNull(req: Request, res: Response, next: NextFunction) {
  let valid = true;

  for (const field in req.body) {
    if (!req.body[field]) {
      valid = false;
      break;
    }
  }

  if (!valid) next(new HTTP400Error('요청 인자가 부족합니다'));
  next();
}

export { checkBodyNull };
