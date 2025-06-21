const express = require("express");
const {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfile,
} = require("../controllers/profileController");

const profileRouter = express.Router();

profileRouter.post("/", createProfile); // Create a new profile
profileRouter.get("/", getProfiles); // Get all profiles
profileRouter.get("/:id", getProfileById); // Get a profile by ID
profileRouter.put("/:id", updateProfile); // Update a profile by ID

module.exports = profileRouter;
