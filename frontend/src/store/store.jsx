import { configureStore } from "@reduxjs/toolkit";
import dishesReducer from "../slices/getAllDishes";

export const store = configureStore({
  reducer: {
    dishes: dishesReducer,
  },
});
