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

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "api/auth/is-auth");
      if (data.success) {
        setIsLoggedIn(true);
        setUserData();
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "api/auth/user-profile");
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
        setUserData(null);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch user data on initial load

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    getAuthState,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
