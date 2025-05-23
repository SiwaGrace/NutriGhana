const getDishes = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching dishes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getDishes,
};
