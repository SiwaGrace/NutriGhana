const loadSavedFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("savedDishes")) || [];
  } catch {
    return [];
  }
};

const loadFavorites = () => {
  const saved = localStorage.getItem("favorites");
  return saved ? JSON.parse(saved) : {};
};
const saveFavorites = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};
// src/features/counter/counterSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getDishes = createAsyncThunk("dishes/getDishes", async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/dishes`);
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
  favorites: loadFavorites(),
  savedIds: loadSavedFromLocalStorage(),
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
      const dishId = action.payload;
      const dish = state.dishes.find((d) => d._id === dishId);
      if (dish) {
        dish.favorite = !dish.favorite;
        state.favorites[dishId] = dish.favorite;
        saveFavorites(state.favorites); // ✅ persist in localStorage
      }
    },
    toggleSaved: (state, action) => {
      const dishId = action.payload;
      const dish = state.dishes.find((d) => d._id === dishId);

      if (!dish) return;

      // toggle saved
      dish.saved = !dish.saved;

      if (dish.saved) {
        state.savedIds.push(dishId);
      } else {
        state.savedIds = state.savedIds.filter((id) => id !== dishId);
      }

      // persist to localStorage
      localStorage.setItem("savedDishes", JSON.stringify(state.savedIds));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDishes.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getDishes.fulfilled, (state, action) => {
        state.dishes = action.payload.map((dish) => ({
          ...dish,
          saved: state.savedIds.includes(dish._id), // sync saved state
          favorite: state.favorites[dish._id] || false, // ✅ sync favorite state
        }));
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
