import { useState, useMemo } from "react";

// Updated Add-ons
const ADD_ONS = [
  {
    id: "friedFish",
    name: "Fried Fish (tilapia)",
    unitLabel: "piece (~100g)",
    perUnit: { calories: 200, protein: 30, carbs: 0, fat: 10 },
  },
  {
    id: "chicken",
    name: "Chicken Leg",
    unitLabel: "piece (~100g)",
    perUnit: { calories: 165, protein: 26, carbs: 0, fat: 6 },
  },
  {
    id: "egg",
    name: "Boiled Egg",
    unitLabel: "piece",
    perUnit: { calories: 78, protein: 6, carbs: 0.6, fat: 5 },
  },
];

// Mock dish (per 1 Bowl)
const WAKYE = {
  name: "Wakye (Rice + Beans)",
  nutrientsPerBowl: { calories: 400, protein: 10, carbs: 70, fat: 5 },
  bowlPresets: [
    { label: "½ bowl", grams: 150 },
    { label: "1 bowl", grams: 250 },
    { label: "1½ bowls", grams: 350 },
    { label: "2 bowls", grams: 500 },
  ],
};

export default function MealBuilder() {
  const [selectedGrams, setSelectedGrams] = useState(250);
  const [addOnQuantities, setAddOnQuantities] = useState(
    ADD_ONS.reduce((acc, addOn) => {
      acc[addOn.id] = 0;
      return acc;
    }, {})
  );

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

  const logMeal = () => {
    console.log("Meal logged:", {
      dish: WAKYE.name,
      grams: selectedGrams,
      addOns: addOnQuantities,
      total,
    });
    alert("Meal logged! (check console)");
  };

  // Base totals (scaled by grams / 250g per bowl)
  const baseTotals = useMemo(() => {
    const factor = selectedGrams / 250;
    return {
      calories: WAKYE.nutrientsPerBowl.calories * factor,
      protein: WAKYE.nutrientsPerBowl.protein * factor,
      carbs: WAKYE.nutrientsPerBowl.carbs * factor,
      fat: WAKYE.nutrientsPerBowl.fat * factor,
    };
  }, [selectedGrams]);

  // Add-ons totals
  const addOnTotals = useMemo(() => {
    return ADD_ONS.reduce(
      (acc, addOn) => {
        const qty = addOnQuantities[addOn.id] || 0;
        acc.calories += addOn.perUnit.calories * qty;
        acc.protein += addOn.perUnit.protein * qty;
        acc.carbs += addOn.perUnit.carbs * qty;
        acc.fat += addOn.perUnit.fat * qty;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [addOnQuantities]);

  const total = {
    calories: baseTotals.calories + addOnTotals.calories,
    protein: baseTotals.protein + addOnTotals.protein,
    carbs: baseTotals.carbs + addOnTotals.carbs,
    fat: baseTotals.fat + addOnTotals.fat,
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      {/* Bowl Presets */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">
          Portion presets for {WAKYE.name}
        </h2>
        <div className="flex flex-wrap gap-2">
          {WAKYE.bowlPresets.map((p) => (
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
            onClick={logMeal}
            className="flex-1 rounded-lg bg-green-600 text-white py-2 font-medium hover:bg-green-700"
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
    </div>
  );
}
