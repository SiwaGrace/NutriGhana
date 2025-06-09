// express
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
// imported routers
const dishRouter = require("./routes/dishesRouter");
const profileRouter = require("./routes/profileRouter");

// server
const app = express();

// anabling cors with specific origin requirement
const corsOptions = {
  origin: ["http://localhost:5174", "https://your-frontend.com"],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
};
app.use(cors(corsOptions));

// routers

// body parser middleware
app.use(bodyParser.json());

// Routers
app.use("/api/dishes", dishRouter);
app.use("/api/profile", profileRouter);

// connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" Connected to MongoDB successfully");
    app.listen(PORT, () => {
      console.log(` Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Database connection failed:", err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
