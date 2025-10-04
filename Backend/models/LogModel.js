import mongoose from "mongoose";

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
        dishId: { type: mongoose.Schema.Types.ObjectId, ref: "ghanaiandishes" },
        dishName: String,
        grams: Number,
        addOns: [
          {
            name: String,
            quantity: Number,
            perUnit: {
              calories: Number,
              protein: Number,
              carbs: Number,
              fat: Number,
            },
          },
        ],
        total: {
          calories: Number,
          protein: Number,
          carbs: Number,
          fat: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

const Log = mongoose.model("Log", logSchema);

export default Log;
