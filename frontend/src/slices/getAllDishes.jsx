// src/features/counter/counterSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getDishes = createAsyncThunk("dishes/getDishes", async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/dishes/get`);
    // `http://localhost:5000/api/foods/getAll`;
    // Alphabetically sort by recipe title
    const sortedDishes = response.data.results.sort((a, b) =>
      // with spoonacular i had a.title
      a.name.localeCompare(b.name)
    );
    // Force favorite and saved to false initially
    const initializedDishes = sortedDishes.map((dish) => ({
      ...dish,
      favorite: false,
      saved: false,
    }));

    console.log(response.data.results);
    return initializedDishes;
  } catch (error) {
    throw new Error(
      "Spoonacular is currently unavailable. Please try again later."
    );
  }
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
    toggleFavorite: (state, action) => {
      const dish = state.dishes.find((d) => d.id === action.payload);
      if (dish) {
        dish.favorite = !dish.favorite;
      }
    },
    toggleSaved: (state, action) => {
      const dish = state.dishes.find((d) => d.id === action.payload);
      if (dish) {
        dish.saved = !dish.saved;
      }
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
export const { setSelectedDish, toggleFavorite, toggleSaved } =
  dishesSlice.actions;

// Export the reducer to be added to the store
export default dishesSlice.reducer;
