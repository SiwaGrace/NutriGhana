import React, { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getDishes } from "../slices/getAllDishes";

const DishesSuggestion = () => {
  const { dishes, isLoading, error } = useSelector((state) => state.dishes);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDishes());
  }, [dispatch]);
  return (
    <div>
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
      {isLoading && (
        <button
          type="button"
          className="flex items-center bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg disabled:opacity-50"
          disabled
        >
          <svg
            className="mr-2 h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          Processing…
        </button>
      )}
      {/* errr */}
      {error && (
        <p className="text-red-700">
          error while fecthing data, check your origin
        </p>
      )}
      {/* Dish Item with Add Button */}
      {dishes.map((recipe) => {
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
