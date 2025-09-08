import mongoose from "mongoose";
const { Schema } = mongoose;

const foodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: ["breakfast", "lunch", "dinner", "snack", "drink"],
      required: true,
    },
    country: {
      type: String,
      default: "Ghana",
    },
    tribe: {
      type: String,
      enum: [
        "Ashanti",
        "Ewe",
        "Ga",
        "Fante",
        "Dagomba",
        "Nzema",
        "Hausa",
        "Gonja",
        "Akan",
        "Urban Ghana",
        "Other",
      ],
      required: true,
    },
    nutrients: [
      {
        name: { type: String, required: true }, // e.g., Calories, Fat
        amount: { type: Number, required: true },
        unit: { type: String, required: true }, // e.g., g, kcal
        percentOfDailyNeeds: { type: Number, default: 0 },
      },
    ],
    bowlPreset: {
      type: String,
      enum: ["small", "medium", "large"],
      default: "medium",
    },
    imageUrl: {
      type: String,
      default: "", // Cloudinary or other image link
    },
    ingredients: [
      {
        name: String,
        quantity: String, // "2 cups", "1 tbsp"
      },
    ],
    instructions: {
      type: [String], // step-by-step method
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false, // for popular dishes
    },
    tags: {
      type: [String], // e.g., ["vegan", "gluten-free"]
      default: [],
    },
  },
  { timestamps: true }
);

const FoodModel = mongoose.model("ghanaiandishes", foodSchema);
export default FoodModel;
