import express from 'express';
import { verifyToken } from '../../middlewares';
import * as AuthController from '../../controllers/auth';

const router = express.Router();

router.get('/permission', verifyToken, AuthController.getPermission);
router.post('/refresh-token', AuthController.getRefreshToken);

export default router;
