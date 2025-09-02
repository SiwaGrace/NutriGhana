import { Plus, Check } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleSaved } from "../../slices/getAllDishes";

const SaveButton = ({ recipe }) => {
  const dispatch = useDispatch();

  const handleSave = (e) => {
    e.stopPropagation();
    dispatch(toggleSaved(recipe._id));
    // Save to localStorage
  };

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
