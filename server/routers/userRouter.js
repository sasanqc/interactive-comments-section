const express = require("express");

const authController = require("../controllers/authController.js");
const userController = require("../controllers/userController.js");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/refresh", authController.protect, authController.refresh);
router.use(authController.protect);
router.patch(
  "/updateMe",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
module.exports = router;
