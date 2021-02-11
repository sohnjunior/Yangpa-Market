import express from 'express';
import * as UserController from '../../controllers/users';
import { verifyToken } from '../../middlewares';
import { checkBodyNull } from '../../middlewares/validator';

const router = express.Router();

router.get('/', UserController.getAllUser);
router.get('/self', verifyToken, UserController.getUser);
router.post('/signin', checkBodyNull, UserController.signin);
router.post('/', checkBodyNull, UserController.createUser);
// router.put('/self', verifyToken, checkBodyNull, UserController.updateUser);
router.delete('/self', verifyToken, UserController.deleteUser);

export default router;
