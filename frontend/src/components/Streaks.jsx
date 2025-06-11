import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StreakIcon from "../assets/logo&icons/streakIcon.svg";
import { setStreak } from "../slices/streakSlice";
import { saveStreakToLocal, getStreakFromLocal } from "../utils/streakStorage";
import { useEffect } from "react";

import toast from "react-hot-toast";

const Streaks = () => {
  const streak = useSelector((state) => state.streak);
  const dispatch = useDispatch();

  // run only once on mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split("T")[0];

    const localStreak = getStreakFromLocal();

    if (!localStreak) {
      const initial = { count: 1, lastLoggedDate: today };
      saveStreakToLocal(initial);
      dispatch(setStreak(initial));
      toast.success("🔥 You're on a 1-day streak! Keep it up!", {
        duration: 5000,
        style: {
          background: "#fff", // Tailwind yellow-400
          color: "#1f2937", // Tailwind gray-800
          fontWeight: "bold",
          borderRadius: "8px",
          padding: "12px 16px",
        },
      });
    } else {
      if (localStreak.lastLoggedDate === today) {
        dispatch(setStreak(localStreak));
      } else if (localStreak.lastLoggedDate === yesterday) {
        const updated = {
          count: localStreak.count + 1,
          lastLoggedDate: today,
        };
        saveStreakToLocal(updated);
        dispatch(setStreak(updated));
        toast.success(
          `🔥 You're on a ${updated.count}-day streak! Keep it up!`,
          {
            duration: 5000,
            style: {
              background: "#fff", // Tailwind yellow-400
              color: "#1f2937", // Tailwind gray-800
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "12px 16px",
            },
          }
        );
      } else {
        const reset = { count: 1, lastLoggedDate: today };
        saveStreakToLocal(reset);
        dispatch(setStreak(reset));
        toast("🔁 Streak reset. Start fresh today!", {
          duration: 5000,
          style: {
            background: "#000", // Tailwind yellow-400
            color: "#fff", // Tailwind gray-800
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "12px 16px",
          },
        });
      }
    }
  }, [dispatch]);

  return (
    <>
      <div className="flex items-center gap-1 cursor-pointer">
        <img src={StreakIcon} alt="Fire" className="w-5 h-5" />
        <span className="text-gray-500 text-sm">{streak.count}</span>
      </div>
    </>
  );
};

export default Streaks;
