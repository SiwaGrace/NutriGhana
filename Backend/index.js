import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import foodsRouter from "./routes/foodsRouter.js";
import DishesRouter from "./routes/DishesRoutes.js";
import logRoutes from "./routes/LogRoutes.js";

import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: [
    "http://localhost:5173",
    ,
    "https://incandescent-gnome-cedb70.netlify.app/",
  ],
  // , "https://your-frontend.com"
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/api/foods", foodsRouter);
app.use("/api/dishes", DishesRouter);
app.use("/api/logstats", logRoutes);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// api look
// app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(`
    <div style="
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 50px;
      background-color: #f9fafb;
    ">
      <h1 style="color: #16a34a;">🌿 NutriGhana Backend</h1>
      <p style="font-size: 18px; color: #555;">
        Your API is running successfully on Render 🚀
      </p>
      <p>Try it: <a href="/api/dishes" style="color: #2563eb;">View Dishes API</a></p>
    </div>
  `);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
