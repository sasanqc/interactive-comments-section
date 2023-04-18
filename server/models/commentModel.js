const mongoose = require("mongoose");
const { Schema } = mongoose;
const commentSchema = new Schema({
  content: { type: String, maxlength: 200 },
  user: { type: String, required: [true, "A comment must have a user"] },
  createdAt: { type: Date, default: Date.now },
  score: { type: Number, default: 0, max: 10 },
  tags: [String],
});

const Commment = mongoose.model("Comment", commentSchema);
module.exports = Commment;
