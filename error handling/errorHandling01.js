//* Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

//!-------------------------------

app.get("/", async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return next(createError(404, "Data not Found"));
    res.status(200).json({ user });
  } catch (err) {
    catchErrorHandler(res, err, next);
  }
});

//* next route
app.use(errorHandler);

//!-------------------------------

//* next error hnadler
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

//* create error
export const createError = (status, msg) => {
  const err = new Error();
  err.status = status;
  err.message = msg;
  return err;
};

//!-------------------------------

exports.catchErrorHandler = (res, err, next) => {
  //* Try Catch error Handler
  // wrong mongo db id
  if (err.name == "CastError") {
    const message = `Resource not found. Invailid: ${err.path}`;
    return next(createError(500, "Cast Error"));
  }
  // validation error
  else if (err.name === "ValidationError") {
    return res
      .status(400)
      .json({ error: "Validation error", message: err.message });
  }
  // mongoose duplicate key error
  else if (err.code === 11000) {
    return next(
      createError(400, `Duplicate ${Object.keys(err.keyValue)} Enterd`)
    );
  }
  // wrong jwt error
  else if (err.name === "jsonWebTokenError") {
    return next(createError(400, `Json Web Token is invalid, try again`));
  }
  // Jwt  expire error
  else if (err.name === "TokenExpireError") {
    return next(createError(400, `Json Web Token is expire, try again`));
  }
  // MongoDB Parse Error
  else if (err.name === "MongoParseError") {
    return next(createError(400, `MongoParseError ${err.message}`));
  } else {
    next(err);
  }
};

//!-------------------------------

//* unhandled promise rejection - mongoConnection String error handling
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to inhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});

//!------------------------------------
 