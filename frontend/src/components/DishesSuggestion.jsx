import React, { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import Kenkey from "../assets/img/kenkey.jpg";
import axios from "axios";
const apiKey = import.meta.env.VITE_SPOON_API_KEY;

const DishesSuggestion = () => {
  //
  const [dish, setDish] = useState([]);
  const getDishes = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`
      );
      console.log(response.data.results);
      setDish(response.data.results);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDishes();
  }, []);
  return (
    <div>
      {/* Dish Item with View Button */}
      {/* <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md mb-2 border">
        <div className="flex items-center gap-3">
          <img
            src={Kenkey}
            alt="Kenkey with pepper"
            className="w-12 h-12 rounded-md object-cover"
          />
          <div>
            <p className="font-semibold">Kenkey with pepper</p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Flame size={14} /> 106 cal
            </p>
          </div>
        </div>
        <button className="bg-yellow-400 text-white px-3 py-1 rounded-lg text-sm">
          View
        </button>
      </div> */}

      {/* Dish Item with Add Button */}
      {dish.map((dis) => (
        <div
          key={dis.id}
          className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md border border-gray-300"
        >
          <div className="flex items-center gap-3">
            <img
              src={dis.image}
              alt="Kenkey with pepper"
              className="w-12 h-12 rounded-md object-cover"
            />
            <div>
              <p className="font-semibold">{dis.title}</p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Flame size={14} /> 106 cal
              </p>
            </div>
          </div>
          <button className="bg-gray-200 text-black px-3 py-1 rounded-lg text-sm">
            +
          </button>
        </div>
      ))}
    </div>
  );
};

export default DishesSuggestion;
