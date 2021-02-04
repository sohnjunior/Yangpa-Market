const express = require('express');

const authRouter = require('./auth');
const usersRouter = require('./user/users');
const ProductRouter = require('./board/product');
const RecommandRouter = require('./board/recommend');
const CartRouter = require('./dashboard/cart');
const OrderRouter = require('./dashboard/order');
const CommentRouter = require('./board/comment');

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/products', ProductRouter);
apiRouter.use('/recommendation', RecommandRouter);
apiRouter.use('/carts', CartRouter);
apiRouter.use('/orders', OrderRouter);
apiRouter.use('/comments', CommentRouter);

module.exports = apiRouter;
