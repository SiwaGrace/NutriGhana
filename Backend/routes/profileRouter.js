const express = require("express");
const {
  createProfile,
  getProfiles,
  updateProfile,
} = require("../controllers/profileController");

const profileRouter = express.Router();

profileRouter.post("/", createProfile);
profileRouter.get("/", getProfiles);

profileRouter.put("/:id", updateProfile);

module.exports = profileRouter;
