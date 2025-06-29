import { Router } from "express";
import {
  getOrderById,
  getOrdersByUserId,
  getOrders,
  postOrders,
  putOrder,
  deleteOrder,
} from "../controllers/orders.js";
import verifyTokenOptional from "../middleware/verifyTokenOptional.js";
import validateSchema from "../middleware/validateSchema.js";
import orderSchema from "../schemas/orderSchema.js";

const orderRouter = Router();

orderRouter
  .route("/")
  .get(getOrders)
  .post(validateSchema(orderSchema), postOrders);

orderRouter.route("/user").get(verifyTokenOptional, getOrdersByUserId);

orderRouter
  .route("/:id")
  .get(verifyTokenOptional, getOrderById)
  .put(validateSchema(orderSchema), putOrder)
  .delete(deleteOrder);
export default orderRouter;
