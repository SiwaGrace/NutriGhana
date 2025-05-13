import React, { useEffect, useState } from "react";

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
      <div className="fixed inset-0 flex items-center justify-center bg-blue-600 z-50">
        <h1 className="text-4xl font-bold text-white animate-pulse">
          nutriGhana
        </h1>
      </div>
    );
  }

  return children;
};

export default SplashScreen;
