import React, { useState } from "react";
import SplashScreen from "../components/SplashScreen";
import { useNavigate } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../components/firebase";

const foodItems = [
  {
    image: "/src/assets/img/food1.jpg",
    name: "Know Your Food, Feel Your Best!",
    description:
      "NutriGhana helps you understand what’s in your classic Italian pasta dish with a rich and savory meat sauce. Track your meals and eat smarter—starting today!",
  },
  {
    image: "/src/assets/img/food2.webp",
    name: "Know Your Food, Feel Your Best!",
    description:
      "NutriGhana helps you understand what’s in your flavorful and aromatic curry made with tender chicken and a blend of spices. Track your meals and eat smarter—starting today!",
  },
  {
    image: "/src/assets/img/food3.jpg",
    name: "Know Your Food, Feel Your Best!",
    description:
      "NutriGhana helps you understand what’s in your healthy and colorful stir-fry with fresh vegetables and a light soy sauce.Track your meals and eat smarter—starting today!",
  },
];

const Home = () => {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in (using Firebase Auth)
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       navigate("/home", { replace: true });
  //     }
  //   });
  //   return () => unsubscribe();
  // }, [navigate]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      if (progress < foodItems.length - 1) {
        setProgress(progress + 1);
      } else {
        navigate("/login");
      }
    }, 350); // Animation duration
  };

  return (
    <SplashScreen>
      <div className="w-full max-w-sm mx-auto  py-6 bg-white rounded-2xl  min-h-screen flex flex-col">
        {/* Skip Button */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/login")}
            className="text-gray-600 text-sm font-semibold underline hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 px-2 py-1 rounded transition"
            aria-label="Skip introduction and go to login"
            tabIndex={isAnimating ? -1 : 0}
            disabled={isAnimating}
          >
            Skip
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex gap-2 mt-2 mb-4">
          {foodItems.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                progress >= index ? "bg-yellow-400" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>

        {/* Food Image, Name and Description */}
        <div className="flex flex-col items-center flex-1 justify-center gap-20">
          <div
            className={`w-full transition-opacity duration-300 gap-8 ${
              isAnimating ? "opacity-60" : "opacity-100"
            }`}
          >
            <img
              src={foodItems[progress].image}
              alt={`Photo of ${foodItems[progress].name}`}
              className="w-full rounded-xl shadow-md object-cover h-70 sm:h-60 mb-4 border-2 border-yellow-100"
              loading="lazy"
            />

            <h3 className="mt-7 text-3xl sm:text-4xl font-semibold font-manrope text-gray-800 text-center tracking-tight whitespace-nowrap -ml-3 ">
              {foodItems[progress].name}
            </h3>
            <p className="mt-6 text-xl sm:text-2xl font-semibold font-manrope text-gray-600 text-center leading-relaxed max-w-xl mx-auto ">
              {foodItems[progress].description}
            </p>
          </div>

          {/* Next Button */}
          <div className=" flex justify-center w-full">
            <button
              onClick={handleNext}
              className={`bg-yellow-400 text-white px-30 py-8 rounded-full shadow-md font-bold text-lg transition-all duration-150 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                isAnimating ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isAnimating}
              aria-label={
                progress < foodItems.length - 1
                  ? "Next food item"
                  : "Get Started"
              }
            >
              {progress < foodItems.length - 1 ? "Try it now" : "Get Started"}
            </button>
          </div>
        </div>
      </div>
    </SplashScreen>
  );
};

export default Home;
