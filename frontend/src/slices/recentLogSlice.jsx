import { createSlice } from "@reduxjs/toolkit";

const recentLogSlice = createSlice({
  name: "recentLog",
  initialState: {
    loggedDishes: [],
  },
  reducers: {
    logDish: (state, action) => {
      const dish = action.payload;
      // Remove duplicate
      state.loggedDishes = state.loggedDishes.filter((d) => d.id !== dish.id);
      // Add to front, limit to 5 items
      state.loggedDishes.unshift(dish);
      if (state.loggedDishes.length > 5) {
        state.loggedDishes.pop();
      }
    },
  },
});

export const { logDish } = recentLogSlice.actions;
export default recentLogSlice.reducer;
