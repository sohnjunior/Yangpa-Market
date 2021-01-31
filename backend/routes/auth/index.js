const express = require('express');
const { verifyToken } = require('../../middlewares');
const AuthController = require('../../controllers/auth');

const router = express.Router();

router.get('/permission', verifyToken, AuthController.getPermission);
router.post('/refresh-token', AuthController.getRefreshToken);

module.exports = router;
