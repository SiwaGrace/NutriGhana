import { useSelector } from "react-redux";
import DishesSuggestion from "../components/dishesComponents/DishesSuggestion";
import SearchBar from "../components/dishesComponents/SearchBar";
import { useState } from "react";

export default function ProfileDishes() {
  const { dishes, favorites, savedIds } = useSelector((state) => state.dishes);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  return (
    <div className="pt-5 px-4 bg-white text-black">
      {/* Title */}
      <h2 className="text-3xl font-semibold mb-2 text-center text-black">
        Ghanaian Dishes
      </h2>

      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      {/* Filters */}
      <div className="flex gap-4 text-gray-500 mb-4">
        {["all", "favorite", "saved"].map((type) => {
          // Calculate count based on type
          let count = 0;
          if (type === "all") count = dishes.length;
          if (type === "favorite")
            count = Object.values(favorites).filter(Boolean).length;
          if (type === "saved") count = savedIds.length;
          return (
            <button
              key={type}
              aria-label={`Filter dishes by ${type}`}
              className={`font-semibold capitalize cursor-pointer ${
                filter === type ? "text-black underline" : ""
              }`}
              onClick={() => setFilter(type)}
            >
              {type === "saved" ? "Saved Dishes" : type} ({count})
            </button>
          );
        })}
      </div>

      {/* Dish Suggestion List */}
      <div>
        <div className="">
          <DishesSuggestion searchTerm={searchTerm} filter={filter} />
        </div>
      </div>
    </div>
  );
}
