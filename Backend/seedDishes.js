// seedDishes.js
import mongoose from "mongoose";
import Food from "./models/DishesModel.js";
import dotenv from "dotenv";
dotenv.config();

// Example dishes array
const dishes = [
  {
    name: "Waakye",
    description:
      "Rice and beans cooked together, often served with fried fish, boiled eggs, spaghetti, and shito sauce.",
    category: "breakfast",
    tribe: "Ashanti",
    nutrients: [
      {
        name: "Calories",
        amount: 450, // per 1 bowl
        unit: "kcal",
        percentOfDailyNeeds: 22.5,
      },
      { name: "Protein", amount: 15, unit: "g", percentOfDailyNeeds: 30 },
      { name: "Carbs", amount: 80, unit: "g", percentOfDailyNeeds: 26 },
      { name: "Fat", amount: 8, unit: "g", percentOfDailyNeeds: 12 },
    ],
    bowlPresets: [
      { label: "½ bowl", grams: 150 },
      { label: "1 bowl", grams: 250 },
      { label: "1½ bowls", grams: 350 },
      { label: "2 bowls", grams: 500 },
    ],
    ingredients: [
      { name: "Rice", quantity: "1 cup" },
      { name: "Beans", quantity: "1 cup" },
      { name: "Water", quantity: "4 cups" },
      { name: "Salt", quantity: "1 tsp" },
    ],
    instructions: [
      "Soak beans overnight.",
      "Cook beans and rice together in water with salt until done.",
      "Serve with accompaniments like fried fish, boiled eggs, spaghetti, and shito sauce.",
    ],
    isFeatured: true,
    imageUrl:
      "https://res.cloudinary.com/dri5eu4l2/image/upload/v1756497904/waakye_sr5bhy.webp",

    tags: ["high-calorie", "main-dish", "energy-rich"],
  },
  {
    name: "Banku and Tilapia",
    description:
      "Fermented corn and cassava dough (Banku) served with grilled tilapia and pepper sauce.",
    category: "lunch",
    tribe: "Ewe",
    nutrients: [
      {
        name: "Calories",
        amount: 600, // per 1 bowl
        unit: "kcal",
        percentOfDailyNeeds: 30,
      },
      { name: "Protein", amount: 25, unit: "g", percentOfDailyNeeds: 50 },
      { name: "Carbs", amount: 85, unit: "g", percentOfDailyNeeds: 28 },
      { name: "Fat", amount: 18, unit: "g", percentOfDailyNeeds: 27 },
    ],
    bowlPresets: [
      { label: "½ bowl", grams: 150 },
      { label: "1 bowl", grams: 250 },
      { label: "1½ bowls", grams: 350 },
      { label: "2 bowls", grams: 500 },
    ],
    ingredients: [
      { name: "Corn dough", quantity: "2 cups" },
      { name: "Cassava dough", quantity: "1 cup" },
      { name: "Tilapia", quantity: "1 whole fish" },
      { name: "Pepper sauce", quantity: "to taste" },
    ],
    instructions: [
      "Mix corn and cassava dough and cook with water, stirring constantly, until smooth and stretchy.",
      "Grill tilapia until cooked through.",
      "Serve banku with tilapia and pepper sauce.",
    ],
    isFeatured: true,
    imageUrl:
      "https://res.cloudinary.com/dri5eu4l2/image/upload/v1756497902/banku-and-Tilapia_kb5hmz.jpg",
    tags: ["traditional", "gluten-free", "starchy", "filling"],
  },
];
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB, seeding dishes...");

    // Optional: remove existing dishes to avoid duplicates
    await Food.deleteMany();

    // Insert all dishes
    await Food.insertMany(dishes);

    console.log("Dishes seeded successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });
