import express from 'express';
import todoRouter from './todo/todo.routes';
import userRouter from './user/user.routes';
import authRouter from './auth/auth.router';

const router = express.Router();

router.use('/todos', todoRouter);
router.use('/users', userRouter);
router.use(authRouter);

export default router;