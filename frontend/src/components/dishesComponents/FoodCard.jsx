import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Heart } from "lucide-react";
import FishIcon from "../../assets/logo&icons/fa-solid_fish.svg";
import CarbIcon from "../../assets/logo&icons/fluent_food-grains-20-filled.svg";
import FatIcon from "../../assets/logo&icons/game-icons_fat.svg";
import { addFood } from "../../slices/loggedFoodsSlice";

import { Link, useNavigate } from "react-router-dom";

export default function FoodCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [measurement, setMeasurement] = useState("Bowl");
  const [servings, setServings] = useState(1);
  const { selectedDish: reduxSelectedDish } = useSelector(
    (state) => state.dishes
  );
  // Try Redux first, fallback to localStorage
  const selectedDish =
    reduxSelectedDish || JSON.parse(localStorage.getItem("selectedDish"));

  // nutrients
  const Allnutrients = selectedDish?.nutrients || [];

  const calories = Allnutrients.find((n) => n.name === "Calories");
  const protein = Allnutrients.find((n) => n.name === "Protein");
  const fat = Allnutrients.find((n) => n.name === "Fat");
  const carbs = Allnutrients.find((n) => n.name === "Carbs");

  // console.log(selectedDish);
  if (!selectedDish) {
    return (
      <div className="pt-28 text-center">
        <p className="text-lg font-semibold">No dish selected.</p>
        <Link
          to="/dishes"
          className="text-blue-600 underline mt-4 inline-block"
        >
          Go back to Food List
        </Link>
      </div>
    );
  }

  // on log
  const [isLogged, setIsLogged] = useState(false);

  const onLog = () => {
    setIsLogged(true);
    dispatch(addFood(selectedDish));
  };

  // Optional: update Redux if it's empty
  // useEffect(() => {
  //   if (!reduxSelectedDish && selectedDish) {
  //     dispatch(setSelectedDish(selectedDish));
  //   }
  // }, []);
  return (
    <Link to="/food">
      <div className="pt-28">
        <div className="px-6 py-10 max-w-md mx-auto rounded-lg shadow-sm  relative">
          {/* Food Tag in top-left corner */}
          {selectedDish.tribe && (
            <span className="absolute top-2 right-2 bg-yellow-100 text-yellow-700 text-sm px-2 py-1 rounded-full font-bold">
              {selectedDish.tribe}
            </span>
          )}
          {/* Header */}
          <div className="flex  items-center space-x-30 mb-4">
            <button
              onClick={(e) => {
                e.preventDefault(); // stop outer link navigation
                navigate("/dishes");
              }}
              className="border p-2 rounded-full"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <span className="text-lg font-medium">Selected food</span>
          </div>
          {/* food image */}
          <div
            className="bg-cover bg-center h-[40vh] mb-5 rounded-2xl"
            style={{ backgroundImage: `url(${selectedDish.imageUrl})` }}
          ></div>
          {/* Food Title */}
          <div className="flex justify-between items-center mb-4 ">
            <h1 className="text-2xl font-semibold mb-2">{selectedDish.name}</h1>
            <p className="border p-2 rounded-full">
              <Heart className="w-6 h-6 text-gray-400" />
            </p>
          </div>

          {/* Measurement Options */}
          <div className="mb-4">
            {" "}
            <p className=" mb-2 text-xl font-bold">Measurement</p>
            <div className="flex space-x-2 mb-4">
              {["Bowl", "Balls", "Pcs"].map((option) => (
                <button
                  key={option}
                  className={`px-4 py-2 rounded-full ${
                    measurement === option
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setMeasurement(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            {/* Number of Servings */}
            <div className="mb-4 flex justify-between">
              <p className="text-gray-500 ">Number of servings</p>
              <input
                type="number"
                value={servings}
                min="1"
                className="w-16 text-center border rounded-4xl"
                onChange={(e) => setServings(Number(e.target.value))}
              />
            </div>
          </div>

          {/* nutritions */}
          <div className="p-4">
            <p className=" mb-2 text-xl font-bold text-center">
              Food Nutritions
            </p>
            {/* Macros */}
            <div className="mt-6 p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Micros Nutrients
              </h2>
              {/* Calories Card */}
              <div className="p-4 rounded-lg shadow-md mb-4 bg-base-100 flex space-x-4">
                <span className="text-xl border-3 border-gray-400 p-3 rounded-[100%]">
                  🔥
                </span>

                <div>
                  <p className="text-2xl font-semibold">
                    {calories.amount} {calories.unit}
                  </p>
                  <p className="text-gray-500">{calories.name}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                {[
                  { icon: FishIcon, nutrient: protein },
                  { icon: CarbIcon, nutrient: carbs },
                  { icon: FatIcon, nutrient: fat },
                ].map(({ icon, nutrient }) => (
                  <div
                    key={nutrient.name}
                    className="flex-1 bg-white p-3 rounded-lg shadow-md text-center"
                  >
                    <img
                      src={icon}
                      alt={nutrient.name}
                      className="w-5 h-5 mx-auto"
                    />
                    <p className="text-xs text-gray-500">{nutrient.name}</p>
                    <p>
                      {nutrient.amount}
                      {nutrient.unit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Micros*/}
            <div className="mt-6 p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Micros Nutrients
              </h2>

              {/* Header row */}
              <div className="flex justify-between items-center bg-[#e3e4e8] rounded-3xl px-4 py-2 mb-2">
                <p className="text-sm font-medium text-gray-600">Nutrient</p>
                <p className="text-lg font-semibold text-gray-800">Value</p>
              </div>

              {/* Dynamic list of all micro nutrients */}
              {[
                { nutrient: protein },
                { nutrient: carbs },
                { nutrient: fat },
              ].map(({ nutrient }) => (
                <div
                  key={nutrient.name}
                  className="flex justify-between items-center px-4 py-2 border-b border-gray-200"
                >
                  <p className="text-sm text-gray-600">{nutrient.name}</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {nutrient.amount} {nutrient.unit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Log Button */}
          <button
            className="w-[80%] block  mx-auto bg-yellow-500 text-white py-3 rounded-full text-lg mt-10 cursor-pointer"
            onClick={() => onLog()}
          >
            {isLogged ? "Food Logged" : "Log"}
          </button>
        </div>
      </div>
    </Link>
  );
}

{
  /* <div className="flex-1 bg-white p-4 rounded-lg shadow-md text-center">
  <img src={FatIcon} alt="Fat" className="w-5 h-5 mx-auto" />
  <p className="text-xs text-gray-500">Fat left</p>
  <p className="h-1 mt-2 bg-gray-200 w-full "></p>
</div>; */
}
