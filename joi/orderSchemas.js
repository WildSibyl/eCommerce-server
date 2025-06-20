import Joi from "joi";

export const orderSchema = Joi.object({
  userName: Joi.string(),
  email: Joi.string().email().lowercase().trim().required(),
  address: Joi.object({
    street: Joi.string().required(),
    houseNumber: Joi.string().required(),
    postalCode: Joi.string().required(),
    city: Joi.string().required(),
  }).required(),
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required(),
});
