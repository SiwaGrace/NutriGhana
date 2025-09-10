import React, { useMemo, useState } from "react";
import FishIcon from "../../assets/logo&icons/fa-solid_fish.svg";
import CarbIcon from "../../assets/logo&icons/fluent_food-grains-20-filled.svg";
import FatIcon from "../../assets/logo&icons/game-icons_fat.svg";
import FireIcon from "../../assets/logo&icons/calories-svgrepo-com.svg";

const NumberofServings = ({
  isLogged,
  onLog,
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
  // map nutrients to icons
  const nutrientIcons = {
    calories: FireIcon,
    protein: FishIcon,
    carbs: CarbIcon,
    fat: FatIcon,
  };

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
      <p className=" mb-5 text-center text-3xl font-medium text-orange-400">
        Measurement
      </p>
      <div className="flex flex-col gap-3">
        {/* Bowl Presets */}
        <div>
          <h2 className="mb-3 text-xl font-bold">Portion presets</h2>
          <div className="flex flex-wrap gap-2">
            {selectedDish.bowlPresets.map((p) => (
              <button
                key={p.label}
                onClick={() => handlePreset(p.grams)}
                className={`rounded-[50px] border px-3 py-2 text-sm transition ${
                  selectedGrams === p.grams
                    ? "border-orange-300 bg-orange-400 text-white"
                    : "border-orange-200 bg-white hover:border-orange-300"
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
        <div className="border-y border-gray-300 pb-6">
          <h2 className="text-xl font-bold my-3">Add-ons</h2>
          <div className="space-y-2">
            {ADD_ONS.map((addOn) => (
              <div
                key={addOn.id}
                className="flex items-center justify-between gap-2 border border-green-300 rounded-lg px-4 py-2 bg-gray-100"
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
        <div className="mt-2 space-y-5">
          <h2 className="text-xl font-bold">Meal Summary</h2>
          <div className="grid grid-cols-2 gap-3 text-center">
            {Object.entries(total).map(([name, value]) => (
              <div
                key={name}
                className="p-2 bg-gray-700  text-white rounded-lg"
              >
                <img
                  src={nutrientIcons[name.toLowerCase()]} // match icon to nutrient
                  alt={name}
                  className="w-5 h-5 mx-auto mb-1"
                />
                <p className="font-bold">
                  {Math.round(value)}
                  {name === "calories" ? "kcal" : "g"}
                </p>
                <p className="text-sm text-gray-500">{name}</p>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 justify-between">
            <button
              className="flex-1 rounded-lg bg-yellow-500  text-white py-3 font-medium cursor-pointer"
              onClick={() => onLog()}
            >
              {isLogged ? "Meal Logged" : "Log Meal"}
            </button>
            <button
              onClick={resetMeal}
              className="flex-1 rounded-lg border border-yellow-300 text-gray-800 py-3 font-medium cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberofServings;
