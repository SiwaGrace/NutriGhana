import express from "express";
import {
  getLogs,
  createLog,
  //   getLogByDate,
  //   removeFoodFromLog,
} from "../controllers/LogController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.route("/").post(userAuth, createLog).get(userAuth, getLogs);
// router.route("/date/:date").get(userAuth, getLogByDate);
// router.route("/:logId/:foodId").delete(userAuth, removeFoodFromLog);

export default router;
