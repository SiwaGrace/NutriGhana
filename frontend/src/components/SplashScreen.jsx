import React, { useEffect, useState } from "react";
import ntrighanalogo from "../assets/logo&icons/nutrighanaLogo.svg";

const SplashScreen = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Show splash screen for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-white">
        <img src={ntrighanalogo} alt="Logo" className="w-12 h-12 mr-2 mb-2" />
        <h1 className="text-4xl font-bold text-black animate-pulse">
          nutriGhana
        </h1>
      </div>
    );
  }

  return children;
};

export default SplashScreen;
