import Joi from "joi";

export const createPaymentIntentSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .required(),

  shipping: Joi.object({
    name: Joi.string().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),

  billing: Joi.object({
    name: Joi.string().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),

  fee: Joi.string()
    .pattern(/^\d+(\.\d{1,2})?$/)
    .required(), // e.g. "5.00"
  discountCode: Joi.string()
    .pattern(/^[A-Z0-9%]+$/)
    .required()
    .label("Discount Code")
    .messages({
      "string.pattern.base": "Discount code not recognized.",
    }),
  total: Joi.number().integer().required(), // in cents
});
