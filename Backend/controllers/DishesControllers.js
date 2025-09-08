import Food from "../models/DishesModel.js";
import asyncHandler from "express-async-handler";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

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
    bowlPreset,
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
    bowlPreset: bowlPreset || [],
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
  res.status(200).json({ results: foods });
});

// @desc    Retrieve foods by category
// @route   GET /api/foods
// @access  Public
const getDishesByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;

  const dishes = await Food.find({ category });
  if (dishes.length === 0) {
    res.status(404).json({ message: `No dishes found in ${category}` });
  } else {
    res.json(dishes);
  }
});

// @desc    Delete dishes
// @route   DELETE /api/foods/all
// @access  Public to delete later
const deleteAllDishes = asyncHandler(async (req, res) => {
  await Food.deleteMany({});
  res.status(200).json({ message: "All dishes have been deleted" });
});

export { createFood, retrieveFood, getDishesByCategory, deleteAllDishes };
