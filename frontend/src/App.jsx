import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RootLayout from "./layout/RootLayout";
// main Profile Page
import HomePage from "./pages/HomePage";
import Dishes from "./pages/Dishes";
import Stats from "./pages/Stats";
import UserProfile from "./pages/UserProfile";
// Pages and Components
import LandingPage from "./pages/LandingPage";
import NutriPalChat from "./components/NutriPalChat";
import Login from "./pages/Login";
import ProfileSetup from "./pages/ProfileSetup";
import FoodCard from "./components/dishesComponents/FoodCard";
import ProfilesList from "./pages/ProfilesList";
import PrivateRoute from "./pages/PrivateRoute";

const App = () => {
  const myRoute = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* with navbar */}
        <Route element={<RootLayout />}>
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dishes"
            element={
              <PrivateRoute>
                <Dishes />
              </PrivateRoute>
            }
          />
          <Route
            path="stats"
            element={
              <PrivateRoute>
                <Stats />
              </PrivateRoute>
            }
          />
          <Route
            path="userprofile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/food"
            element={
              <PrivateRoute>
                <FoodCard />
              </PrivateRoute>
            }
          />
        </Route>
        {/* no navbar */}
        <Route>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profileroute" element={<ProfileSetup />} />
          <Route path="/ProfileSetup" element={<ProfileSetup />} />
          <Route path="/see" element={<ProfilesList />} />
        </Route>
        <Route
          path="/chatbox"
          element={
            <PrivateRoute>
              <NutriPalChat />
            </PrivateRoute>
          }
        />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={myRoute} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
