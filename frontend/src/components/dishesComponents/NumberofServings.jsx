import React from "react";

const NumberofServings = ({
  servings,
  measurement,
  setMeasurement,
  setServings,
}) => {
  return (
    <div className="mb-4">
      {" "}
      <p className=" mb-2 text-xl font-bold">Measurement</p>
      <div className="flex space-x-2 mb-4">
        {["Bowl", "Balls", "Pcs"].map((option) => (
          <button
            key={option}
            className={`px-4 py-2 rounded-full cursor-pointer ${
              measurement === option
                ? "bg-yellow-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setMeasurement(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {/* Number of Servings */}
      <div className="mb-4 flex justify-between">
        <p className="text-gray-500 ">Number of servings</p>
        <input
          type="number"
          value={servings}
          min="1"
          className="w-16 text-center border rounded-4xl"
          onChange={(e) => setServings(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default NumberofServings;
