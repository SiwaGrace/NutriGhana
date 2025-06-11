import React from "react";
import Kenkey from "../assets/img/Kenkey.jpg";
// StreakBlackIcon
import StreakIcon from "../assets/logo&icons/Vector.svg";

const FoodLogCard = () => {
  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md mt-2">
        <div className="flex items-center gap-3">
          <img
            src={Kenkey}
            alt="Kenkey with pepper"
            className="w-12 h-12 rounded-lg"
          />
          <div>
            <h4 className="text-sm font-semibold">Kenkey with pepper</h4>
            <div className="flex items-center text-gray-500 text-xs gap-1">
              <img src={StreakIcon} alt="Fire" className="w-4 h-4" />
              <span>106 cal</span>
            </div>
          </div>
        </div>
      </div>
      {/* Recently Logged Section */}
      {/* <div className="mt-6">
        <h3 className="text-md font-semibold mb-2 text-black">
          Recently Logged
        </h3>
        {recentlyLogged.length > 0 ? (
          recentlyLogged.map((dish) => (
            <div
              key={dish.id}
              className="flex items-center gap-2 p-2 border rounded-md shadow-sm"
            >
              <img
                src={dish.image}
                alt={dish.title}
                className="w-10 h-10 rounded object-cover"
              />
              <div>
                <p className="font-medium">{dish.title}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No dishes logged yet.</p>
        )}
      </div> */}
    </>
  );
};

export default FoodLogCard;
