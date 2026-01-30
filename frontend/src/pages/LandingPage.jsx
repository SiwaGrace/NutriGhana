import React, { useState } from "react";
import SplashScreen from "../components/SplashScreen";
import { useNavigate } from "react-router-dom";
import nutrilogo from "../assets/logoicons/nutrighanaLogo.svg";
("/src/assets/logoicons/nutrighanaLogo.svg");
import waakye from "../assets/img/waakye.jpg";
import kenk from "../assets/img/kenk.jpg";

const foodItems = [
  {
    image: { waakye },
    name: "Know Your Food, Feel Your Best!",
    description:
      "NutriGhana helps you understand what’s in your classic Italian pasta dish with a rich and savory meat sauce. Track your meals and eat smarter—starting today!",
  },
  {
    image: { kenk },
    name: "Log It, See It, Love It!",
    description:
      "NutriGhana helps you understand what’s in your flavorful and aromatic curry made with tender chicken and a blend of spices. Track your meals and eat smarter—starting today!",
  },
  {
    type: "cards",
    name: "Eat Better, Grow Stronger !",

    tips: [
      "Quick Tip, Eat kontomire for iron.",
      "Quick Tip, Get some fruits today.",
      "Quick Tip, Get some fruits today.",
    ],
    description:
      "NutriGhana helps you understand what’s in your healthy and colorful stir-fry with fresh vegetables and a light soy sauce. Track your meals and eat smarter—starting today!",
  },
];

const Home = () => {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

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
    }, 350);
  };

  return (
    <SplashScreen>
      <div className="w-full max-w-sm mx-auto py-6 bg-white rounded-2xl min-h-screen flex flex-col">
        {/* Skip Button */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/login")}
            className="text-gray-600 text-sm font-semibold underline hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded transition"
            aria-label="Skip introduction and go to login"
            tabIndex={isAnimating ? -1 : 0}
            disabled={isAnimating}
          >
            Skip
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex gap-2">
          {foodItems.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                progress >= index ? "bg-yellow-400" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>

        {/* Food Image / Cards, Name and Description */}
        <div className="flex flex-col items-center flex-1 justify-center gap-8 mt-2">
          <div
            className={`w-full transition-opacity duration-300 ${
              isAnimating ? "opacity-60" : "opacity-100"
            }`}
          >
            {foodItems[progress].type === "cards" ? (
              <div className="w-full">
                <div className="flex flex-col gap-4 mt-6">
                  {foodItems[progress].tips.map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-white rounded-2xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] p-4 border border-gray-300"
                    >
                      <div className="bg-black rounded-xl flex items-center justify-center w-14 h-14">
                        <img
                          src={nutrilogo}
                          alt="NutriGhana"
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">NutriGhana</h3>
                        <p className="text-sm text-gray-600">{tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <h3 className="mt-2 text-3xl sm:text-3xl font-semibold font-manrope text-gray-800 text-center tracking-tight whitespace-nowrap ">
                  {foodItems[progress].name}
                </h3>
                <p className=" text-xl sm:text-lg font-light font-manrope text-black text-center leading-loose tracking-wide max-w-2xl mx-auto">
                  {foodItems[progress].description}
                </p>
              </div>
            ) : (
              <>
                <img
                  src={foodItems[progress].image}
                  alt={`Photo of ${foodItems[progress].name}`}
                  className="object-cover w-full h-60 rounded-xl shadow-md border-2 border-yellow-100"
                  loading="lazy"
                />
                <h3 className="mt-2 text-3xl sm:text-3xl font-semibold font-manrope text-gray-800 text-center tracking-tight whitespace-nowrap -ml-3 p-1">
                  {foodItems[progress].name}
                </h3>
                <p className="mt-2 text-xl sm:text-lg font-light font-manrope text-black text-center leading-loose tracking-wide max-w-2xl mx-auto">
                  {foodItems[progress].description}
                </p>
              </>
            )}
          </div>

          {/* Next Button */}
          <div className="flex justify-center w-full">
            <button
              onClick={handleNext}
              className={`bg-yellow-400 text-white px-30 py-3 rounded-full shadow-md font-bold text-lg transition-all duration-150 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 sm:mb-16 cursor-pointer ${
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
