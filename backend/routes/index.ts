import express = require('express');

import authRouter from './auth';
import usersRouter from './user/users';
import ProductRouter from './board/product';
import RecommandRouter from './board/recommend';
import CommentRouter from './board/comment';
import CartRouter from './dashboard/cart';
import OrderRouter from './dashboard/order';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/products', ProductRouter);
apiRouter.use('/recommendation', RecommandRouter);
apiRouter.use('/comments', CommentRouter);
apiRouter.use('/carts', CartRouter);
apiRouter.use('/orders', OrderRouter);

export default apiRouter;
