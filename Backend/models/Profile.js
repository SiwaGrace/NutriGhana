const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    gender: String,
    yearOfBirth: String,
    height: String,
    weight: String,
    activityLevel: String,
    dietaryLevel: String,
    currentWeight: String,
    currentWeightGoal: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
