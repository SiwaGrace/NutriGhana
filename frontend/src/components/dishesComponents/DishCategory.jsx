import React, { useState } from "react";
// {
//   selectedFilter, onFilterChange;
// }
const DishCategory = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const onFilterChange = (filter) => {
    setSelectedFilter(filter);
  };
  const categoryOptions = ["breakfast", "lunch", "dinner", "snacks"];
  const fetchDishesByCategory = async (category) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/dishes/category/${category}`
      );
      const data = await res.json();
      console.log(data);
      setDishes(data);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };
  return (
    <div>
      {/* category Buttons */}
      <div className="my-6">
        <h2 className="text-black font-bold text-xl my-2 capitalize">
          Filters
        </h2>
        <div className="flex gap-2 flex-wrap">
          {categoryOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-3 py-1 rounded-full border cursor-pointer ${
                selectedFilter === filter
                  ? "bg-purple-500 text-white border-purple-500"
                  : "bg-white text-gray-700 border-gray-300"
              } text-sm font-semibold`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DishCategory;
