import { getSocket } from '../socket-io/socket';
import ApiError from '../utils/apiError.utils';
import ApiResponse from '../utils/apiResponse.utils';
import statusCode from '../utils/statusCode.utils';

const testchat = async (req, res, next) => {
  try {
    console.log(req.user, 'user');
    const io = getSocket();
    io.emit('user-detail', req.user);
    return res
      .status(statusCode.OK)
      .json(new ApiResponse('event emitted successfully', 200));
  } catch (error) {
    return next(
      new ApiError(
        error?.message || 'Internal server error',
        statusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export { testchat };
