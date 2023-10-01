const express = require("express");
const app = express();
const ExapressError = require("./error.js");
const asyncWrap = require("./error.js");

//* Middleware
const CheckToken = (req, res, next) => {
  let { token } = req.query;
  if (token === "giveacces") {
    next();
  }
  next(new ExapressError(400, "You are not allowed!"));
};

//* Routes
app.get("/", (req, res, next) => {
  inire = kjfmvjm;
  //res.status(200).json({message:"meshnifv"})
});

app.get("/api", CheckToken, (req, res, next) => {
  res.status(200).json({ message: "welcome in api" });
});

//? async Wrap 
app.get("/api/:id", asyncWrap(async (req, res, next) => {
    const { id } = req.params;
    const data = await User.findOne(id);
  })
);

//* Error handler middleware
app.use((err, req, res, next) => {
  // console.log(err)
  statusCode = err.status || 500;
  errorMsg = err.message || "Internal Sever Error";
  res.status(statusCode).json({ success: false, message: errorMsg });
});

app.listen(6060, () => {
  console.log("http://localhost:6060");
});
