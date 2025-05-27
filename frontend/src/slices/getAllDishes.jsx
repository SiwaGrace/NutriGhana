// src/features/counter/counterSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getDishes = createAsyncThunk("dishes/getDishes", async () => {
  const response = await axios.get(`http://localhost:5000/api/dishes/getall`);
  console.log(response.data.results);
  return response.data.results;
});

const initialState = {
  dishes: [],
  isLoading: true,
  error: null,
};

const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {
    increment: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDishes.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getDishes.fulfilled, (state, action) => {
        state.dishes = action.payload;
        state.isLoading = false;
      })
      .addCase(getDishes.rejected, (state) => {
        state.error = "error loading";
        state.isLoading = false;
      });
  },
});

// Export generated action creators
// export const {} = dishesSlice.actions;

// Export the reducer to be added to the store
export default dishesSlice.reducer;
