import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoodLogs } from "../redux/foodSlice";
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
  const [selectedPeriod] = useState("Weekly");
  const dispatch = useDispatch();
  const { logs, loading } = useSelector((state) => state.food);

  useEffect(() => {
    dispatch(fetchFoodLogs());
  }, [dispatch]);

  // calculate total calories
  const totalCalories = logs.reduce((acc, day) => acc + (day.calories || 0), 0);

  return (
    <div className="pt-5 px-4 bg-white text-black">
      {/* Title */}
      <h2 className="text-xl font-semibold text-center mb-2">Insights</h2>

      {/* Total Calories & Dropdown */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold">
            {loading ? "Loading..." : totalCalories}
          </p>
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
        {loading ? (
          <p>Loading chart...</p>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={logs}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="protein" fill="#22c55e" />
              <Bar dataKey="carbs" fill="#f43f5e" />
              <Bar dataKey="fat" fill="#facc15" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Goal Achieved (dummy for now) */}
      <p className="text-green-600 font-semibold text-lg mt-4">
        78% Goal Achieved
      </p>

      {/* Nutrition Tips (can be dynamic later) */}
      <h3 className="text-lg font-semibold mt-3">Nutrition Tips</h3>
      <div className="mt-2 space-y-2 text-black font-semibold">
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
