import { Router } from "express";
import { applyDiscount } from "../controllers/discounts.js";
import verifyToken from "../middleware/verifyToken.js";
import validateSchema from "../middleware/validateSchema.js";
import discountSchema from "../joi/discountSchema.js";

const discountRouter = Router();

discountRouter
  .route("/")
  .post(verifyToken, validateSchema(discountSchema), applyDiscount);

export default discountRouter;
