import React, { useMemo, useState } from "react";
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
  selectedDish,
  addOnQuantities,
  setAddOnQuantities,
  ADD_ONS,
  total,
  selectedGrams,
  setSelectedGrams,
}) => {
  const handlePreset = (grams) => setSelectedGrams(grams);

  const incrementAddOn = (id) => {
    setAddOnQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decrementAddOn = (id) => {
    setAddOnQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, prev[id] - 1),
    }));
  };

  const resetMeal = () => {
    setSelectedGrams(250); // back to 1 bowl default
    setAddOnQuantities(
      ADD_ONS.reduce((acc, addOn) => {
        acc[addOn.id] = 0;
        return acc;
      }, {})
    );
  };

  return (
    <div className="mb-4">
      {" "}
      <p className=" mb-2 text-xl font-bold">Measurement</p>
      {/* Bowl Presets */}
      <div className="p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">
          Portion presets for {selectedDish.title}
        </h2>
        <div className="flex flex-wrap gap-2">
          {selectedDish.bowlPresets.map((p) => (
            <button
              key={p.label}
              onClick={() => handlePreset(p.grams)}
              className={`rounded-xl border px-3 py-2 text-sm transition ${
                selectedGrams === p.grams
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              {p.label} · {p.grams}g
            </button>
          ))}
        </div>

        {/* Custom grams */}
        <div className="mt-3 flex items-center gap-3">
          <label className="text-sm text-slate-600">Custom grams</label>
          <input
            type="number"
            min={0}
            value={selectedGrams}
            onChange={(e) =>
              setSelectedGrams(parseInt(e.target.value || "0", 10))
            }
            className="w-32 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
          />
        </div>
      </div>
      {/* Add-ons */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-3">Add-ons</h2>
        <div className="space-y-2">
          {ADD_ONS.map((addOn) => (
            <div
              key={addOn.id}
              className="flex items-center justify-between gap-2 border rounded-lg px-4 py-2 bg-gray-100"
            >
              <div>
                <p className="font-semibold">{addOn.name}</p>
                <p className="text-xs text-gray-500">{addOn.unitLabel}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decrementAddOn(addOn.id)}
                  className="w-6 h-6 rounded-full bg-gray-300 text-center"
                >
                  -
                </button>
                <span className="w-6 text-center">
                  {addOnQuantities[addOn.id]}
                </span>
                <button
                  onClick={() => incrementAddOn(addOn.id)}
                  className="w-6 h-6 rounded-full bg-gray-300 text-center"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Meal Summary */}
      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-bold">Meal Summary</h2>
        <div className="grid grid-cols-2 gap-3 text-center">
          {Object.entries(total).map(([name, value]) => (
            <div key={name} className="p-2 bg-gray-50 rounded-lg">
              <p className="font-bold">{Math.round(value)}</p>
              <p className="text-sm text-gray-500">{name}</p>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 justify-between">
          <button
            className="flex-1 rounded-lg bg-green-600 text-white py-2 font-medium hover:bg-green-700"
            onClick={() => onLog()}
          >
            Log Meal
          </button>
          <button
            onClick={resetMeal}
            className="flex-1 rounded-lg bg-gray-300 text-gray-800 py-2 font-medium hover:bg-gray-400"
          >
            Reset
          </button>
        </div>
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
      {/* <button
        className="w-[80%] block  mx-auto bg-yellow-500 text-white py-3 rounded-full text-lg mt-10 cursor-pointer"
        onClick={() => onLog()}
      >
        {isLogged ? "Food Logged" : "Log"}
      </button> */}
    </div>
  );
};

export default NumberofServings;
