import { useSelector } from "react-redux";
import DishesSuggestion from "../components/dishesComponents/DishesSuggestion";
import SearchBar from "../components/dishesComponents/SearchBar";
import DishCategory from "../components/dishesComponents/DishCategory";
import { useState } from "react";
import DishFilters from "../components/dishesComponents/DishFilters";

export default function ProfileDishes() {
  const { dishes, favorites, savedIds } = useSelector((state) => state.dishes);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  return (
    <div className="pt-5 px-4 bg-white text-black">
      {/* Title */}
      <h2 className="text-3xl font-semibold mb-6 text-center text-black">
        Ghanaian Dishes
      </h2>
      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      {/* Filters */}
      <DishFilters
        setFilter={setFilter}
        dishes={dishes}
        filter={filter}
        favorites={favorites}
        savedIds={savedIds}
      />
      {/* Dish Suggestion List */}
      <div>
        <div className="">
          <DishesSuggestion searchTerm={searchTerm} filter={filter} />
        </div>
      </div>
    </div>
  );
}
