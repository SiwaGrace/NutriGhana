import React, { useState, useEffect } from "react";
import FishIcon from "../assets/logo&icons/fa-solid_fish.svg";
import CarbIcon from "../assets/logo&icons/fluent_food-grains-20-filled.svg";
import FatIcon from "../assets/logo&icons/game-icons_fat.svg";
import StreakIcon from "../assets/logo&icons/streakIcon.svg";
import FoodLog from "../components/dishesComponents/FoodLogCard";
import Streaks from "../components/Streaks";
import { useDispatch, useSelector } from "react-redux";
import { clearFoods } from "../slices/loggedFoodsSlice";
import { motion } from "framer-motion";

const ProfileHome = () => {
  const [userName, setUserName] = useState("");
  const [selectedDay, setSelectedDay] = useState("today");
  const [recommendedCalories, setRecommendedCalories] = useState(null);
  const [caloriesPop, setCaloriesPop] = useState(false);
  const [loginStreak, setLoginStreak] = useState(0);

  // temporary demo macros (replace later with backend values)
  const [macros, setMacros] = useState({
    protein: 40,
    carbs: 70,
    fat: 20,
  });
  const goals = { protein: 100, carbs: 100, fat: 100 };

  // Fake update (for demo) - every 4s increase macros
  useEffect(() => {
    const interval = setInterval(() => {
      setMacros((prev) => ({
        protein: Math.min(prev.protein + 10, goals.protein),
        carbs: Math.min(prev.carbs + 15, goals.carbs),
        fat: Math.min(prev.fat + 5, goals.fat),
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Fetch the user's name
  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await fetch("http://localhost:5000/api/auth/user-profile", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.success) {
          setUserName(data.user.name);
          setLoginStreak(data.user.loginStreak || 0);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, []);

  // calories from local storage
  useEffect(() => {
    const storedCalories = localStorage.getItem("recommendedCalories");
    if (storedCalories) setRecommendedCalories(storedCalories);
  }, []);

  useEffect(() => {
    if (recommendedCalories) {
      setCaloriesPop(true);
      const timer = setTimeout(() => setCaloriesPop(false), 400);
      return () => clearTimeout(timer);
    }
  }, [recommendedCalories]);

  // greeting
  const hour = new Date().getHours();
  let greeting =
    hour < 12
      ? "Good morning,"
      : hour < 18
      ? "Good afternoon,"
      : hour < 22
      ? "Good evening,"
      : "Good night,";

  // logged dishes
  // use this to clear recent log []
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(clearFoods());
  // }, []);
  const loggedDishes = useSelector((state) => state.loggedFoods.loggedfoods);
  console.log(loggedDishes);

  // total calories consumed = sum of macros (you can replace with backend calc)
  const totalConsumed = macros.protein * 4 + macros.carbs * 4 + macros.fat * 9; // kcal formula
  const caloriesLeft = Math.max(recommendedCalories - totalConsumed, 0);
  const progressCalories = recommendedCalories
    ? (caloriesLeft / recommendedCalories) * 100
    : 0;

  // reusable bar
  const MacroBar = ({ icon, label, value, goal, color }) => {
    const progress = Math.min((value / goal) * 100, 100);

    return (
      <div className="flex-1 bg-white p-4 rounded-lg shadow-md text-center">
        <img src={icon} alt={label} className="w-5 h-5 mx-auto" />
        <p className="text-xs text-gray-500">{label} left</p>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mt-2">
          <motion.div
            className={`h-3 rounded-full ${color}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10,
            }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-2">
          {value}/{goal}g
        </p>
      </div>
    );
  };

  return (
    <div className="pt-5 px-4 bg-white min-h-screen text-black">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col ">
          <h2 className="text-xl font-semibold text-gray-500">{greeting}</h2>
          <div className="text-xl font-semibold mt-2 text-gray-800 mb-2">
            {userName || "No name found"}
          </div>
        </div>
        <Streaks />
      </div>

      {/* days */}
      <div className="flex gap-4 text-gray-500 mb-4">
        {["today", "yesterday"].map((day) => (
          <button
            key={day}
            className={`font-semibold capitalize cursor-pointer ${
              selectedDay === day
                ? "bg-yellow-400 text-white px-3 py-1 rounded-full text-sm"
                : ""
            }`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      {selectedDay === "today" ? (
        <>
          <div>
            {/* Calories Card */}
            <div className="mt-4 bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h3
                  className={`text-2xl font-bold transition-transform duration-300 ${
                    caloriesPop ? "scale-125" : ""
                  }`}
                  style={{ display: "inline-block" }}
                >
                  {caloriesLeft}
                </h3>
                <p className="text-gray-500 text-sm">Calories left</p>
              </div>

              {/* Circle Tracker */}
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#a3a3a3ff"
                    strokeWidth="6"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#FFB200"
                    strokeWidth="6"
                    fill="transparent"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: 226, strokeDashoffset: 226 }}
                    animate={{
                      strokeDasharray: 226,
                      strokeDashoffset: 226 - (226 * progressCalories) / 100,
                    }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                </svg>
                <img
                  src={StreakIcon}
                  alt="Streak"
                  className="absolute w-8 h-8"
                />
              </div>
            </div>

            {/* Macros */}
            <div className="mt-4 flex gap-3">
              <MacroBar
                icon={FishIcon}
                label="Protein"
                value={macros.protein}
                goal={goals.protein}
                color="bg-blue-500"
              />
              <MacroBar
                icon={CarbIcon}
                label="Carbs"
                value={macros.carbs}
                goal={goals.carbs}
                color=" bg-green-500"
              />
              <MacroBar
                icon={FatIcon}
                label="Fat"
                value={macros.fat}
                goal={goals.fat}
                color="bg-red-500"
              />
            </div>
          </div>

          {/* Recent Log */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-center">Recent logged</h3>
            <div className="bg-white p-4 rounded-lg mt-2 text-center text-gray-500 text-sm">
              {loggedDishes.length <= 0
                ? "No food logged yet."
                : loggedDishes.map((dish) => (
                    <FoodLog dish={dish} key={dish._id} />
                  ))}
            </div>
          </div>
        </>
      ) : (
        "No recorded data"
      )}
    </div>
  );
};

export default ProfileHome;
