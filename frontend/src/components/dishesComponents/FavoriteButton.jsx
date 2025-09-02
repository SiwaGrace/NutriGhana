import { Heart } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleFavorite } from "../../slices/getAllDishes";

const FavoriteButton = ({ recipe }) => {
  const dispatch = useDispatch();

  const handleFavorite = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(recipe._id));
  };

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
