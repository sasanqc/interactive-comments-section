const Comment = require("../models/commentModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllComments = catchAsync(async (req, res, next) => {
  const docs = await Comment.find({ replyingTo: { $exists: false } });
  res.status(200).json({
    status: "success",
    results: docs.length,
    data: {
      comments: docs,
    },
  });
});
// { replyingTo: { $exists: false } }
exports.getComment = catchAsync(async (req, res, next) => {
  let query = Model.findById(req.params.id);

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
  if (req.body.replyingTo) {
    const parent = await Comment.findById(req.body.replyingTo);
    parent.replies.push(doc._id);
    await parent.save();
  }
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
  });

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
