// src/features/counter/counterSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getDishes = createAsyncThunk("dishes/getDishes", async () => {
  const response = await axios.get(`http://localhost:5000/api/dishes/getall`);
  // Alphabetically sort by recipe title
  const sortedDishes = response.data.results.sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  console.log(response.data.results);
  return sortedDishes;
});

const initialState = {
  dishes: [],
  isLoading: true,
  error: null,
  selectedDish: null,
};

const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {
    setSelectedDish: (state, action) => {
      state.selectedDish = action.payload;
      console.log(action.payload);
    },
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
export const { setSelectedDish } = dishesSlice.actions;

// Export the reducer to be added to the store
export default dishesSlice.reducer;
