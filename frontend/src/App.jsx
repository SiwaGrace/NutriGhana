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
import HomePage from "./pages/HomePage";
import Dishes from "./pages/Dishes";
import Stats from "./pages/Stats";
import UserProfile from "./pages/UserProfile";
import LandingPage from "./pages/LandingPage";
import NutriPalChat from "./components/NutriPalChat";
import Signup from "./pages/Signup";
import ProfileSetup from "./pages/ProfileSetup";
import FoodCard from "./components/dishesComponents/FoodCard";
import ProfilesList from "./pages/ProfilesList";
import ForgetPassword from "./components/ForgetPassword";
import PrivateRoute from "./pages/PrivateRoute";
import VerifyOtp from "./components/VerifyOtp";
import ResetPassword from "./components/ResetPassword";
import Demo from "./components/dishesComponents/ToDelete.jsx/Demo";

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
            path="/stats"
            element={
              <PrivateRoute>
                <Stats />
              </PrivateRoute>
            }
          />
          <Route
            path="/userprofile"
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
          <Route path="/demo" element={<Demo />} />
          <Route path="/login" element={<Signup />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/ProfileSetup" element={<ProfileSetup />} />
          <Route path="/see" element={<ProfilesList />} />
        </Route>

        {/* chatbox is protected */}
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
