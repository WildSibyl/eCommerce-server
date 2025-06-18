import { Router } from "express";
import {
  getProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
} from "../controllers/products.js";
import validateSchema from "../middleware/validateSchema.js";
import {
  postProductSchema,
  putProductSchema,
} from "../schemas/productSchema.js";

const productRouter = Router();

productRouter
  .route("/")
  .get(getProducts)
  .post(validateSchema(postProductSchema), postProduct);

productRouter
  .route("/:id")
  .get(getProductById)
  .put(validateSchema(putProductSchema), putProduct)
  .delete(deleteProduct);

export default productRouter;
