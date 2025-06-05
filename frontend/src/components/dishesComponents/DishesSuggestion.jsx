import React, { useEffect, useState } from "react";
// , HeartFilled
import { Flame, Heart, Plus, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDishes,
  setSelectedDish,
  toggleFavorite,
  toggleSaved,
} from "../../slices/getAllDishes";
import Loading from "./Loading";
import Error from "./Error";
import { useNavigate } from "react-router-dom";
import FoodCard from "./FoodCard";

const DishesSuggestion = ({ searchTerm, filter }) => {
  // const [visibleDishId, setVisibleDishId] = useState(null);

  const navigate = useNavigate();
  const { dishes, isLoading, error, selectedDish } = useSelector(
    (state) => state.dishes
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDishes());
  }, [dispatch]);

  const filteredDishes = dishes
    .filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((recipe) => {
      if (filter === "favorite") return recipe.favorite;
      if (filter === "saved") return recipe.saved;
      return true; // all
    });
  return (
    <div className="grid gap-2">
      {/* spinner */}
      {isLoading && <Loading />}
      {/* errr */}
      {error && <Error />}
      {/* Dish Item with Add Button */}
      {filteredDishes.map((recipe) => {
        const calories = recipe.nutrition?.nutrients?.find(
          (n) => n.name === "Calories"
        );
        return (
          <div
            key={recipe.id}
            className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md border border-gray-300 cursor-pointer"
            onClick={() => {
              dispatch(setSelectedDish(recipe));
              navigate("/food"); // or your actual route
            }}
          >
            <div className="flex items-center gap-3">
              <img
                src={recipe.image}
                alt="Kenkey with pepper"
                className="w-12 h-12 rounded-md object-cover"
              />
              <div>
                <p className="font-semibold">{recipe.title}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Flame size={14} />{" "}
                  {calories ? `${calories.amount} ${calories.unit}` : "No data"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {/* Favorite (Love) Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Dispatch toggle favorite
                  dispatch(toggleFavorite(recipe.id));
                }}
                className="cursor-pointer"
              >
                <Heart
                  size={24}
                  className={
                    recipe.favorite ? "text-orange-300" : "text-gray-400"
                  }
                  strokeWidth={2}
                  fill={recipe.favorite ? "orange" : "none"}
                />
              </button>

              {/* Save (Plus) Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleSaved(recipe.id));
                }}
                className="cursor-pointer"
              >
                {recipe.saved ? (
                  <Check size={24} className="text-green-600" />
                ) : (
                  <Plus size={24} className="text-gray-400" />
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DishesSuggestion;
