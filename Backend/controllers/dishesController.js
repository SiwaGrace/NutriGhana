const axios = require("axios");
require("dotenv").config();

const getDishes = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.VITE_SPOON_API_KEY}&addRecipeNutrition=true`
    );
    const dishes = response.data.results;
    // TEMP: Simulate flags for demo GO THROUGH THIS
    const mockedDishes = dishes.map((d, i) => ({
      ...d,
      favorite: i % 2 === 0,
      saved: i % 3 === 0,
    }));
    res.json({ results: mockedDishes });
    // res.json(response.data);
  } catch (error) {
    console.error("Error fetching dishes:", error);
    res.status(500).json({ message: "Failed to fetch dishes" });
  }
};

module.exports = {
  getDishes,
};
