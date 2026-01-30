import axios from "axios";
import React, { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true"; // ✅ persist login
  });

  const [userData, setUserData] = useState(null);

  console.log("Backend URL:", backendUrl);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/user-profile");
      if (data.success) {
        setUserData(data.user);
        if (data.user.recommendedCalories) {
          localStorage.setItem("recommendedCalories", data.user.recommendedCalories);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // toast.error(error.message);
      console.log("Not logged in or profile fetch failed");
    }
  };

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUserData(null);
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(null);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("recommendedCalories");
        toast.success("Logged out successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  React.useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    getAuthState,
    logout,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
