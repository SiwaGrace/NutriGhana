import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Check if window is defined (for SSR safety)
  const isLoggedIn =
    typeof window !== "undefined" &&
    localStorage.getItem("isLoggedIn") === "true";

  // If not logged in → send to login
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
