import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";
import validateSchema from "../middleware/validateSchema.js";
import { userSchema, putUserSchema } from "../schemas/userSchema.js";

const userRouter = Router();

userRouter
  .route("/")
  .get(getAllUsers)
  .post(validateSchema(userSchema), createUser);

userRouter
  .route("/:id")
  .get(getUser)
  .put(validateSchema(putUserSchema), updateUser)
  .delete(deleteUser);

export default userRouter;
