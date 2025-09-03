import { Plus, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSaved } from "../../slices/getAllDishes";

const SaveButton = ({ recipeId }) => {
  const dispatch = useDispatch();
  const recipe = useSelector((state) =>
    state.dishes.allDishes.find((d) => d._id === recipeId)
  );

  const handleSave = (e) => {
    e.stopPropagation();
    dispatch(toggleSaved(recipeId));
  };

  if (!recipe) return null;

  return (
    <button onClick={handleSave} className="cursor-pointer">
      {recipe.saved ? (
        <Check size={24} className="text-green-600" />
      ) : (
        <Plus size={24} className="text-gray-400" />
      )}
    </button>
  );
};

export default SaveButton;
