const express = require("express");
const commentController = require("../controllers/commentController.js");
const router = express.Router();
const authController = require("../controllers/authController.js");
router
  .route("/")
  .get(authController.protect, commentController.getAllComments)
  .post(commentController.createComment);
router
  .route("/:id")
  .get(commentController.getComment)
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment);
module.exports = router;
