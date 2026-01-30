import React from "react";
// StreakBlackIcon
import StreakIcon from "../../assets/logo&icons/Vector.svg";

const FoodLogCard = ({ dish }) => {
  const calories = dish.nutrients?.find((n) => n.name === "Calories");
  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md mt-2">
        <div className="flex items-center gap-3">
          <img
            src={dish.dishImageUrl}
            alt={dish.dishName}
            className="w-12 h-12 rounded-lg"
          />
          <div>
            <h4 className="text-sm font-semibold">{dish.dishName}</h4>
            <div className="flex items-center text-gray-500 text-xs gap-1">
              <img src={StreakIcon} alt="Fire" className="w-4 h-4" />
              <span>
                {}
                {dish.total.calories} kcal
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodLogCard;
