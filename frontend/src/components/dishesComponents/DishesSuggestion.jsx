import React, { useEffect } from "react";
import { syncWithDishes, clearFoods } from "../../slices/loggedFoodsSlice";

// HeartFilled
import { Flame } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDishes,
  setSelectedDish,
  filterDishes,
} from "../../slices/getAllDishes";
import Loading from "./Loading";
import Error from "./Error";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import SaveButton from "./SaveButton";

const DishesSuggestion = ({ searchTerm, filter, category }) => {
  // const [visibleDishId, setVisibleDishId] = useState(null);

  const navigate = useNavigate();
  const { dishes, isLoading, error } = useSelector((state) => state.dishes);

  // dispatch
  const dispatch = useDispatch();
  // fetch all dishes on mount
  useEffect(() => {
    dispatch(getDishes()).then((res) => {
      if (res.payload) {
        dispatch(syncWithDishes(res.payload)); // ✅ cleanup loggedFoods
      }
    });
  }, [dispatch]);
  // local filtering for favorite/saved/category
  useEffect(() => {
    dispatch(filterDishes(filter));
  }, [filter, dispatch]);

  // Frontend local filtering(saved/favorite)
  const filteredDishes = dishes
    .filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        const calories = recipe.nutrients?.find((n) => n.name === "Calories");
        return (
          <div
            key={recipe._id}
            className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md border border-gray-300 cursor-pointer"
            onClick={() => {
              dispatch(setSelectedDish(recipe));
              localStorage.setItem("selectedDish", JSON.stringify(recipe));
              navigate("/food"); // or your actual route
            }}
          >
            <div className="flex items-center gap-3">
              <img
                src={recipe.imageUrl}
                alt="Kenkey with pepper"
                className="w-12 h-12 rounded-md object-cover"
              />
              <div>
                <p className="font-semibold">{recipe.name}</p>

                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Flame size={14} />{" "}
                  {calories ? `${calories.amount} ${calories.unit}` : "No data"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {/* Favorite (Love) Button */}

              <FavoriteButton recipeId={recipe._id} />
              {/* Save (Plus) Button */}
              <SaveButton recipeId={recipe._id} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DishesSuggestion;
