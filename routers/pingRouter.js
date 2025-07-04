import { Router } from "express";
import { ping } from "../controllers/ping.js";

const pingRouter = Router();

pingRouter.route("/").get(ping);

export default pingRouter;
