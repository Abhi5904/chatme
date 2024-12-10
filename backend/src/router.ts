import express from 'express';
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';
import verifyUserToken from './middleware/auth.middleware';
import chatRouter from './routes/chat.routes';
const router = express.Router();

router.use('/user', verifyUserToken, userRouter);
router.use('/auth', authRouter);
router.use('/chat', verifyUserToken, chatRouter);

export default router;
