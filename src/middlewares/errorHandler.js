const { ValidationError } = require("joi");
const CustomErrorHandler = require("../services/customErrorHnadler");


const errorHandler = (err, req, res, next) => {
  // server error
  let data = {
    message: "Internal server error",
    ...(process.env.DEBUG_MODE === "true" && { originalError: err.message }),
  };

  //Joi validation error
  if (err instanceof ValidationError) {
    data = {
      message: err.message,
    };
  }

  //Custom validation error
  if (err instanceof CustomErrorHandler) {
    data = {
      message: err.message,
    };
  }
  return res.json({ success: false, data });
};

module.exports = errorHandler;
