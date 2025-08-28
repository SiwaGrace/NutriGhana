// // seedDishes.js
// const mongoose = require("mongoose");
// const Food = require("./models/DishesModel"); // adjust the path if needed
// require("dotenv").config();

// // Example dishes array
// const dishes = [
//   {
//     name: "Waakye",
//     description:
//       "Rice and beans cooked together, often served with fried fish, boiled eggs, spaghetti, and shito sauce.",
//     category: "breakfast",
//     tribe: "Ashanti",
//     nutrients: [
//       {
//         name: "Calories",
//         amount: 450,
//         unit: "kcal",
//         percentOfDailyNeeds: 22.5,
//       },
//       { name: "Protein", amount: 15, unit: "g", percentOfDailyNeeds: 30 },
//       { name: "Carbs", amount: 80, unit: "g", percentOfDailyNeeds: 26 },
//       { name: "Fat", amount: 8, unit: "g", percentOfDailyNeeds: 12 },
//     ],
//     ingredients: [
//       { name: "Rice", quantity: "1 cup" },
//       { name: "Beans", quantity: "1 cup" },
//       { name: "Water", quantity: "4 cups" },
//       { name: "Salt", quantity: "1 tsp" },
//     ],
//     instructions: [
//       "Soak beans overnight.",
//       "Cook beans and rice together in water with salt until done.",
//       "Serve with accompaniments like fried fish, boiled eggs, spaghetti, and shito sauce.",
//     ],
//     isFeatured: true,
//     imageUrl: "https://res.cloudinary.com/demo/image/upload/waakye.jpg",
//   },
//   {
//     name: "Kelewele",
//     description:
//       "Spicy fried plantains, commonly served as a snack or side dish.",
//     category: "snack",
//     tribe: "Ga",
//     nutrients: [
//       {
//         name: "Calories",
//         amount: 300,
//         unit: "kcal",
//         percentOfDailyNeeds: 15,
//       },
//       { name: "Protein", amount: 2, unit: "g", percentOfDailyNeeds: 4 },
//       { name: "Carbs", amount: 45, unit: "g", percentOfDailyNeeds: 15 },
//       { name: "Fat", amount: 12, unit: "g", percentOfDailyNeeds: 18 },
//     ],
//     ingredients: [
//       { name: "Ripe plantains", quantity: "2" },
//       { name: "Ginger powder", quantity: "1 tsp" },
//       { name: "Chili powder", quantity: "1 tsp" },
//       { name: "Salt", quantity: "to taste" },
//       { name: "Oil", quantity: "for frying" },
//     ],
//     instructions: [
//       "Peel and cut plantains into cubes.",
//       "Mix with ginger, chili, and salt.",
//       "Deep fry until golden brown.",
//     ],
//     isFeatured: true,
//     imageUrl: "https://res.cloudinary.com/demo/image/upload/kelewele.jpg",
//   },
//   {
//     name: "Banku and Tilapia",
//     description:
//       "Fermented corn and cassava dough (Banku) served with grilled tilapia and pepper sauce.",
//     category: "lunch",
//     tribe: "Ewe",
//     nutrients: [
//       {
//         name: "Calories",
//         amount: 600,
//         unit: "kcal",
//         percentOfDailyNeeds: 30,
//       },
//       { name: "Protein", amount: 25, unit: "g", percentOfDailyNeeds: 50 },
//       { name: "Carbs", amount: 85, unit: "g", percentOfDailyNeeds: 28 },
//       { name: "Fat", amount: 18, unit: "g", percentOfDailyNeeds: 27 },
//     ],
//     ingredients: [
//       { name: "Corn dough", quantity: "2 cups" },
//       { name: "Cassava dough", quantity: "1 cup" },
//       { name: "Tilapia", quantity: "1 whole fish" },
//       { name: "Pepper sauce", quantity: "to taste" },
//     ],
//     instructions: [
//       "Mix corn and cassava dough and cook with water, stirring constantly, until smooth and stretchy.",
//       "Grill tilapia until cooked through.",
//       "Serve banku with tilapia and pepper sauce.",
//     ],
//     isFeatured: true,
//     imageUrl: "https://res.cloudinary.com/demo/image/upload/banku-tilapia.jpg",
//   },
//   {
//     name: "Fufu and Light Soup",
//     description:
//       "Pounded cassava and plantain (Fufu) served with a light tomato-based soup.",
//     category: "dinner",
//     tribe: "Akan",
//     nutrients: [
//       {
//         name: "Calories",
//         amount: 550,
//         unit: "kcal",
//         percentOfDailyNeeds: 27.5,
//       },
//       { name: "Protein", amount: 18, unit: "g", percentOfDailyNeeds: 36 },
//       { name: "Carbs", amount: 100, unit: "g", percentOfDailyNeeds: 33 },
//       { name: "Fat", amount: 12, unit: "g", percentOfDailyNeeds: 18 },
//     ],
//     ingredients: [
//       { name: "Cassava", quantity: "2 cups" },
//       { name: "Plantain", quantity: "1 cup" },
//       { name: "Tomatoes", quantity: "3" },
//       { name: "Pepper", quantity: "to taste" },
//     ],
//     instructions: [
//       "Boil and pound cassava and plantain until smooth to make fufu.",
//       "Prepare light soup using tomatoes, pepper, and spices.",
//       "Serve fufu with light soup.",
//     ],
//     isFeatured: true,
//     imageUrl:
//       "https://res.cloudinary.com/demo/image/upload/fufu-light-soup.jpg",
//   },
//   {
//     name: "Red-Red",
//     description: "Beans cooked in palm oil, often served with fried plantain.",
//     category: "lunch",
//     tribe: "Ga",
//     nutrients: [
//       {
//         name: "Calories",
//         amount: 420,
//         unit: "kcal",
//         percentOfDailyNeeds: 21,
//       },
//       { name: "Protein", amount: 12, unit: "g", percentOfDailyNeeds: 24 },
//       { name: "Carbs", amount: 65, unit: "g", percentOfDailyNeeds: 22 },
//       { name: "Fat", amount: 14, unit: "g", percentOfDailyNeeds: 21 },
//     ],
//     ingredients: [
//       { name: "Beans", quantity: "2 cups" },
//       { name: "Palm oil", quantity: "3 tbsp" },
//       { name: "Onion", quantity: "1" },
//       { name: "Tomato", quantity: "2" },
//     ],
//     instructions: [
//       "Cook beans until soft.",
//       "Prepare sauce with palm oil, onions, and tomato.",
//       "Combine beans with sauce and serve with fried plantains.",
//     ],
//     isFeatured: false,
//     imageUrl: "https://res.cloudinary.com/demo/image/upload/red-red.jpg",
//   },
//   {
//     name: "Kokonte",
//     description: "Dried cassava flour porridge, usually served with soup.",
//     category: "dinner",
//     tribe: "Akan",
//     nutrients: [
//       {
//         name: "Calories",
//         amount: 350,
//         unit: "kcal",
//         percentOfDailyNeeds: 17.5,
//       },
//       { name: "Protein", amount: 6, unit: "g", percentOfDailyNeeds: 12 },
//       { name: "Carbs", amount: 70, unit: "g", percentOfDailyNeeds: 23 },
//       { name: "Fat", amount: 2, unit: "g", percentOfDailyNeeds: 3 },
//     ],
//     ingredients: [
//       { name: "Dried cassava flour", quantity: "1 cup" },
//       { name: "Water", quantity: "2 cups" },
//     ],
//     instructions: [
//       "Mix dried cassava flour with water and cook until thick.",
//       "Serve with your preferred soup.",
//     ],
//     isFeatured: false,
//     imageUrl: "https://res.cloudinary.com/demo/image/upload/kokonte.jpg",
//   },
//   {
//     name: "Gari Fortor",
//     description:
//       "Gari mixed with tomato stew and often served with fried fish or eggs.",
//     category: "lunch",
//     tribe: "Ewe",
//     nutrients: [
//       {
//         name: "Calories",
//         amount: 400,
//         unit: "kcal",
//         percentOfDailyNeeds: 20,
//       },
//       { name: "Protein", amount: 10, unit: "g", percentOfDailyNeeds: 20 },
//       { name: "Carbs", amount: 70, unit: "g", percentOfDailyNeeds: 23 },
//       { name: "Fat", amount: 12, unit: "g", percentOfDailyNeeds: 18 },
//     ],
//     ingredients: [
//       { name: "Gari", quantity: "2 cups" },
//       { name: "Tomato stew", quantity: "1 cup" },
//       { name: "Oil", quantity: "2 tbsp" },
//     ],
//     instructions: [
//       "Mix gari with water and tomato stew.",
//       "Heat until cooked through.",
//       "Serve with fried fish or eggs.",
//     ],
//     isFeatured: false,
//     imageUrl: "https://res.cloudinary.com/demo/image/upload/gari-fortor.jpg",
//   },
//   {
//     name: "Sobolo",
//     description: "Refreshing hibiscus drink, served cold.",
//     category: "drink",
//     tribe: "Akan",
//     nutrients: [
//       {
//         name: "Calories",
//         amount: 50,
//         unit: "kcal",
//         percentOfDailyNeeds: 2.5,
//       },
//       { name: "Protein", amount: 0, unit: "g", percentOfDailyNeeds: 0 },
//       { name: "Carbs", amount: 12, unit: "g", percentOfDailyNeeds: 4 },
//       { name: "Fat", amount: 0, unit: "g", percentOfDailyNeeds: 0 },
//     ],
//     ingredients: [
//       { name: "Dried hibiscus petals", quantity: "1 cup" },
//       { name: "Water", quantity: "4 cups" },
//       { name: "Sugar", quantity: "to taste" },
//     ],
//     instructions: [
//       "Boil hibiscus petals in water.",
//       "Strain and add sugar to taste.",
//       "Serve chilled.",
//     ],
//     isFeatured: false,
//     imageUrl: "https://res.cloudinary.com/demo/image/upload/sobolo.jpg",
//   },
//   {
//     name: "Jollof Rice",
//     description:
//       "Spiced rice cooked in tomato sauce, often with vegetables and meat.",
//     category: "lunch",
//     tribe: "Ga",
//     nutrients: [
//       {
//         name: "Calories",
//         amount: 450,
//         unit: "kcal",
//         percentOfDailyNeeds: 22.5,
//       },
//       { name: "Protein", amount: 12, unit: "g", percentOfDailyNeeds: 24 },
//       { name: "Carbs", amount: 75, unit: "g", percentOfDailyNeeds: 25 },
//       { name: "Fat", amount: 10, unit: "g", percentOfDailyNeeds: 15 },
//     ],
//     ingredients: [
//       { name: "Rice", quantity: "2 cups" },
//       { name: "Tomato paste", quantity: "1 cup" },
//       { name: "Vegetables", quantity: "1 cup" },
//       { name: "Chicken or fish", quantity: "1 cup" },
//     ],
//     instructions: [
//       "Prepare tomato sauce with vegetables and spices.",
//       "Cook rice in the sauce until done.",
//       "Add chicken or fish and serve hot.",
//     ],
//     isFeatured: true,
//     imageUrl: "https://res.cloudinary.com/demo/image/upload/jollof-rice.jpg",
//   },
//   {
//     name: "Fried Rice",
//     description: "Rice stir-fried with vegetables, eggs, and sometimes meat.",
//     category: "lunch",
//     tribe: "Urban Ghana",
//     nutrients: [
//       {
//         name: "Calories",
//         amount: 420,
//         unit: "kcal",
//         percentOfDailyNeeds: 21,
//       },
//       { name: "Protein", amount: 10, unit: "g", percentOfDailyNeeds: 20 },
//       { name: "Carbs", amount: 65, unit: "g", percentOfDailyNeeds: 22 },
//       { name: "Fat", amount: 12, unit: "g", percentOfDailyNeeds: 18 },
//     ],
//     ingredients: [
//       { name: "Rice", quantity: "2 cups" },
//       { name: "Vegetables", quantity: "1 cup" },
//       { name: "Eggs", quantity: "2" },
//       { name: "Oil", quantity: "2 tbsp" },
//     ],
//     instructions: [
//       "Boil rice until cooked.",
//       "Stir-fry vegetables and eggs in oil.",
//       "Add rice and fry together, seasoning to taste.",
//     ],
//     isFeatured: true,
//     imageUrl: "https://res.cloudinary.com/demo/image/upload/fried-rice.jpg",
//   },
// ];
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(async () => {
//     console.log("Connected to MongoDB, seeding dishes...");

//     // Optional: remove existing dishes to avoid duplicates
//     await Food.deleteMany();

//     // Insert all dishes
//     await Food.insertMany(dishes);

//     console.log("Dishes seeded successfully!");
//     process.exit();
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err);
//     process.exit(1);
//   });
