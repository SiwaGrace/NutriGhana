// src/features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dishesbox: [],
};

const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {
    increment: (state) => {},
  },
});

// Export generated action creators
export const {} = dishesSlice.actions;

// Export the reducer to be added to the store
export default dishesSlice.reducer;
