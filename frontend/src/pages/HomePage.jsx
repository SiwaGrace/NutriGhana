import React, { useState } from "react";
import FishIcon from "../assets/logo&icons/fa-solid_fish.svg";
import CarbIcon from "../assets/logo&icons/fluent_food-grains-20-filled.svg";
import FatIcon from "../assets/logo&icons/game-icons_fat.svg";
import StreakIcon from "../assets/logo&icons/streakIcon.svg";
import FoodLog from "../components/FoodLogCard";

const ProfileHome = () => {
  const [selectedDay, setSelectedDay] = useState("today");
  return (
    <div className="pt-24 px-4 bg-white min-h-screen text-black">
      {/* Header */}
      {/* <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-500">
          Good morning, <span className="font-bold text-black">Pokuaa</span>
        </h2>
        <div className="flex items-center gap-1">
          <img src={StreakIcon} alt="Fire" className="w-5 h-5" />
          <span className="text-gray-500 text-sm">0</span>
        </div>
      </div> */}
      {/* days */}
      <div className="flex gap-4 text-gray-500 mb-4">
        {["today", "yesterday"].map((day) => (
          <button
            key={day}
            className={`font-semibold capitalize cursor-pointer ${
              selectedDay === day ? "text-black underline" : ""
            }`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mt-4">
        <button className="bg-yellow-400 text-white px-3 py-1 rounded-full text-sm">
          Today
        </button>
        <button className="text-gray-500 text-sm">yesterday</button>
      </div>

      {/* Calories Card */}
      <div className="mt-4 bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">9989</h3>
          <p className="text-gray-500 text-sm">Calories left</p>
        </div>
        <div className="w-16 h-16 flex items-center justify-center rounded-full border-4 border-gray-200">
          <img src={StreakIcon} alt="Fire" className="w-6 h-6" />
        </div>
      </div>

      {/* Macros */}
      <div className="mt-4 flex gap-3">
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md text-center">
          <img src={FishIcon} alt="Protein" className="w-5 h-5 mx-auto" />
          <p className="text-xs text-gray-500">Protein left</p>
          <p className="h-1 mt-2 bg-gray-200 w-full"></p>
        </div>
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md text-center">
          <img src={CarbIcon} alt="Carbs" className="w-5 h-5 mx-auto" />
          <p className="text-xs text-gray-500">Carbs left</p>
          <p className="h-1 mt-2 bg-gray-200 w-full"></p>
        </div>
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md text-center">
          <img src={FatIcon} alt="Fat" className="w-5 h-5 mx-auto" />
          <p className="text-xs text-gray-500">Fat left</p>
          <p className="h-1 mt-2 bg-gray-200 w-full "></p>
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
    </div>
  );
};

export default ProfileHome;
