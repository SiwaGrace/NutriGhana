import { createSlice } from "@reduxjs/toolkit";
import { loadLoggedFoods, saveLoggedFoods } from "../utils/likedDishStorage";

const calculateTotals = (foods) => {
  return foods.reduce(
    (acc, food) => {
      acc.calories += food?.total?.calories || 0;
      acc.protein += food?.total?.protein || 0;
      acc.carbs += food?.total?.carbs || 0;
      acc.fat += food?.total?.fat || 0;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
};

const initialFoods = loadLoggedFoods(); // load saved foods
const initialState = {
  loggedfoods: initialFoods,
  totals: calculateTotals(initialFoods),
};

const loggedFoodsSlice = createSlice({
  name: "loggedFoods",
  initialState,
  reducers: {
    addFood: (state, action) => {
      state.loggedfoods.push(action.payload);
      state.totals = calculateTotals(state.loggedfoods);
      saveLoggedFoods(state.loggedfoods);
    }, // save to localStorage
    clearFoods: (state) => {
      state.loggedfoods = [];
      state.totals = calculateTotals(state.loggedfoods);
      saveLoggedFoods(state.loggedfoods);
    }, // clear localStorage
    syncWithDishes: (state, action) => {
      const validDishIds = action.payload.map((dish) => dish._id);
      state.loggedfoods = state.loggedfoods.filter((dish) =>
        validDishIds.includes(dish._id)
      );
      state.totals = calculateTotals(state.loggedfoods);
      saveLoggedFoods(state.loggedfoods);
    },
  },
});

export const { addFood, clearFoods, syncWithDishes } = loggedFoodsSlice.actions;
export default loggedFoodsSlice.reducer;
