import React from "react";
import { useSelector } from "react-redux";

const DishFilters = ({ dishes, setFilter, filter, favorites, savedIds }) => {
  const { allDishes } = useSelector((state) => state.dishes);

  const filterOptions = [
    "all",
    "favorite",
    "saved",
    "breakfast",
    "lunch",
    "dinner",
    "snack",
    "drink",
  ];
  return (
    <div className="my-6">
      <h2 className="text-black font-bold text-xl my-4 capitalize">
        Categories
      </h2>
      <div
        className="flex gap-6 mb-8 overflow-x-auto scrollbar-hide   py-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {filterOptions.map((type) => {
          // Calculate count based on type
          let count;
          count = allDishes.filter((d) => d.category === type).length;
          if (type === "all") count = allDishes.length;
          if (type === "favorite")
            count = Object.values(favorites).filter(Boolean).length;
          if (type === "saved") count = savedIds.length;

          return (
            <button
              key={type}
              aria-label={`Filter dishes by ${type}`}
              className={`flex items-center gap-1 font-semibold capitalize cursor-pointer whitespace-nowrap  text-gray-700 border-gray-300 px-5 py-1 rounded-full border  ${
                filter === type
                  ? "  bg-yellow-500 text-white border-yellow-500"
                  : ""
              }`}
              onClick={() => setFilter(type)}
            >
              <span>{type === "saved" ? "Saved Dishes" : type}</span>
              <span>({count})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DishFilters;
