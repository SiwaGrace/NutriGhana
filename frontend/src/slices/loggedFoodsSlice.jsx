// features/loggedFoodsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedfoods: [], // array of logged foods
};

const loggedFoodsSlice = createSlice({
  name: "loggedFoods",
  initialState,
  reducers: {
    addFood: (state, action) => {
      state.loggedfoods.push(action.payload); // add new food
    },
    clearFoods: (state) => {
      state.loggedfoods = [];
    },
  },
});

export const { addFood, clearFoods } = loggedFoodsSlice.actions;
export default loggedFoodsSlice.reducer;
