import "./db/associations.js";
import sequelize from "./db/index.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routers/authRouter.js";
import categoryRouter from "./routers/categoryRouter.js";
import orderRouter from "./routers/orderRouter.js";
import productRouter from "./routers/productRouter.js";
import ErrorResponse from "./utils/ErrorResponse.js";
import userRouter from "./routers/userRouter.js";

const app = express();
const port = process.env.PORT || 8080;
const allowedOrigin = process.env.CLIENT_URL;

const errorHandler = (err, req, res, next) => {
  process.env.NODE_ENV !== "production" && console.log(err);
  res.status(err.statusCode || 500).json({ error: err.message });
};

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/categories", categoryRouter);
app.use("/orders", orderRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);

app.use((req, res) => {
  throw new ErrorResponse("Invalid route", 404);
});

app.use(errorHandler);

// sequelize.sync({ force: true }).then(() => {
//   console.log("Database synced with models (forced).");
// });

app.listen(port, () => console.log(`e-commerce server running at ${port}`));

//npm install
//npm i bcrypt
//npm install jsonwebtoken
//npm i cookie-parser
//npm i sequelize pg
//npm i joi
//npm i cors
//npm i express
