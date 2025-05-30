import React, { useEffect } from "react";
import { Flame } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getDishes } from "../../slices/getAllDishes";
import Loading from "./Loading";
import Error from "./Error";

const DishesSuggestion = ({ searchTerm, filter }) => {
  const { dishes, isLoading, error } = useSelector((state) => state.dishes);

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
      {/* Dish Item with View Button */}
      {/* <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md mb-2 border">
        <div className="flex items-center gap-3">
          <img
            src={Kenkey}
            alt="Kenkey with pepper"
            className="w-12 h-12 rounded-md object-cover"
          />
          <div>
            <p className="font-semibold">Kenkey with pepper</p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Flame size={14} /> 106 cal
            </p>
          </div>
        </div>
        <button className="bg-yellow-400 text-white px-3 py-1 rounded-lg text-sm">
          View
        </button>
      </div> */}
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
            className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md border border-gray-300"
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
            <button className="bg-gray-200 text-black px-3 py-1 rounded-lg text-sm">
              +
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default DishesSuggestion;
