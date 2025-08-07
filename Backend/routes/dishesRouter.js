import express from "express";
import { getDishes } from "../controllers/dishesController.js";

const dishRouter = express.Router();

dishRouter.get("/getall", getDishes);

export default dishRouter;
