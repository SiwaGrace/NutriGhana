import express from "express";
import { createFood, retrieveFood } from "../controllers/DishesControllers.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// POST /api/foods -> create a food
router.post("/", upload.single("image"), createFood);

// GET /api/foods -> retrieve all foods
router.get("/get", retrieveFood);

export default router;
