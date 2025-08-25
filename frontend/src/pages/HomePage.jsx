import React, { useState, useEffect } from "react";
import FishIcon from "../assets/logo&icons/fa-solid_fish.svg";
import CarbIcon from "../assets/logo&icons/fluent_food-grains-20-filled.svg";
import FatIcon from "../assets/logo&icons/game-icons_fat.svg";
import StreakIcon from "../assets/logo&icons/streakIcon.svg";
import FoodLog from "../components/FoodLogCard";
import Streaks from "../components/Streaks";

const ProfileHome = () => {
  const [userName, setUserName] = useState(""); // add userName state
  const [selectedDay, setSelectedDay] = useState("today");
  const [recommendedCalories, setRecommendedCalories] = useState(null);
  const [caloriesPop, setCaloriesPop] = useState(false);
  const [loginStreak, setLoginStreak] = useState(0);

  // Fetch the user's name from the backend
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
          setLoginStreak(data.user.loginStreak || 0); // get streak from backend
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Optionally handle error
      }
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    const storedCalories = localStorage.getItem("recommendedCalories");
    if (storedCalories) setRecommendedCalories(storedCalories);
  }, []);

  // Animate calories card when value changes
  useEffect(() => {
    if (recommendedCalories) {
      setCaloriesPop(true);
      const timer = setTimeout(() => setCaloriesPop(false), 400);
      return () => clearTimeout(timer);
    }
  }, [recommendedCalories]);

  return (
    <div className="pt-24 px-4 bg-white min-h-screen text-black">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col ">
          <h2 className="text-xl font-semibold text-gray-500">Good morning,</h2>
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
      {/* depends on selected day */}
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
              {recommendedCalories ? recommendedCalories : "—"}
            </h3>
            <p className="text-gray-500 text-sm">Calories left</p>
          </div>
          <div className="w-16 h-16 flex flex-col items-center justify-center rounded-full border-4 border-gray-200">
            <img src={StreakIcon} alt="Streak" className="w-6 h-6" />
            <span className="text-xs font-bold text-yellow-500 mt-1">
              {loginStreak}d
            </span>
          </div>
        </div>

        {/* Macros */}
        <div className="mt-4 flex gap-3">
          <div className="flex-1 bg-white p-4 rounded-lg shadow-md text-center transform transition-transform hover:scale-105">
            <img src={FishIcon} alt="Protein" className="w-5 h-5 mx-auto" />
            <p className="text-xs text-gray-500">Protein left</p>
            <p className="h-1 mt-2 bg-gray-200 w-full"></p>
          </div>
          <div className="flex-1 bg-white p-4 rounded-lg shadow-md text-center transform transition-transform hover:scale-105">
            <img src={CarbIcon} alt="Carbs" className="w-5 h-5 mx-auto" />
            <p className="text-xs text-gray-500">Carbs left</p>
            <p className="h-1 mt-2 bg-gray-200 w-full"></p>
          </div>
          <div className="flex-1 bg-white p-4 rounded-lg shadow-md text-center transform transition-transform hover:scale-105">
            <img src={FatIcon} alt="Fat" className="w-5 h-5 mx-auto" />
            <p className="text-xs text-gray-500">Fat left</p>
            <p className="h-1 mt-2 bg-gray-200 w-full "></p>
          </div>
        </div>
      </div>

      {/* Recent Log */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold">Recent logged</h3>
        <div className="bg-white p-4 rounded-lg shadow-md mt-2 text-center text-gray-500 text-sm">
          No food logged yet.
        </div>
        <FoodLog />
      </div>
      {/* Add this style for the pop animation if not using Tailwind CSS v3+ */}
      <style>
        {`
          .scale-125 {
            transform: scale(1.25);
          }
        `}
      </style>
    </div>
  );
};

export default ProfileHome;
