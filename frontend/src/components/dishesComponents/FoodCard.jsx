import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Heart } from "lucide-react";
import { addFood } from "../../slices/loggedFoodsSlice";

import { Link, useNavigate } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import NumberofServings from "./NumberofServings";
import MealBuilder from "./ToDelete.jsx/MealBuilder";

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
      <div className="pt-12">
        <div className="px-6 py-10 max-w-md mx-auto rounded-lg shadow-sm  relative">
          {/* Food Tag in top-left corner */}
          {selectedDish.tags && selectedDish.tags.length > 0 && (
            <div className="absolute top-2 right-2 flex flex-wrap gap-2">
              {selectedDish.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-yellow-100 text-yellow-700 text-sm px-2 py-1 rounded-full font-bold cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Header */}
          <div className="flex  items-center space-x-30 mb-4">
            <button
              onClick={(e) => {
                e.preventDefault(); // stop outer link navigation
                navigate("/dishes");
              }}
              className="border border-gray-300 p-2 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 cursor-pointer text-gray-500" />
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
            {/* <FavoriteButton recipeId={selectedDish._id} /> */}
          </div>

          {/* Measurement Options */}
          <NumberofServings
            servings={servings}
            measurement={measurement}
            setMeasurement={setMeasurement}
            setServings={setServings}
            calories={calories}
            protein={protein}
            fat={fat}
            carbs={carbs}
            onLog={onLog}
            isLogged={isLogged}
          />
          {/* <MealBuilder /> */}
        </div>
      </div>
    </Link>
  );
}
