import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// LocalStorage helpers
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

// Fetch all dishes
export const getDishes = createAsyncThunk("dishes/getDishes", async () => {
  const response = await axios.get(`http://localhost:5000/api/dishes`);
  const sorted = response.data.results.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return sorted.map((dish) => ({ ...dish, favorite: false, saved: false }));
});

// Fetch dishes by category
export const getDishesByCategory = createAsyncThunk(
  "dishes/getDishesByCategory",
  async (category) => {
    const response = await axios.get(
      `http://localhost:5000/api/dishes/category/${category}`
    );
    const sorted = response.data.results.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    return sorted.map((dish) => ({ ...dish, favorite: false, saved: false }));
  }
);

const initialState = {
  allDishes: [], // full list
  dishes: [], // filtered / displayed list
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
    },
    toggleFavorite: (state, action) => {
      const dishId = action.payload;
      const dish = state.allDishes.find((d) => d._id === dishId);
      if (!dish) return;

      // Toggle favorite
      dish.favorite = !dish.favorite;
      state.favorites[dishId] = dish.favorite;
      saveFavorites(state.favorites);

      // Update selectedDish if it’s the one currently viewed
      if (state.selectedDish?._id === dishId) {
        state.selectedDish.favorite = dish.favorite;
      }
    },

    toggleSaved: (state, action) => {
      const dishId = action.payload;
      const dish = state.allDishes.find((d) => d._id === dishId);
      if (!dish) return;

      dish.saved = !dish.saved;

      if (dish.saved) state.savedIds.push(dishId);
      else state.savedIds = state.savedIds.filter((id) => id !== dishId);

      localStorage.setItem("savedDishes", JSON.stringify(state.savedIds));
    },
    // ✅ filter dishes locally
    filterDishes: (state, action) => {
      const filter = action.payload;
      if (filter === "all") {
        state.dishes = [...state.allDishes];
      } else if (filter === "favorite") {
        state.dishes = state.allDishes.filter((d) => d.favorite);
      } else if (filter === "saved") {
        state.dishes = state.allDishes.filter((d) => d.saved);
      } else {
        // category filter
        state.dishes = state.allDishes.filter((d) => d.category === filter);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDishes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDishes.fulfilled, (state, action) => {
        state.allDishes = action.payload.map((dish) => ({
          ...dish,
          saved: state.savedIds.includes(dish._id),
          favorite: state.favorites[dish._id] || false,
        }));
        state.dishes = [...state.allDishes]; // display all initially
        state.isLoading = false;
      })
      .addCase(getDishes.rejected, (state) => {
        state.error = "Error loading dishes";
        state.isLoading = false;
      })
      // Category fetch (optional, can merge into allDishes if needed)
      .addCase(getDishesByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDishesByCategory.fulfilled, (state, action) => {
        // merge new category dishes into allDishes (if not already present)
        action.payload.forEach((dish) => {
          if (!state.allDishes.find((d) => d._id === dish._id)) {
            state.allDishes.push(dish);
          }
        });
        state.dishes = action.payload.map((dish) => ({
          ...dish,
          saved: state.savedIds.includes(dish._id),
          favorite: state.favorites[dish._id] || false,
        }));
        state.isLoading = false;
      })
      .addCase(getDishesByCategory.rejected, (state) => {
        state.error = "Error loading dishes by category";
        state.isLoading = false;
      });
  },
});

export const { setSelectedDish, toggleFavorite, toggleSaved, filterDishes } =
  dishesSlice.actions;

export default dishesSlice.reducer;
