import { useState } from "react";
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
  const { selectedDish } = useSelector((state) => state.dishes);
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
  return (
    <Link to="/food">
      <div className="pt-28 ">
        <div className="px-6 py-10 max-w-md mx-auto rounded-lg shadow-sm">
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
          <div>
            <p className=" mb-2 text-xl font-bold">Nutritions</p>
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
            {/* Macros */}
            <div className="mt-4 flex gap-3">
              <div className="flex-1 bg-white p-4 rounded-lg shadow-md text-center">
                <img src={FishIcon} alt="Protein" className="w-5 h-5 mx-auto" />
                <p className="text-xs text-gray-500">{protein.name}</p>
                <p className="">
                  {protein.amount}
                  {protein.unit}
                </p>
              </div>
              <div className="flex-1 bg-white p-4 rounded-lg shadow-md text-center">
                <img src={CarbIcon} alt="Carbs" className="w-5 h-5 mx-auto" />
                <p className="text-xs text-gray-500">{carbs.name}</p>
                <p className="">
                  {carbs.amount}
                  {carbs.unit}
                </p>
              </div>
              <div className="flex-1 bg-white p-4 rounded-lg shadow-md text-center">
                <img src={FatIcon} alt="Fat" className="w-5 h-5 mx-auto" />
                <p className="text-xs text-gray-500">{fat.name}</p>
                <p className="">
                  {fat.amount}
                  {fat.unit}
                </p>
              </div>
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
