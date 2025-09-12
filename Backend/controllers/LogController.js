import asyncHandler from "express-async-handler";
import Log from "../models/LogModel.js";

// @desc    Create a new daily log
// @route   POST /api/logs
// @access  Private
export const createLog = asyncHandler(async (req, res) => {
  const { date, totals, foods } = req.body;

  const logExists = await Log.findOne({ userId: req.user._id, date });

  if (logExists) {
    res.status(400);
    throw new Error("Log already exists for this date");
  }

  const log = await Log.create({
    userId: req.user._id,
    date,
    totals,
    foods,
  });

  res.status(201).json(log);
});

// @desc    Get logs for current user
// @route   GET /api/logs
// @access  Private
export const getLogs = asyncHandler(async (req, res) => {
  const logs = await Log.find({ userId: req.user._id }).sort({ date: -1 });
  res.json(logs);
});

// @desc    Get log by date
// @route   GET /api/logs/:date
// @access  Private
export const getLogByDate = asyncHandler(async (req, res) => {
  const { date } = req.params;
  const log = await Log.findOne({ userId: req.user._id, date });

  if (!log) {
    res.status(404);
    throw new Error("Log not found for this date");
  }

  res.json(log);
});

// @desc    Update log (totals or foods)
// @route   PUT /api/logs/:id
// @access  Private
export const updateLog = asyncHandler(async (req, res) => {
  const log = await Log.findById(req.params.id);

  if (!log) {
    res.status(404);
    throw new Error("Log not found");
  }

  if (log.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  log.totals = req.body.totals || log.totals;
  log.foods = req.body.foods || log.foods;

  const updatedLog = await log.save();
  res.json(updatedLog);
});

// @desc    Delete log
// @route   DELETE /api/logs/:id
// @access  Private
export const deleteLog = asyncHandler(async (req, res) => {
  const log = await Log.findById(req.params.id);

  if (!log) {
    res.status(404);
    throw new Error("Log not found");
  }

  if (log.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await log.remove();
  res.json({ message: "Log removed" });
});
