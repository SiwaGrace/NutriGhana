// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import dishesReducer from "../slices/getAllDishes";
import profileReducer from "../slices/profileUserSlice";
import streakReducer from "../slices/streakSlice";
import loggedFoodsReducer from "../slices/loggedFoodsSlice";

// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import { combineReducers } from "redux";
// import dishReducer from "./dishSlice"; // update path as needed

// const persistConfig = {
//   key: "root",
//   storage,
// whitelist: ["dishes"], // only persist the dishes slice
// };

// const rootReducer = combineReducers({
//   dishes: dishReducer,
//   // add more reducers here
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // Redux Persist uses non-serializable values
//     }),
// });

// export const persistor = persistStore(store);

export const store = configureStore({
  reducer: {
    dishes: dishesReducer,
    profiles: profileReducer,
    streak: streakReducer,
    loggedFoods: loggedFoodsReducer,
  },
});
