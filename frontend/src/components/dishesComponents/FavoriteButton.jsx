import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../slices/getAllDishes";

const FavoriteButton = ({ recipeId }) => {
  const dispatch = useDispatch();
  const recipe = useSelector((state) =>
    state.dishes.allDishes.find((d) => d._id === recipeId)
  );

  const handleFavorite = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(recipeId));
  };

  if (!recipe) return null;

  return (
    <button onClick={handleFavorite} className="cursor-pointer">
      <Heart
        size={24}
        className={recipe.favorite ? "text-orange-300" : "text-gray-400"}
        strokeWidth={2}
        fill={recipe.favorite ? "orange" : "none"}
      />
    </button>
  );
};

export default FavoriteButton;
