import { createSlice } from "@reduxjs/toolkit";
import { loadLoggedFoods, saveLoggedFoods } from "../utils/likedDishStorage";

const initialState = {
  loggedfoods: loadLoggedFoods(), // load saved foods
};

const loggedFoodsSlice = createSlice({
  name: "loggedFoods",
  initialState,
  reducers: {
    addFood: (state, action) => {
      state.loggedfoods.push(action.payload);
      saveLoggedFoods(state.loggedfoods); // save to localStorage
    },
    clearFoods: (state) => {
      state.loggedfoods = [];
      saveLoggedFoods(state.loggedfoods); // clear localStorage
    },
    // ✅ new reducer: clean logged foods if they don’t exist in dishes anymore
    syncWithDishes: (state, action) => {
      const validDishIds = action.payload.map((dish) => dish._id);
      state.loggedfoods = state.loggedfoods.filter((dish) =>
        validDishIds.includes(dish._id)
      );
      saveLoggedFoods(state.loggedfoods);
    },
  },
});

export const { addFood, clearFoods, syncWithDishes } = loggedFoodsSlice.actions;
export default loggedFoodsSlice.reducer;
