const mongoose = require("mongoose");
const { Schema } = mongoose;
const timeUtils = require("../utils/timeUtils.js");
const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "A comment must have a content"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "comment must have a user"],
    },
    score: { type: Number, default: 0 },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (el) {
        return timeUtils.timeSince(el);
      },
    },
    replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    replyingTo: { type: Schema.Types.ObjectId, ref: "Comment" },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      getters: true,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  }
);

commentSchema.pre(/^find/, function () {
  this.populate({ path: "user", select: "-__v -_id -email" }).populate({
    path: "replies",
    populate: {
      path: "user",
      model: "User",
      select: "-__v -_id -email",
    },
  });
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
