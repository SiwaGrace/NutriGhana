const express = require("express");
const { createProfile, getProfiles } = require("../controllers/profileController");

const profileRouter = express.Router();

profileRouter.post("/", createProfile);
profileRouter.get("/",getProfiles)


module.exports = profileRouter;
