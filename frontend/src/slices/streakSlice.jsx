// redux/streakSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  lastLoggedDate: null, // e.g., "2025-06-09"
};

const streakSlice = createSlice({
  name: "streak",
  initialState,
  reducers: {
    setStreak: (state, action) => {
      state.count = action.payload.count;
      state.lastLoggedDate = action.payload.lastLoggedDate;
    },
  },
});

export const { setStreak } = streakSlice.actions;
export default streakSlice.reducer;
