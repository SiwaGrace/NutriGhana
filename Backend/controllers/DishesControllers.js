const Food = require("../models/DishesModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @desc    Create a new food
// @route   POST /api/foods
// @access  Public (for now)
const createFood = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    tribe,
    nutrients,
    ingredients,
    instructions,
    tags,
    country,
    isFeatured,
  } = req.body;

  // Validate required fields
  if (!name || !category || !tribe || !req.file) {
    res.status(400);
    throw new Error("Name, category, tribe, and image are required");
  }

  // Upload image to Cloudinary
  const uploadResult = await cloudinary.uploader.upload(req.file.path, {
    folder: "nutrighana",
  });

  // Create the food document
  const food = await Food.create({
    name,
    description,
    category,
    tribe,
    country: country || "Ghana",
    nutrients: nutrients || [],
    ingredients: ingredients || [],
    instructions: instructions || [],
    tags: tags || [],
    isFeatured: isFeatured || false,
    imageUrl: uploadResult.secure_url,
  });

  res.status(201).json(food);
});

// @desc    Retrieve all foods
// @route   GET /api/foods
// @access  Public
const retrieveFood = asyncHandler(async (req, res) => {
  const foods = await Food.find();
  res.status(200).json(foods);
});

module.exports = {
  createFood,
  retrieveFood,
};
