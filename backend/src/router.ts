import express from 'express';
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';
import verifyUserToken from './middleware/auth.middleware';
import chatRouter from './routes/chat.routes';
import conversationRouter from './routes/conversation.routes';
const router = express.Router();

router.use('/user', verifyUserToken, userRouter);
router.use('/auth', authRouter);
router.use('/chat', verifyUserToken, chatRouter);
router.use('/conversation', verifyUserToken, conversationRouter);

export default router;
