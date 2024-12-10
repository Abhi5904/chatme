import express from 'express';
import {
  createUser,
  loginWithEmail,
  logout,
} from '../controller/auth.controller';
import {
  validateCreateUser,
  validateLoginWithEmailUser,
} from '../validate/user.validate';
import verifyUserToken from '../middleware/auth.middleware';

const authRouter = express.Router();
authRouter.get('/logout', verifyUserToken, logout);
authRouter.post('/signup', validateCreateUser, createUser);
authRouter
  .route('/login/email')
  .post(validateLoginWithEmailUser, loginWithEmail);

export default authRouter;
