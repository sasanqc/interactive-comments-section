const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: "./config.env" });
const commentRouter = require("./routes/commentRouter.js");
const errorController = require("./controllers/errorController.js");
const port = process.env.PORT || 3500;
const DB = process.env.DB;
const app = express();
mongoose
  .connect(DB)
  .then(() => console.log("connected to database successfully"));
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/v1/comments", commentRouter);
app.use(errorController);
app.listen(port, () => console.log(`app running on port ${port}`));
