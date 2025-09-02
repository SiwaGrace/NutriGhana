export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// logged food

export const saveLoggedFoods = (loggedFoods) => {
  try {
    localStorage.setItem("loggedFoods", JSON.stringify(loggedFoods));
  } catch (error) {
    console.error("Failed to save logged foods:", error);
  }
};

export const loadLoggedFoods = () => {
  try {
    const data = localStorage.getItem("loggedFoods");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load logged foods:", error);
    return [];
  }
};
