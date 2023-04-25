const Comment = require("../models/commentModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllComments = catchAsync(async (req, res, next) => {
  const docs = await Comment.find({ replyingTo: { $exists: false } })
    .populate({ path: "user", select: "-__v -_id -email" })
    .populate({
      path: "replies",
      populate: {
        path: "user",
        model: "User",
        select: "-__v -_id -email",
      },
    })
    .select("-__v");
  res.status(200).json({
    status: "success",
    results: docs.length,
    data: {
      comments: docs,
    },
  });
});

exports.getComment = catchAsync(async (req, res, next) => {
  let query = Model.findById(req.params.id)
    .populate({ path: "user", select: "-__v -_id -email" })
    .populate({
      path: "replies",
      populate: {
        path: "user",
        model: "User",
        select: "-__v -_id -email",
      },
    })
    .select("-__v");
  if (popOptions) query = query.populate(popOptions);
  const doc = await query;

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.createComment = catchAsync(async (req, res, next) => {
  const doc = await Comment.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});
exports.updateComment = catchAsync(async (req, res, next) => {
  const doc = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate({ path: "user", select: "-__v -_id -email" })
    .populate({
      path: "replies",
      populate: {
        path: "user",
        model: "User",
        select: "-__v -_id -email",
      },
    })
    .select("-__v");

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});
exports.deleteComment = catchAsync(async (req, res, next) => {
  const doc = await Comment.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
