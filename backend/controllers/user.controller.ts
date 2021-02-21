import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import * as UserService from '../services/user.service';
import * as PhotoService from '../services/photo.service';
import { HTTP400Error, HTTP401Error } from '../utils/errors';

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, nickname, contact, birthday } = req.body;
    const avatar = req.file
      ? PhotoService.createAvatarImagePath(req.file.filename)
      : undefined;

    const isValid = await UserService.createUser(
      email,
      nickname,
      password,
      contact,
      birthday,
      avatar
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
    const { id: userId } = req.decoded;
    const user = await UserService.getUserInfo(userId);

    res.status(200).json({ status: 'ok', message: '유저 정보 조회', user });
  } catch (err) {
    next(err);
  }
}

async function updateUserProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: userId } = req.decoded;
    const { email, nickname, contact } = req.body;

    const updatedInfo = await UserService.updateUserProfile(
      userId,
      email,
      nickname,
      contact
    );

    res.status(200).json({
      status: 'ok',
      message: '프로필 정보가 변경되었습니다.',
      updatedInfo,
    });
  } catch (err) {
    next(err);
  }
}

async function updateUserAvatar(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: userId } = req.decoded;
    const avatar = req.file
      ? PhotoService.createAvatarImagePath(req.file.filename)
      : undefined;

    const updatedAvatar = await UserService.updateUserAvatar(userId, avatar);

    res.status(200).json({
      status: 'ok',
      message: '프로필 사진이 변경되었습니다.',
      updatedAvatar,
    });
  } catch (err) {
    next(err);
  }
}

async function updateUserPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: userId } = req.decoded;
    const { oldPassword, newPassword } = req.body;

    await UserService.updateUserPassword(userId, oldPassword, newPassword);

    res.status(200).json({
      status: 'ok',
      message: '비밀번호가 변경되었습니다.',
    });
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userId } = req.decoded;

    await UserService.deleteUser(userId);

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

export {
  getAllUser,
  getUser,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  updateUserPassword,
  deleteUser,
  signin,
};
