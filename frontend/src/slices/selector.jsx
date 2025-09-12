// selectors.js
import { createSelector } from "@reduxjs/toolkit";

export const selectLoggedDishes = (state) => state.dishes.loggedDishes;

export const selectTotals = createSelector(
  [selectLoggedDishes],
  (loggedDishes) =>
    loggedDishes.reduce(
      (acc, dish) => {
        // check nutrients positions well
        acc.calories += dish.calories || 0;
        acc.protein += dish.protein || 0;
        acc.carbs += dish.carbs || 0;
        acc.fat += dish.fat || 0;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    )
);

// add  in component
// import { useSelector } from "react-redux";
// import { selectLoggedDishes, selectTotals } from "../store/selectors";

// const loggedDishes = useSelector(selectLoggedDishes);
// const totals = useSelector(selectTotals);
