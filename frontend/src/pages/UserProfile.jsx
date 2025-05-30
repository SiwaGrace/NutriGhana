import { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Woman from "../assets/img/woman1.jpg";
import axios from "axios";

export default function ProfileUser() {
  const [mealReminders, setMealReminders] = useState(true);
  const [weeklyTips, setWeeklyTips] = useState(true);
  const [email, setEmail] = useState(""); // <-- add state for email
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // On mount, get email from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
    const fetchProfiles = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/profile");
        setProfiles(data);
      } catch (err) {
        setError("Failed to fetch profiles.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  // Basic goals data
  // const basicGoals = [
  //   { label: "Weight goal", value: "130kg", bdClass: "border-b" },
  //   { label: "Calories goal", value: "13000 Kcal", bdClass: "border-b" },
  // ];

  // Macronutrients data
  // const macros = [
  //   {
  //     label: "Protein",
  //     value: "124 g",
  //     percentage: "30%",
  //     bdClass: "border-b",
  //   },
  //   {
  //     label: "Carbs",
  //     value: "120 g",
  //     percentage: "30%",
  //     bdClass: "border-b",
  //   },
  //   {
  //     label: "Fat",
  //     value: "124 g",
  //     percentage: "30%",
  //     bdClass: "border-b",
  //   },
  // ];

  return (
    <div className="py-24 px-6 flex flex-col items-center">
      {/* Profile Section */}
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
      <img
        src={Woman}
        alt="Profile"
        className="w-24 h-24 rounded-full border-4 border-gray-300 cursor-pointer"
      />
      <h3 className="text-lg font-semibold mt-2">Pokuaa</h3>
      {/* Replace hardcoded email with dynamic email */}
      <p className="text-gray-500">{email || "No email found"}</p>
      <button className="text-red-500 text-sm mt-1 cursor-pointer">
        change email
      </button>

      {/* Total Food Logged */}
      <div className="w-full mt-6">
        <p className="text-lg text-gray-500">Total Food Logged</p>
        <p className="text-3xl font-bold text-gray-300">54</p>
      </div>

      {/* Goals */}
      <div className="p-5 w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Goals</h2>

        <div className="bg-white p-4 shadow-xl rounded-2xl space-y-4">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Profiles</h2>

            {profiles.length === 0 ? (
              <p>No profiles found.</p>
            ) : (
              <div className="grid gap-4">
                {profiles.map((p, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                  >
                    <p>
                      <span className="font-semibold">Gender:</span> {p.gender}
                    </p>
                    <p>
                      <span className="font-semibold">Year of Birth:</span>{" "}
                      {p.year}
                    </p>
                    <p>
                      <span className="font-semibold">Height:</span> {p.height}
                    </p>
                    <p>
                      <span className="font-semibold">Weight:</span> {p.weight}
                    </p>
                    <p>
                      <span className="font-semibold">Activity Level:</span>{" "}
                      {p.activityLevel}
                    </p>
                    <p>
                      <span className="font-semibold">Dietary Goal:</span>{" "}
                      {p.dietaryGoal}
                    </p>
                    <p>
                      <span className="font-semibold">Current Weight:</span>{" "}
                      {p.currentWeight}
                    </p>
                    <p>
                      <span className="font-semibold">Weight Goal:</span>{" "}
                      {p.currentWeightGoal}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Macronutrients section */}
          {/* <div className="space-y-3">
            <h3 className="font-semibold text-gray-700">Macronutrients</h3>

            {macros.map((macro, index) => (
              <div
                key={index}
                className={`flex justify-between items-center ${macro.bdClass} p-3`}
              >
                <div>
                  <span className="font-medium text-gray-900">
                    {macro.label}
                  </span>
                </div>
                <div className="text-right flex items-center gap-2">
                  <span className="font-bold text-gray-400">{macro.value}</span>
                  <span className="text-gray-700">· {macro.percentage}</span>
                  <IoIosArrowForward
                    aria-hidden="true"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>

      {/* Notifications */}
      <div className="w-full mt-6">
        <h3 className="text-lg font-semibold">Notifications</h3>

        {/* Meal Reminders */}
        <div className="flex justify-between items-center mt-3">
          <div>
            <p className="font-semibold">Meal Reminders</p>
            <p className="text-sm text-gray-500">
              Nudges to log your meals and keep your tracking on point!
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={mealReminders}
              onChange={() => setMealReminders(!mealReminders)}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-gray-300 peer-focus:ring-2 peer-focus:ring-yellow-400 rounded-full peer peer-checked:after:translate-x-5 peer-checked:bg-yellow-400 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
          </label>
        </div>

        {/* Weekly Tips */}
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="font-semibold">Weekly Tips</p>
            <p className="text-sm text-gray-500">
              Get personalized tips like adding beans for more protein!
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={weeklyTips}
              onChange={() => setWeeklyTips(!weeklyTips)}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-gray-300 peer-focus:ring-2 peer-focus:ring-yellow-400 rounded-full peer peer-checked:after:translate-x-5 peer-checked:bg-yellow-400 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
          </label>
        </div>
      </div>

      {/* Logout Button */}
      <button className="bg-yellow-400 text-white w-full py-3 rounded-lg text-lg font-semibold mt-8">
        Log out
      </button>
    </div>
  );
}
