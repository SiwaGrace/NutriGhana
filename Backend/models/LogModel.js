import mongoose from "mongoose";
// Daily Logs

const logSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: { type: Date, required: true },

    totals: {
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fat: { type: Number, default: 0 },
    },

    foods: [
      {
        foodName: { type: String, required: true },
        calories: { type: Number, required: true },
        protein: { type: Number, required: true },
        carbs: { type: Number, required: true },
        fat: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Log = mongoose.model("Log", logSchema);

export default Log;
