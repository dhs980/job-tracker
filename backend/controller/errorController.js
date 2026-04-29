import { isProduction } from "../utils/runtimeConfig.js";

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //log the error
    console.error("error", err);
    //send a generic error
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};
export const gobalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (isProduction) {
    return sendErrorProd(err, res);
  }
  return sendErrorDev(err, res);
};
