import { GetConversationByUser } from '../services/conversation.services';
import ApiError from '../utils/apiError.utils';
import ApiResponse from '../utils/apiResponse.utils';
import statusCode from '../utils/statusCode.utils';

const getConversationByUserId = async (req, res, next) => {
  try {
    const id = req?.params?.id || req?.user?._id?.toString();
    console.log(id, 'backend id');
    const conversations = await GetConversationByUser(id);
    console.log(conversations, 'conversations');
    return res
      .status(statusCode.OK)
      .json(
        new ApiResponse(
          'All conversation fetched successfully!!',
          statusCode.OK,
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

const getConversationByUser = async (req, res, next) => {
  try {
    const id = req?.user?._id?.toString();
    const conversations = await GetConversationByUser(id);
    console.log(conversations, 'conversations');
    return res
      .status(statusCode.OK)
      .json(
        new ApiResponse(
          'All conversation fetched successfully!!',
          statusCode.OK,
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

export { getConversationByUserId, getConversationByUser };
