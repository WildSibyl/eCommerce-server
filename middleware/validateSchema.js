import ErrorResponse from "../utils/ErrorResponse.js";

const validateSchema = (schema) => async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    console.error("❌ Joi Validation Error:", error.details);
    return next(
      new ErrorResponse(
        "Some fields have not been filled correctly, please check!",
        400
      )
    );
  }
  next();
};

export default validateSchema;
