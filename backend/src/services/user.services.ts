import User from '../models/user.models';
import { ICreateUserPayload } from '../types/user.types';
import { verifyToken } from '../utils/token.utils';

const GetAllUser = async () => {
  return await User.find({});
};

const GetUserById = async (id: string) => {
  return await User.findById(id);
};

const GetUserByAuthtoken = async (token: string) => {
  const user = await verifyToken(token);
  return await User.findById(user?.id);
};

const CreateUser = async (data: ICreateUserPayload) => {
  return await User.create(data);
};

const UpdateUser = async (id: string, data) => {
  const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
  return updatedUser;
};

const GetUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

const DeleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};

export {
  GetAllUser,
  GetUserById,
  CreateUser,
  GetUserByEmail,
  GetUserByAuthtoken,
  UpdateUser,
  DeleteUser,
};
