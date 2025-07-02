import Joi from "joi";

const discountSchema = Joi.object({
  code: Joi.string()
    .pattern(/^[A-Z0-9%]+$/)
    .required()
    .label("Discount Code")
    .messages({
      "string.pattern.base": "Discount code not recognized.",
    }),
});

export default discountSchema;
