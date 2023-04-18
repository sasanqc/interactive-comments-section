const Comment = require("../models/commentModel.js");
const catchAsync = require("../utils/catchAsync.js");
const ApiFeatures = require("../utils/apiFeature.js");
exports.getAllComments = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Comment.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const comments = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: comments.length,
    data: {
      comments,
    },
  });
});
exports.getComment = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "getComment not implemented yet",
  });
};
exports.createComment = catchAsync(async (req, res, next) => {
  const newComment = await Comment.create(req.body);
  res.status(200).json({
    status: "success",
    data: { comment: newComment },
  });
});
exports.updateComment = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "updateComment not implemented yet",
  });
};
exports.deleteComment = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "deleteComment not implemented yet",
  });
};
