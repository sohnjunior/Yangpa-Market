import express from 'express';
import * as UserController from '../../controllers/user.controller';
import { uploadImage, verifyToken } from '../middlewares';
import { checkBodyNull } from '../middlewares/validator';

const router = express.Router();

router.get('/', UserController.getAllUser);
router.get('/self', verifyToken, UserController.getUser);
router.post('/signin', checkBodyNull, UserController.signin);
router.post(
  '/',
  uploadImage('profile').single('avatar'),
  UserController.createUser
);
router.put(
  '/self/profile',
  verifyToken,
  checkBodyNull,
  UserController.updateUserProfile
);
router.put(
  '/self/password',
  verifyToken,
  checkBodyNull,
  UserController.updateUserPassword
);
router.delete('/self', verifyToken, UserController.deleteUser);

export default router;
