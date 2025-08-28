const express = require("express");
const isAuth = require("../middlewares/isAuth");
const { createFood, retrieveFood } = require("../controllers/FoodsControllers");
const { upload } = require("../config/cloudinary");

const router = express.Router();

// POST /api/foods -> create a food
router.post("/", upload.single("image"), createFood);

// GET /api/foods -> retrieve all foods
router.get("/", retrieveFood);

module.exports = router;
