import DishesSuggestion from "../components/dishesComponents/DishesSuggestion";
import SearchBar from "../components/dishesComponents/SearchBar";
import { useState } from "react";

export default function ProfileDishes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  return (
    <div className="pt-18 px-4">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-2 text-center">Dish</h2>

      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      {/* Filters */}
      <div className="flex gap-4 text-gray-500 mb-4">
        {["all", "favorite", "saved"].map((type) => (
          <button
            key={type}
            className={`font-semibold capitalize cursor-pointer ${
              filter === type ? "text-black underline" : ""
            }`}
            onClick={() => setFilter(type)}
          >
            {type === "saved" ? "Saved scans" : type}
          </button>
        ))}
      </div>

      {/* Dish Suggestion List */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Suggestions</h3>
        <div className="">
          <DishesSuggestion searchTerm={searchTerm} filter={filter} />
        </div>
      </div>
    </div>
  );
}
