const express = require("express");
const app = express();
console.log(process.env);
const port = 3500;
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({ message: "Hello from express", app: "express" });
});
app.post("/", (req, res) => {
  res.send("you can post to this endpoint");
});
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
