import React from "react";
import FishIcon from "../../assets/logo&icons/fa-solid_fish.svg";
import CarbIcon from "../../assets/logo&icons/fluent_food-grains-20-filled.svg";
import FatIcon from "../../assets/logo&icons/game-icons_fat.svg";

const NumberofServings = ({
  servings,
  measurement,
  setMeasurement,
  setServings,
  onLog,
  isLogged,
  calories,
  protein,
  fat,
  carbs,
}) => {
  return (
    <div className="mb-4">
      {" "}
      <p className=" mb-2 text-xl font-bold">Measurement</p>
      <div className="flex space-x-2 mb-4">
        {["Bowl", "Balls", "Pcs"].map((option) => (
          <button
            key={option}
            className={`px-4 py-2 rounded-full cursor-pointer ${
              measurement === option
                ? "bg-yellow-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setMeasurement(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {/* Number of Servings */}
      <div className="mb-4 flex justify-between">
        <p className="text-gray-500 ">Number of servings</p>
        <input
          type="number"
          value={servings}
          min="1"
          className="w-16 text-center border rounded-4xl"
          onChange={(e) => setServings(Number(e.target.value))}
        />
      </div>
      {/* nutritions */}
      <div className="p-4">
        <p className=" mb-2 text-xl font-bold text-center">Food Nutritions</p>
        {/* Macros */}
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Micros Nutrients
          </h2>
          {/* Calories Card */}
          <div className="p-4 rounded-lg shadow-md mb-4 bg-base-100 flex space-x-4">
            <span className="text-xl border-3 border-gray-400 p-3 rounded-[100%]">
              🔥
            </span>

            <div>
              <p className="text-2xl font-semibold">
                {calories.amount} {calories.unit}
              </p>
              <p className="text-gray-500">{calories.name}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            {[
              { icon: FishIcon, nutrient: protein },
              { icon: CarbIcon, nutrient: carbs },
              { icon: FatIcon, nutrient: fat },
            ].map(({ icon, nutrient }) => (
              <div
                key={nutrient.name}
                className="flex-1 bg-white p-3 rounded-lg shadow-md text-center"
              >
                <img
                  src={icon}
                  alt={nutrient.name}
                  className="w-5 h-5 mx-auto"
                />
                <p className="text-xs text-gray-500">{nutrient.name}</p>
                <p>
                  {nutrient.amount}
                  {nutrient.unit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Log Button */}
      <button
        className="w-[80%] block  mx-auto bg-yellow-500 text-white py-3 rounded-full text-lg mt-10 cursor-pointer"
        onClick={() => onLog()}
      >
        {isLogged ? "Food Logged" : "Log"}
      </button>
    </div>
  );
};

export default NumberofServings;
