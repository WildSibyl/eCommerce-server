import Joi from "joi";

export const signUpSchema = Joi.object({
  userName: Joi.string()
    .trim()
    .pattern(/^[A-Za-z0-9\s]+$/, "letters, numbers, and spaces")
    .required(),
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
  terms: Joi.boolean().valid(true).required(),
});

export const signInSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().alphanum().min(8).required(),
});

export const updateEmailSchema = Joi.object({
  newEmail: Joi.string().email().required(),
  confirmNewEmail: Joi.string().valid(Joi.ref("newEmail")).required().messages({
    "any.only": "New email and confirmation do not match",
  }),
  currentPassword: Joi.string().required(),
});

export const updatePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(8).required(),
  confirmNewPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "New password and confirmation do not match",
    }),
});

export const updateAddressSchema = Joi.object({
  userName: Joi.string()
    .trim()
    .min(2)
    .max(250)
    .pattern(/^[A-Za-z0-9\s]+$/)
    .message("Username can only contain letters, numbers, and spaces")
    .required(),

  street: Joi.string().trim().min(2).max(250).required(),
  zipCode: Joi.string().trim().min(2).max(250).required(),
  city: Joi.string().trim().min(2).max(250).required(),
  state: Joi.string().trim().min(2).max(250).required(),
  country: Joi.string().trim().min(2).max(250).required(),
});

export const deleteAccountSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().min(8).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
});
