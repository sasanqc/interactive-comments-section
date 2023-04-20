const express = require("express");
const commentController = require("../controllers/commentController.js");
const router = express.Router();
router
  .route("/")
  .get(commentController.getAllComments)
  .post(commentController.createComment);
router
  .route("/:id")
  .get(commentController.getComment)
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment);
module.exports = router;
