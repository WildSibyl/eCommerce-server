import Joi from "joi";

const orderSchema = Joi.object({
  userId: Joi.number().integer().required(),
  products: Joi.array().items(
    Joi.object({
      productId: Joi.number().integer().min(1).required(),
      quantity: Joi.number().integer().min(1).required(),
    })
  ),
}).required();

export default orderSchema;
