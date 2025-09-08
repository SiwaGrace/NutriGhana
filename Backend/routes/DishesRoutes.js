import express from "express";
import {
  createFood,
  retrieveFood,
  getDishesByCategory,
  deleteAllDishes,
} from "../controllers/DishesControllers.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// POST /api/foods -> create a food
router.post("/", upload.single("image"), createFood);

// GET /api/foods -> retrieve all foods
router.get("/", retrieveFood);

// GET /api/foods -> retrieve foods by category
router.get("/category/:category", getDishesByCategory);

// DELETE /api/foods -> retrieve foods by category
router.delete("/deleteAll", deleteAllDishes);

export default router;
