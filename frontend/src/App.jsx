import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// Pages and Components
import Home from "./pages/Home";
import RootLayout from "./layout/RootLayout";

import ProfileHome from "./pages/ProfileHome";
import ProfileDishes from "./pages/ProfileDishes";
import ProfileStats from "./pages/ProfileStats";
import ProfileUser from "./pages/ProfileUser";
import SelectedFood from "./component/SelectedFood";
import ProfileSetup from "./pages/ProfileSetup";
import Login from "./pages/Login";

const App = () => {
  const myRoute = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<RootLayout />}>
          <Route path="/profilehome" element={<ProfileHome />} />
          <Route path="/dishes" element={<ProfileDishes />} />
          <Route path="stats" element={<ProfileStats />} />
          <Route path="userprofile" element={<ProfileUser />} />
          <Route path="/selectedfood" element={<SelectedFood />} />
        </Route>
        <Route>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ProfileSetup" element={<ProfileSetup />} />
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={myRoute} />
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
    </>
  );
};

export default App;
