import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Heart } from "lucide-react";
import { addFood, updateStats } from "../../slices/loggedFoodsSlice";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import NumberofServings from "./NumberofServings";
import MealBuilder from "./ToDelete.jsx/MealBuilder";

// Updated Add-ons
const ADD_ONS = [
  {
    id: "friedFish",
    name: "Fried Fish (tilapia)",
    unitLabel: "piece (~100g)",
    perUnit: { calories: 200, protein: 30, carbs: 0, fat: 10 },
  },
  {
    id: "chicken",
    name: "Chicken Leg",
    unitLabel: "piece (~100g)",
    perUnit: { calories: 165, protein: 26, carbs: 0, fat: 6 },
  },
  {
    id: "egg",
    name: "Boiled Egg",
    unitLabel: "piece",
    perUnit: { calories: 78, protein: 6, carbs: 0.6, fat: 5 },
  },
];

export default function FoodCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedGrams, setSelectedGrams] = useState(250);

  // add ons
  const [addOnQuantities, setAddOnQuantities] = useState(
    ADD_ONS.reduce((acc, addOn) => {
      acc[addOn.id] = 0;
      return acc;
    }, {})
  );

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
  // Base totals (scaled by grams / 250g per bowl)
  const baseTotals = useMemo(() => {
    const factor = selectedGrams / 250;
    return {
      calories: calories.amount * factor,
      protein: protein.amount * factor,
      carbs: carbs.amount * factor,
      fat: fat.amount * factor,
    };
  }, [selectedGrams]);

  // Add-ons totals
  const addOnTotals = useMemo(() => {
    return ADD_ONS.reduce(
      (acc, addOn) => {
        const qty = addOnQuantities[addOn.id] || 0;
        acc.calories += addOn.perUnit.calories * qty;
        acc.protein += addOn.perUnit.protein * qty;
        acc.carbs += addOn.perUnit.carbs * qty;
        acc.fat += addOn.perUnit.fat * qty;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [addOnQuantities]);

  const total = {
    calories: baseTotals.calories + addOnTotals.calories,
    protein: baseTotals.protein + addOnTotals.protein,
    carbs: baseTotals.carbs + addOnTotals.carbs,
    fat: baseTotals.fat + addOnTotals.fat,
  };
  // Optional: update Redux if it's empty
  // useEffect(() => {
  //   if (!reduxSelectedDish && selectedDish) {
  //     dispatch(setSelectedDish(selectedDish));
  //   }
  // }, []);
  // on log
  const [isLogged, setIsLogged] = useState(false);

  // const onLog = () => {
  //   setIsLogged(true);

  //   const loggedMeal = {
  //     ...selectedDish,
  //     grams: selectedGrams,
  //     addOns: addOnQuantities,
  //     total, // ⬅️ calories, protein, carbs, fat
  //     totalCalories: total.calories,
  //     loggedAt: new Date().toISOString(), // optional for history
  //   };

  //   dispatch(addFood(loggedMeal));

  //   console.log("Meal logged:", loggedMeal);
  // };

  const onLog = async () => {
    setIsLogged(true);

    const loggedMeal = {
      ...selectedDish,
      id: crypto.randomUUID(),
      dishId: selectedDish._id,
      dishName: selectedDish.name,
      dishImageUrl: selectedDish.imageUrl,
      grams: selectedGrams,
      addOns: addOnQuantities,
      total, // calories, protein, carbs, fat
      totalCalories: total.calories,
      loggedAt: new Date().toISOString(),
    };

    try {
      // 1️⃣ Save on backend
      await axios.post(
        "http://localhost:5000/api/logstats", // or /api/logs depending on your backend route
        { date: new Date().toISOString().split("T")[0], foods: [loggedMeal] },
        { withCredentials: true } // send cookies if your auth uses them
      );

      // 2️⃣ Update Redux
      dispatch(addFood(loggedMeal));

      // 3️⃣ Optionally update stats in Redux
      dispatch(
        updateStats({
          date: new Date().toISOString().split("T")[0],
          calories: total.calories,
          protein: total.protein,
          carbs: total.carbs,
          fat: total.fat,
        })
      );

      console.log("Meal logged successfully:", loggedMeal);
    } catch (err) {
      console.error("Error logging meal:", err);
    }
  };

  return (
    <div className="pt-12">
      <div className="px-6 py-10 max-w-md mx-auto rounded-lg shadow-sm  relative">
        <Link to={`/food/${selectedDish.name}`}>
          {/* Food Tag in top-left corner */}
          {selectedDish.tags && selectedDish.tags.length > 0 && (
            <div className="absolute top-4 right-2 flex flex-wrap gap-2">
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
          <div className="flex  items-center space-x-30 my-5">
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
            <h1 className="text-2xl  mb-2">{selectedDish.name}</h1>
            {/* <p className="border p-2 rounded-full">
              <Heart className="w-6 h-6 text-gray-400" />
            </p> */}
            <FavoriteButton />
          </div>

          {/* Measurement Options */}
          <NumberofServings
            calories={calories}
            protein={protein}
            fat={fat}
            carbs={carbs}
            onLog={onLog}
            isLogged={isLogged}
            selectedDish={selectedDish}
            addOnQuantities={addOnQuantities}
            setAddOnQuantities={setAddOnQuantities}
            ADD_ONS={ADD_ONS}
            total={total}
            selectedGrams={selectedGrams}
            setSelectedGrams={setSelectedGrams}
            addOnTotals={addOnTotals}
            // baseTotals={baseTotals}
          />
          {/* <MealBuilder /> */}
        </Link>
      </div>
    </div>
  );
}
