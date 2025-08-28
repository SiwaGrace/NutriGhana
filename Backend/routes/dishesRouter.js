import express from "express";
// spoonacular
import { getDishes } from "../controllers/foodsController.js";
// mine
// const {
//   createFood,
//   retrieveFood,
// } = require("../controllers/DishesControllers.js");
// const { upload } = require("../config/cloudinary.js");

const router = express.Router();

// POST /api/foods -> create a food
// router.post("/", upload.single("image"), createFood);

router.get("/getall", getDishes);

// GET /api/foods -> retrieve all foods
// router.get("/", retrieveFood);

export default router;
