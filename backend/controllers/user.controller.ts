import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import * as UserService from '../services/user.service';
import { HTTP400Error, HTTP401Error } from '../utils/errors';

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, nickname, contact, birthday } = req.body;
    const isValid = await UserService.createUser(
      email,
      nickname,
      password,
      contact,
      birthday
    );

    if (!isValid) {
      return next(new HTTP400Error('이미 존재하는 이메일입니다'));
    }

    res.status(201).json({ status: 'ok', message: '회원가입이 성공했습니다' });
  } catch (err) {
    next(err);
  }
}

async function getAllUser(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await UserService.getAllUserExceptAdmin();

    res.status(200).json({
      status: 'ok',
      message: '관리자를 제외한 모든 유저 정보 조회',
      users,
    });
  } catch (err) {
    next(err);
  }
}

async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userID } = req.decoded;
    const user = await UserService.getUserInfo(userID);

    res.status(200).json({ status: 'ok', message: '유저 정보 조회', user });
  } catch (err) {
    next(err);
  }
}

/**
 * @deprecated
 */
async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    // const { email, password, nickname, phone, sex, birthday } = req.body;
    // const user = UserService.updateUserInfo(
    //   email,
    //   password,
    //   nickname,
    //   phone,
    //   sex,
    //   birthday
    // );

    res.status(200).json({
      status: 'ok',
      message: '계정이 성공적으로 생성되었습니다',
    });
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userID } = req.decoded;

    await UserService.deleteUser(userID);

    res
      .status(200)
      .json({ status: 'ok', message: '계정이 성공적으로 삭제되었습니다' });
  } catch (err) {
    next(err);
  }
}

async function signin(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('signin', async (err, data, info) => {
    if (err) return next(err);
    if (info) {
      return next(new HTTP401Error('이메일 혹은 비밀번호를 확인해주세요'));
    }

    res
      .status(200)
      .json({ status: 'ok', message: '로그인 되었습니다', ...data });
  })(req, res, next);
}

export { getAllUser, getUser, createUser, updateUser, deleteUser, signin };
