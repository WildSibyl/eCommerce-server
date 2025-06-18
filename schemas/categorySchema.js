import Joi from "joi";

const categorySchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(3).max(1000).required(),
}).required();

export default categorySchema;
