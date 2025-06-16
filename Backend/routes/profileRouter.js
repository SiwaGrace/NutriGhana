const express = require("express");
const {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfile,
} = require("../controllers/profileController");

const profileRouter = express.Router();

profileRouter.post("/", createProfile);
profileRouter.get("/", getProfiles);
profileRouter.get("/:id", getProfileById);

profileRouter.put("/:id", updateProfile);

module.exports = profileRouter;
