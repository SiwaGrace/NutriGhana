import express from "express";
import {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfile,
} from "../controllers/profileController.js";
import validateObjectId from "../middleware/validateObjectId.js";

import profileAuth from "../middleware/profileAuth.js";

const router = express.Router();

router.post("/", createProfile);
router.get("/", getProfiles);

// ✅ New route to get profile by current logged-in user (ID from token)
router.get("/me", profileAuth, getProfileById);

router.get("/:id", validateObjectId, getProfileById);
router.put("/:id", validateObjectId, updateProfile);

export default router;
