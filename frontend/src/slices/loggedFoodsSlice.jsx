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
  },
});

export const { addFood, clearFoods } = loggedFoodsSlice.actions;
export default loggedFoodsSlice.reducer;
