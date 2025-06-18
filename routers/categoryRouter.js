import { Router } from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.js";
import validateSchema from "../middleware/validateSchema.js";
import categorySchema from "../schemas/categorySchema.js";

const categoryRouter = Router();

categoryRouter
  .route("/")
  .get(getCategories)
  .post(validateSchema(categorySchema), createCategory);
categoryRouter
  .route("/:id")
  .get(getCategoryById)
  .put(validateSchema(categorySchema), updateCategory)
  .delete(deleteCategory);

export default categoryRouter;
