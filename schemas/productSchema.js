import Joi from "joi";

const postProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(""),
  price: Joi.number().positive().required(),
  categoryId: Joi.number().integer().required(),
});

const putProductSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string().allow(""),
  price: Joi.number().positive(),
  categoryId: Joi.number().integer(),
});

export { postProductSchema, putProductSchema };
