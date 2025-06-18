import { Router } from "express";
import {
  getOrderById,
  getOrders,
  postOrders,
  putOrder,
  deleteOrder,
} from "../controllers/orders.js";
import validateSchema from "../middleware/validateSchema.js";
import orderSchema from "../schemas/orderSchema.js";

const orderRouter = Router();

orderRouter
  .route("/")
  .get(getOrders)
  .post(validateSchema(orderSchema), postOrders);

orderRouter
  .route("/:id")
  .get(getOrderById)
  .put(validateSchema(orderSchema), putOrder)
  .delete(deleteOrder);
export default orderRouter;
