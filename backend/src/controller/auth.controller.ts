import {
  CreateUser,
  GetUserByEmail,
  GetUserById,
  UpdateUser,
} from '../services/user.services';
import ApiError from '../utils/apiError.utils';
import ApiResponse from '../utils/apiResponse.utils';
import { hashPassword, verifyPassword } from '../utils/password.utils';
import statusCode from '../utils/statusCode.utils';
import { generateToken, verifyRefreshToken } from '../utils/token.utils';

const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, profilePicture } = req.body;

    const isNotUniqueUser = await GetUserByEmail(email);
    console.log(isNotUniqueUser);

    if (isNotUniqueUser) {
      return next(new ApiError('User already exists', statusCode.CONFLICT));
    }

    const { hashedPassword, salt } = hashPassword(password);

    const data = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profilePicture,
      saltPassword: salt,
    };
    const user = await CreateUser(data);

    const { refreshToken, accessToken } = await generateToken({
      firstName,
      email,
      id: user?._id as string,
    });
    await UpdateUser(user?._id as string, { refreshToken: refreshToken });
    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript
        secure: false, // Ensures the cookie is sent only over HTTPS
        sameSite: 'Lax', // Mitigates CSRF attacks
        path: '/',
      })
      .set('Authorization', accessToken);
    return res
      .status(statusCode.CREATED)
      .json(
        new ApiResponse(
          'User created successfully!!',
          statusCode.OK,
          user.safe,
        ),
      );
  } catch (error) {
    console.log(error.message);
    return next(
      new ApiError(
        error.message || 'Internal server error',
        statusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

const loginWithEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await GetUserByEmail(email);
    if (!user) {
      return next(new ApiError('Invalid credentials', statusCode.UNAUTHORIZED));
    }
    const isValidPassword = verifyPassword(
      password,
      user?.saltPassword,
      user?.password,
    );
    if (!isValidPassword) {
      return next(new ApiError('Invalid credentials', statusCode.UNAUTHORIZED));
    }
    const isValidRefreshToken = await verifyRefreshToken(user?.refreshToken);
    if (!isValidRefreshToken) {
      return next(
        new ApiError('Invalid token signature', statusCode.UNAUTHORIZED),
      );
    }
    const { accessToken } = await generateToken({
      email: user?.email,
      firstName: user?.firstName,
      id: user?._id as string,
    });
    res.cookie('refreshToken', user?.refreshToken, {
      httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript
      secure: false, // Ensures the cookie is sent only over HTTPS
      sameSite: 'Lax', // Mitigates CSRF attacks
      path: '/',
    });
    res.set('Authorization', accessToken);
    return res
      .status(statusCode.OK)
      .json(new ApiResponse('Login successfully', statusCode.OK, user.safe));
  } catch (error) {
    return next(
      new ApiError(
        error.message || 'Internal server error',
        statusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

const logout = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new ApiError('Unauthorized', statusCode.UNAUTHORIZED));
    }
    const user = await GetUserById(req?.user?._id);
    if (!user) {
      return next(new ApiError('Unauthorized', statusCode.UNAUTHORIZED));
    }
    return res
      .status(statusCode.OK)
      .json(new ApiResponse('Logout successfully', statusCode.OK));
  } catch (error) {
    return next(
      new ApiError(
        error.message || 'Internal server error',
        statusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export { createUser, loginWithEmail, logout };
