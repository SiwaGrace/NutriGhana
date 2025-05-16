import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";

export default function ProfileStats() {
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");

  const data = [
    { day: "SUN", Protein: 600, Carbs: 800, Fat: 200 },
    { day: "MON", Protein: 700, Carbs: 1000, Fat: 300 },
    { day: "TUE", Protein: 800, Carbs: 1100, Fat: 400 },
    { day: "WED", Protein: 750, Carbs: 950, Fat: 350 },
    { day: "THU", Protein: 820, Carbs: 1050, Fat: 420 },
    { day: "FRI", Protein: 900, Carbs: 1150, Fat: 500 },
    { day: "SAT", Protein: 850, Carbs: 1020, Fat: 450 },
  ];

  return (
    <div className="py-18 px-4">
      {/* Title */}
      <h2 className="text-xl font-semibold text-center mb-2">Insights</h2>

      {/* Total Calories & Dropdown */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold">13702</p>
          <p className="text-gray-500 text-sm">Total Calories</p>
        </div>
        <div className="relative">
          <button className="flex items-center gap-1 bg-yellow-400 text-white px-3 py-1 rounded-md">
            {selectedPeriod} <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-lg shadow-md p-4 mt-4">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Protein" fill="#22c55e" />
            <Bar dataKey="Carbs" fill="#f43f5e" />
            <Bar dataKey="Fat" fill="#facc15" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Goal Achieved */}
      <p className="text-green-600 font-semibold text-lg mt-4">
        78% Goal Achieved
      </p>

      {/* Nutrition Tips */}
      <h3 className="text-lg font-semibold mt-3">Nutrition Tips</h3>
      <div className="mt-2 space-y-2">
        {[
          "You're low on protein, try adding more beans this week!",
          "Your carbs are high, swap some rice for boiled yam.",
          "It’s market day, grab some fresh fish to up your protein!",
        ].map((tip, index) => (
          <div key={index} className="bg-gray-100 p-3 rounded-md text-sm">
            {tip}
          </div>
        ))}
      </div>
    </div>
  );
}
