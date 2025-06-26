import { Router } from "express";
import {
  getStripeConfig,
  createPaymentIntent,
} from "../controllers/checkout.js";
import validateSchema from "../middleware/validateSchema.js";
import { createPaymentIntentSchema } from "../joi/checkoutSchemas.js";

const checkoutRouter = Router();

// checkoutRouter.route("/");

checkoutRouter.route("/config").get(getStripeConfig);

checkoutRouter
  .route("/create-payment-intent")
  .post(validateSchema(createPaymentIntentSchema), createPaymentIntent);

export default checkoutRouter;
