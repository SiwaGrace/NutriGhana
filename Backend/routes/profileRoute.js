import express from "express";

import { getUserData } from "../controllers/userController.js";
import profileAuth from "../middleware/profileAuth.js";
import { getUserProfile } from "../controllers/profilController.js";

const profileRouter = express.Router();

profileRouter.get("/data", profileAuth, getUserProfile);

export default profileRouter;
