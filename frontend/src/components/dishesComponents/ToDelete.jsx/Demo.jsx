import React, { useMemo, useState } from "react";

/**
 * Nutrition Logger – Ghanaian Meals (React Demo)
 * -------------------------------------------------
 * - Pure React + TailwindCSS UI (no external UI libs required)
 * - Hard-coded foods/dishes representative of Ghanaian meals
 * - "Base + Add‑ons" model with dynamic macro calculation
 * - Portion presets map bowls/grams; add‑ons support piece/ladle/etc.
 * - Mock "save" to local state to illustrate logging flow
 */

// --- Hard Data --------------------------------------------------------------

// Base foods: values are per 100g to allow gram-based scaling
const BASE_FOODS = [
  {
    id: "wakye",
    name: "Wakye (Rice + Beans)",
    unitType: "gram", // base measured by grams
    per100g: { calories: 130, protein: 4, carbs: 28, fat: 1 },
    bowlPresets: [
      { label: "½ bowl", grams: 150 },
      { label: "1 bowl", grams: 250 },
      { label: "1½ bowls", grams: 350 },
      { label: "2 bowls", grams: 500 },
    ],
  },
  {
    id: "jollof",
    name: "Jollof Rice",
    unitType: "gram",
    per100g: { calories: 140, protein: 3, carbs: 30, fat: 3 },
    bowlPresets: [
      { label: "½ bowl", grams: 150 },
      { label: "1 bowl", grams: 250 },
      { label: "1½ bowls", grams: 350 },
      { label: "2 bowls", grams: 500 },
    ],
  },
  {
    id: "banku",
    name: "Banku",
    unitType: "gram",
    per100g: { calories: 140, protein: 2.4, carbs: 32, fat: 0.8 },
    bowlPresets: [
      { label: "Small", grams: 200 },
      { label: "Medium", grams: 300 },
      { label: "Large", grams: 450 },
    ],
  },
];

// Add‑ons: each item defines how ONE unit is measured (piece/ladle/etc.)
const ADDONS = [
  {
    id: "egg",
    name: "Boiled Egg",
    unitLabel: "piece",
    unitSize: 1, // one piece
    perUnit: { calories: 78, protein: 6, carbs: 0.6, fat: 5 },
  },
  {
    id: "friedFish",
    name: "Fried Fish (tilapia)",
    unitLabel: "piece (~100g)",
    unitSize: 1,
    perUnit: { calories: 200, protein: 30, carbs: 0, fat: 10 },
  },
  {
    id: "stew",
    name: "Tomato Stew",
    unitLabel: "ladle (50g)",
    unitSize: 1,
    perUnit: { calories: 60, protein: 1, carbs: 3, fat: 4 },
  },
  {
    id: "shito",
    name: "Shito",
    unitLabel: "spoon (15g)",
    unitSize: 1,
    perUnit: { calories: 45, protein: 0, carbs: 2, fat: 4 },
  },
  {
    id: "chicken",
    name: "Chicken (stewed)",
    unitLabel: "piece (~100g)",
    unitSize: 1,
    perUnit: { calories: 165, protein: 26, carbs: 0, fat: 6 },
  },
];

// Daily goals for progress bars (hard-coded demo)
const DAILY_GOALS = {
  calories: 2500,
  protein: 120,
  carbs: 300,
  fat: 70,
};

// --- Helpers ----------------------------------------------------------------
function round1(n) {
  return Math.round(n * 10) / 10;
}

function calcBaseMacros(baseId, grams) {
  const base = BASE_FOODS.find((b) => b.id === baseId);
  if (!base || !grams) return { calories: 0, protein: 0, carbs: 0, fat: 0 };
  const factor = grams / 100;
  const { calories, protein, carbs, fat } = base.per100g;
  return {
    calories: calories * factor,
    protein: protein * factor,
    carbs: carbs * factor,
    fat: fat * factor,
  };
}

function sumMacros(items) {
  return items.reduce(
    (acc, n) => ({
      calories: acc.calories + (n.calories || 0),
      protein: acc.protein + (n.protein || 0),
      carbs: acc.carbs + (n.carbs || 0),
      fat: acc.fat + (n.fat || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

function Bar({ label, value, goal }) {
  const pct = Math.min(100, Math.round((value / goal) * 100));
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-slate-600">{label}</span>
        <span className="font-medium">
          {round1(value)} / {goal}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-slate-900"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// --- UI ---------------------------------------------------------------------
export default function NutritionLoggerDemo() {
  const [selectedBaseId, setSelectedBaseId] = useState("wakye");
  const [selectedGrams, setSelectedGrams] = useState(250); // default 1 bowl
  const [addonCounts, setAddonCounts] = useState({ egg: 1, stew: 1 });
  const [loggedMeals, setLoggedMeals] = useState([]);

  const base = useMemo(
    () => BASE_FOODS.find((b) => b.id === selectedBaseId),
    [selectedBaseId]
  );

  // Calculate totals
  const baseMacros = useMemo(
    () => calcBaseMacros(selectedBaseId, selectedGrams),
    [selectedBaseId, selectedGrams]
  );

  const addonMacros = useMemo(() => {
    const lines = Object.entries(addonCounts).map(([addonId, qty]) => {
      const a = ADDONS.find((x) => x.id === addonId);
      if (!a || qty <= 0) return null;
      return {
        id: addonId,
        name: a.name,
        qty,
        macros: {
          calories: a.perUnit.calories * qty,
          protein: a.perUnit.protein * qty,
          carbs: a.perUnit.carbs * qty,
          fat: a.perUnit.fat * qty,
        },
      };
    });
    return lines.filter(Boolean);
  }, [addonCounts]);

  const totals = useMemo(() => {
    const addSum = sumMacros(addonMacros.map((l) => l.macros));
    return {
      calories: baseMacros.calories + addSum.calories,
      protein: baseMacros.protein + addSum.protein,
      carbs: baseMacros.carbs + addSum.carbs,
      fat: baseMacros.fat + addSum.fat,
    };
  }, [baseMacros, addonMacros]);

  const handlePreset = (g) => setSelectedGrams(g);

  const setAddon = (id, next) => {
    setAddonCounts((prev) => ({ ...prev, [id]: Math.max(0, next) }));
  };

  const resetAll = () => {
    setSelectedBaseId("wakye");
    setSelectedGrams(250);
    setAddonCounts({ egg: 1, stew: 1 });
  };

  const logMeal = () => {
    const meal = {
      time: new Date().toISOString(),
      base: { id: selectedBaseId, name: base?.name, grams: selectedGrams },
      addons: addonMacros.map(({ id, name, qty }) => ({ id, name, qty })),
      totals,
    };
    setLoggedMeals((m) => [meal, ...m].slice(0, 6)); // keep last 6
  };

  // Demo daily progress (sum of logged meals in this session)
  const daySums = useMemo(
    () => sumMacros(loggedMeals.map((m) => m.totals)),
    [loggedMeals]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl p-6 md:p-10">
        <header className="mb-8 flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Nutrition Logger – Ghanaian Meals
          </h1>
          <p className="text-slate-600 max-w-2xl">
            Pick a <span className="font-medium">base</span> (e.g., Wakye),
            choose a portion, then add eggs, fish, stew, etc. Totals update
            instantly and you can log the meal.
          </p>
        </header>

        {/* Base selector and presets */}
        <section className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            {/* base food */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-lg font-semibold">1) Choose Base</h2>
              <div className="flex flex-wrap gap-2">
                {BASE_FOODS.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBaseId(b.id)}
                    className={`rounded-xl border px-3 py-2 text-sm transition ${
                      selectedBaseId === b.id
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <h3 className="mb-2 text-sm font-medium text-slate-700">
                  Portion presets for {base?.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {base?.bowlPresets.map((p) => (
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
            </div>
            {/* add on */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-lg font-semibold">2) Add‑ons</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ADDONS.map((a) => {
                  const count = addonCounts[a.id] || 0;
                  return (
                    <div
                      key={a.id}
                      className="flex items-center justify-between rounded-xl border border-slate-200 p-3"
                    >
                      <div>
                        <div className="font-medium">{a.name}</div>
                        <div className="text-xs text-slate-500">
                          {a.unitLabel}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setAddon(a.id, count - 1)}
                          className="h-8 w-8 rounded-lg border border-slate-200 hover:bg-slate-50"
                          aria-label={`decrease ${a.name}`}
                        >
                          −
                        </button>
                        <div className="w-8 text-center font-medium">
                          {count}
                        </div>
                        <button
                          onClick={() => setAddon(a.id, count + 1)}
                          className="h-8 w-8 rounded-lg border border-slate-200 hover:bg-slate-50"
                          aria-label={`increase ${a.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Live totals card */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-2 text-lg font-semibold">3) Meal Summary</h2>
              <div className="text-sm text-slate-600">
                <div>
                  <span className="font-medium">Base:</span> {base?.name} ·{" "}
                  {selectedGrams}g
                </div>
                {addonMacros.length > 0 && (
                  <div className="mt-1">
                    <span className="font-medium">Add‑ons:</span>{" "}
                    {addonMacros.map((l) => `${l.name} × ${l.qty}`).join(", ")}
                  </div>
                )}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                <Stat
                  label="Calories"
                  value={round1(totals.calories)}
                  suffix="kcal"
                />
                <Stat
                  label="Protein"
                  value={round1(totals.protein)}
                  suffix="g"
                />
                <Stat label="Carbs" value={round1(totals.carbs)} suffix="g" />
                <Stat label="Fat" value={round1(totals.fat)} suffix="g" />
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={logMeal}
                  className="flex-1 rounded-xl bg-slate-900 px-4 py-2 text-white shadow-sm transition hover:bg-slate-800"
                >
                  Log this meal
                </button>
                <button
                  onClick={resetAll}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 transition hover:border-slate-300"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-base font-semibold">
                Today's Progress (demo)
              </h3>
              <div className="space-y-3">
                <Bar
                  label="Calories (kcal)"
                  value={daySums.calories}
                  goal={DAILY_GOALS.calories}
                />
                <Bar
                  label="Protein (g)"
                  value={daySums.protein}
                  goal={DAILY_GOALS.protein}
                />
                <Bar
                  label="Carbs (g)"
                  value={daySums.carbs}
                  goal={DAILY_GOALS.carbs}
                />
                <Bar
                  label="Fat (g)"
                  value={daySums.fat}
                  goal={DAILY_GOALS.fat}
                />
              </div>
            </div>
          </aside>
        </section>

        {/* Logged meals history */}
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold">Recently Logged</h2>
          {loggedMeals.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-slate-500">
              No meals yet. Log one to see it here.
            </div>
          ) : (
            <div className="grid gap-3">
              {loggedMeals.map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm text-slate-600">
                      <span className="font-medium">{m.base.name}</span> ·{" "}
                      {m.base.grams}g
                      {m.addons?.length ? (
                        <>
                          {" "}
                          · Add‑ons:{" "}
                          {m.addons
                            .map((a) => `${a.name} × ${a.qty}`)
                            .join(", ")}
                        </>
                      ) : null}
                    </div>
                    <div className="text-sm font-medium">
                      {round1(m.totals.calories)} kcal · P{" "}
                      {round1(m.totals.protein)}g · C {round1(m.totals.carbs)}g
                      · F {round1(m.totals.fat)}g
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <footer className="mt-10 text-center text-xs text-slate-500">
          Demo data are estimates for illustration, not medical advice.
        </footer>
      </div>
    </div>
  );
}

function Stat({ label, value, suffix }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="text-xl font-semibold">
        {value}{" "}
        <span className="text-sm font-medium text-slate-500">{suffix}</span>
      </div>
    </div>
  );
}

{
  /* <div className="flex-1 bg-white p-4 rounded-lg shadow-md text-center">
  <img src={FatIcon} alt="Fat" className="w-5 h-5 mx-auto" />
  <p className="text-xs text-gray-500">Fat left</p>
  <p className="h-1 mt-2 bg-gray-200 w-full "></p>
</div>; */
}

{
  /* Micros*/
}
//   <div className="mt-6 p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
//     <h2 className="text-xl font-semibold mb-3 text-gray-800">
//       Micros Nutrients
//     </h2>

//     {/* Header row */}
//     <div className="flex justify-between items-center bg-[#e3e4e8] rounded-3xl px-4 py-2 mb-2">
//       <p className="text-sm font-medium text-gray-600">Nutrient</p>
//       <p className="text-lg font-semibold text-gray-800">Value</p>
//     </div>

//     {/* Dynamic list of all micro nutrients */}
//     {[{ nutrient: protein }, { nutrient: carbs }, { nutrient: fat }].map(
//       ({ nutrient }) => (
//         <div
//           key={nutrient.name}
//           className="flex justify-between items-center px-4 py-2 border-b border-gray-200"
//         >
//           <p className="text-sm text-gray-600">{nutrient.name}</p>
//           <p className="text-lg font-semibold text-gray-800">
//             {nutrient.amount} {nutrient.unit}
//           </p>
//         </div>
//       )
//     )}
//   </div>;
