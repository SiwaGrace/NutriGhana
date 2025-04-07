import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./layout/RootLayout";
import Login from "./pages/login";

// actual pages
import ProfileHome from "./pages/ProfileHome";
import ProfileDishes from "./pages/ProfileDishes";
import ProfileStats from "./pages/ProfileStats";
import ProfileUser from "./pages/ProfileUser";
import SelectedFood from "./component/SelectedFood";
import ProfileSetup from "./pages/ProfileSetup";
// import Chatbox from "./component/Chatbox";

const App = () => {
  const myRoute = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* with navbar */}
        <Route element={<RootLayout />}>
          <Route path="/profilehome" element={<ProfileHome />} />
          <Route path="/dishes" element={<ProfileDishes />} />
          <Route path="stats" element={<ProfileStats />} />
          <Route path="userprofile" element={<ProfileUser />} />
          <Route path="/selectedfood" element={<SelectedFood />} />
        </Route>
        {/* links */}
        <Route>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/ProfileSetup" element={<ProfileSetup />} />
          {/* <Route path="/chatbox" element={<Chatbox />} /> */}
        </Route>
      </>
    )
  );
  return <RouterProvider router={myRoute} />;
};

export default App;
