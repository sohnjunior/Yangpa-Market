import express = require('express');

import authRouter from './auth';
import userRouter from './user/users';
import ProductRouter from './board/product';
import RecommendationRouter from './board/recommendation';
import CommentRouter from './board/comment';
import CartRouter from './dashboard/cart';
import OrderRouter from './dashboard/order';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/products', ProductRouter);
apiRouter.use('/recommendation', RecommendationRouter);
apiRouter.use('/comments', CommentRouter);
apiRouter.use('/carts', CartRouter);
apiRouter.use('/orders', OrderRouter);

export default apiRouter;
