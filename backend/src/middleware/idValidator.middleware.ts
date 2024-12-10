import mongoose from 'mongoose';
import ApiError from '../utils/apiError.utils';
import statusCode from '../utils/statusCode.utils';

const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError('Invalid object id', statusCode.NOT_FOUND));
  }
  next();
};
export default validateObjectId;
