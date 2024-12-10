import express from 'express';
import {
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from '../controller/user.controller';
import validateObjectId from '../middleware/idValidator.middleware';
import { validateUpdateUser } from '../validate/user.validate';

const userRouter = express.Router();

userRouter.route('/').get(getAllUser);
userRouter.use('/:id', validateObjectId);
userRouter
  .route('/:id')
  .get(getUserById)
  .delete(deleteUser)
  .put(validateUpdateUser, updateUser);

export default userRouter;
