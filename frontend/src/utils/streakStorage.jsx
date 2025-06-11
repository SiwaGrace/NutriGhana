// utils/streakStorage.js
export const saveStreakToLocal = (data) => {
  localStorage.setItem("userStreak", JSON.stringify(data));
};

export const getStreakFromLocal = () => {
  const data = localStorage.getItem("userStreak");
  return data ? JSON.parse(data) : null;
};
