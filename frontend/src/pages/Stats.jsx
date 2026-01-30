import { useEffect, useState } from "react";
import axios from "axios";
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
  const [data, setData] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay(); // Sunday = 0
    d.setDate(d.getDate() - day);
    return d;
  };

  useEffect(() => {
    const fetchLogs = async () => {
      const apiUrl = import.meta.env.VITE_BACKEND_URL;
      try {
        const res = await axios.get(`${apiUrl}/api/logstats`, {
          withCredentials: true,
        });
        const logs = res.data;

        const weekStart = getWeekStart(new Date());

        // Aggregate per day for this week
        const weekData = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
          (day, index) => {
            const currentDate = new Date(weekStart);
            currentDate.setDate(weekStart.getDate() + index);
            const dateStr = currentDate.toISOString().split("T")[0];

            const dayLogs = logs.filter((log) => {
              const logDate = new Date(log.date).toISOString().split("T")[0];
              return logDate === dateStr;
            });

            const totals = dayLogs.reduce(
              (acc, log) => {
                acc.Protein += log.totals?.protein || 0;
                acc.Carbs += log.totals?.carbs || 0;
                acc.Fat += log.totals?.fat || 0;
                return acc;
              },
              { Protein: 0, Carbs: 0, Fat: 0 }
            );

            return { day, ...totals };
          }
        );

        // Weekly total calories
        const totalCals = logs.reduce((acc, log) => {
          log.foods.forEach((food) => {
            acc += food.total?.calories || 0;
          });
          return acc;
        }, 0);

        setData(weekData);
        setTotalCalories(totalCals);
      } catch (err) {
        console.error("Error fetching logs:", err);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="pt-5 px-4 bg-white text-black">
      <h2 className="text-xl font-semibold text-center mb-2">Insights</h2>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold">7264</p>
          <p className="text-gray-500 text-sm">Total Calories</p>
        </div>
        <div className="relative">
          <button className="flex items-center gap-1 bg-yellow-400 text-white px-3 py-1 rounded-md">
            {selectedPeriod} <ChevronDown size={16} />
          </button>
        </div>
      </div>

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
      <div className="mt-2 space-y-2 text-black font-semibold ">
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
