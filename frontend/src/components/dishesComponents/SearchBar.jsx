import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({
  searchTerm,
  onSearchChange,
  selectedFilter,
  onFilterChange,
}) => {
  const filterOptions = [
    "All",
    "Diary",
    "Non-Diary",
    "Carbs",
    "Protein",
    "Fat",
    "Drinks",
    "Breakfast",
    "Dinner",
  ];

  return (
    <div className="mb-4">
      {/* Search Input with Icon */}
      <div className="relative mb-4">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          size={18}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search dishes"
          className="w-full pl-10 p-2 border rounded-[50px] border-gray-300 bg-[#dddedf]"
        />
      </div>

      {/* Filter Buttons */}
      <div>
        <h2 className="text-black font-bold text-xl my-2 capitalize">
          Filters
        </h2>
        <div className="flex gap-2 flex-wrap">
          {filterOptions.map((filter) => (
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

export default SearchBar;
