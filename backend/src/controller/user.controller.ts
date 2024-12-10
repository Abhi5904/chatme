import {
  DeleteUser,
  GetAllUser,
  GetUserById,
  UpdateUser,
} from '../services/user.services';
import ApiError from '../utils/apiError.utils';
import ApiResponse from '../utils/apiResponse.utils';
import statusCode from '../utils/statusCode.utils';

const getAllUser = async (req, res, next) => {
  try {
    const allUser = await GetAllUser();
    const allSafeUser =
      allUser?.length > 0 ? allUser?.map((user) => user.safe) : [];
    return res
      .status(statusCode.OK)
      .json(
        new ApiResponse(
          'User fetched successfully',
          statusCode.OK,
          allSafeUser,
        ),
      );
  } catch (error) {
    return next(
      new ApiError(
        error?.message || 'Internal server error',
        statusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new ApiError('Not found', statusCode.NOT_FOUND));
    }
    const user = await GetUserById(id);

    if (!user) {
      return next(new ApiError('User not found', statusCode.NOT_FOUND));
    }
    return res
      .status(statusCode.OK)
      .json(
        new ApiResponse('User fetched successfully', statusCode.OK, user.safe),
      );
  } catch (error) {
    return next(
      new ApiError(
        error?.message || 'Internal server error',
        statusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new ApiError('Not found', statusCode.NOT_FOUND));
    }
    const user = await GetUserById(id);

    if (!user) {
      return next(new ApiError('User not found', statusCode.NOT_FOUND));
    }

    await DeleteUser(id);

    return res
      .status(statusCode.OK)
      .json(new ApiResponse('User deleted successfully', statusCode.OK));
  } catch (error) {
    return next(
      new ApiError(
        error?.message || 'Internal server error',
        statusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new ApiError('Not found', statusCode.NOT_FOUND));
    }
    const user = await GetUserById(id);

    if (!user) {
      return next(new ApiError('User not found', statusCode.NOT_FOUND));
    }
    const updatedUser = await UpdateUser(id, req?.body);

    return res
      .status(statusCode.OK)
      .json(
        new ApiResponse(
          'User updated successfully',
          statusCode.OK,
          updatedUser.safe,
        ),
      );
  } catch (error) {
    return next(
      new ApiError(
        error?.message || 'Internal server error',
        statusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export { getAllUser, getUserById, deleteUser, updateUser };
