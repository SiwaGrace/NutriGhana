const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: false }, // unique removed
    gender: String,
    yearOfBirth: String,
    height: String,
    weight: String,
    activityLevel: String,
    dietaryGoal: String,
    currentWeight: String,
    currentWeightGoal: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
