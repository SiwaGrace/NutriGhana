import DishesSuggestion from "../components/DishesSuggestion";

export default function ProfileDishes() {
  return (
    <div className="pt-18 px-4">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-2 text-center">Dish</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search dish"
        className="w-full p-2 border rounded-md mb-4"
      />

      {/* Filters */}
      <div className="flex gap-4 text-gray-500 mb-4">
        <button className="font-semibold text-black">All</button>
        <button>Favorite</button>
        <button>Saved scans</button>
      </div>

      {/* Dish Suggestion List */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Suggestions</h3>
        <div className="grid gap-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <DishesSuggestion key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
