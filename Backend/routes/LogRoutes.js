import express from "express";
import {
  createLog,
  getLogs,
  getLogByDate,
  updateLog,
  deleteLog,
} from "../controllers/LogController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

// POST /api/logs   -> create a new log
// GET /api/logs    -> get all logs for logged-in user
router.route("/").post(userAuth, createLog).get(userAuth, getLogs);

// GET /api/logs/:date   -> get log by date
router.route("/:date").get(userAuth, getLogByDate);

// PUT /api/logs/:id  -> update log by id
// DELETE /api/logs/:id -> delete log by id
router.route("/:id").put(userAuth, updateLog).delete(userAuth, deleteLog);

export default router;
