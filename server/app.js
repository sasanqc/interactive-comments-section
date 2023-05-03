const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const commentRouter = require("./routers/commentRouter.js");
const userRouter = require("./routers/userRouter.js");
const globalErrorHandler = require("./controllers/errorController.js");

dotenv.config({ path: "./config.env" });
const app = express();

const port = process.env.PORT || 3500;
const DB = process.env.DB;
const DB_PASSWORD = process.env.DB_PASSWORD;
console.log(DB.replace("<password>", DB_PASSWORD));
app.listen(port, () => console.log(`app running on port ${port}`));
mongoose
  .connect(DB.replace("<password>", DB_PASSWORD))
  .then(() => console.log("connected to database successfully"))
  .catch((err) => console.log(err.message));

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Set security HTTP headers
app.use(helmet());
app.use(cookieParser());
// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
if (process.env.NODE_ENV === "production") {
  app.use("/api", limiter);
}
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());
app.use(function (req, res, next) {
  // Website you wish to allow to connect

  res.setHeader("Access-Control-Allow-Origin", "*");
  //res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Cross-origin-Opener-Policy", "none");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  //console.log("req.headers.origin: ", res);
  // Pass to next layer of middleware
  next();
});
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/users", userRouter);

app.use(globalErrorHandler);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}
