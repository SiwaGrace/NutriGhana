import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StreakIcon from "../assets/logoicons/streakIcon.svg";
import { setStreak } from "../slices/streakSlice";
import { saveStreakToLocal, getStreakFromLocal } from "../utils/streakStorage";
import toast, { Toaster } from "react-hot-toast";

const Streaks = () => {
  const streak = useSelector((state) => state.streak);
  const dispatch = useDispatch();
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split("T")[0];
    const localStreak = getStreakFromLocal();

    if (!localStreak) {
      const initial = { count: 1, lastLoggedDate: today };
      saveStreakToLocal(initial);
      dispatch(setStreak(initial));
      toast.success("🔥 You're on a 1-day streak! Keep it up!");
    } else {
      if (localStreak.lastLoggedDate === today) {
        dispatch(setStreak(localStreak));
      } else if (localStreak.lastLoggedDate === yesterday) {
        // 🔁 Reset after 7 del
        let newCount = localStreak.count + 1;
        // if (newCount > 7) newCount = 1;

        const updated = {
          count: newCount,
          lastLoggedDate: today,
        };
        saveStreakToLocal(updated);
        dispatch(setStreak(updated));
        // 🎉 Weekly visual cue
        if (newCount % 7 === 0) {
          const weekNum = newCount / 7;
          toast.success(
            `🎉 Week ${weekNum} complete! Starting Week ${weekNum + 1}...`,
            {
              duration: 6000,
              style: {
                background: "#d1fae5", // green-100
                color: "#065f46", // green-800
                fontWeight: "bold",
                borderRadius: "8px",
                padding: "12px 16px",
              },
            },
          );
        } else {
          toast.success(
            `🔥 You're on a ${updated.count}-day streak! Keep it up!`,
          );
        }
      } else {
        const reset = { count: 1, lastLoggedDate: today };
        saveStreakToLocal(reset);
        dispatch(setStreak(reset));
        toast("🔁 Streak reset. Start fresh today Day 1!");
      }
    }
  }, [dispatch]);

  const handleClick = () => {
    setShowProgress((prev) => !prev);
  };

  const renderDays = () => {
    const currentDayInWeek = (streak.count - 1) % 7; // 0-based index

    return Array.from({ length: 7 }, (_, index) => {
      const active = index <= currentDayInWeek;
      return (
        <div key={index} className="flex flex-col items-center mx-1">
          <div
            className={`w-6 h-6 rounded-full text-sm flex items-center justify-center font-bold ${
              active ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-400"
            }`}
          >
            🔥
          </div>
          <span className="text-[10px] text-gray-500 mt-1">
            Day {index + 1}
          </span>
        </div>
      );
    });
  };

  return (
    <>
      <Toaster />
      <div className="relative">
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={handleClick}
        >
          <img src={StreakIcon} alt="Fire" className="w-5 h-5" />
          <span className="text-gray-500 text-sm">{streak.count}</span>
        </div>

        {showProgress && (
          <div className="absolute top-8 right-0 bg-yellow-50 border border-yellow-200 rounded-md shadow-sm flex flex-wrap justify-between w-64 sm:w-72 md:w-80 p-3 z-50 fade-in">
            {renderDays()}
          </div>
        )}
      </div>
      {/* del try streak*/}
      {/* <button
        onClick={() => {
          // Simulate a new day manually by adding 1 to streak count
          const newCount = streak.count + 1;
          const fakeToday = new Date();
          fakeToday.setDate(fakeToday.getDate() + 1);
          const newDate = fakeToday.toISOString().split("T")[0];

          const updated = { count: newCount, lastLoggedDate: newDate };

          saveStreakToLocal(updated);
          dispatch(setStreak(updated));

          toast.success(`🔥 You're testing day ${newCount}`, {
            duration: 4000,
          });
        }}
        className="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Test Next Day
      </button> */}
    </>
  );
};

export default Streaks;
