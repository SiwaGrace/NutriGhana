import express from "express";
// spoonacular
import { getDishes } from "../controllers/foodsController.js";

const router = express.Router();

router.get("/getall", getDishes);

export default router;
