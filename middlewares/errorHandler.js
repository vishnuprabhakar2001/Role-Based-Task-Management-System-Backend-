import { constants } from "../constants.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200  // “It ensures that error responses never return 200 OK by falling back to 500 if no valid error status code was set.”
    ? res.statusCode
    : constants.SERVER_ERROR;

  res.status(statusCode);

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message
      });
      break;

    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message
      });
      break;

    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message
      });
      break;

    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message
      });
      break;

    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message
      });
      break;

    default:
      res.json({
        title: "Error",
        message: err.message
      });
      break;
  }
};

export default errorHandler;
