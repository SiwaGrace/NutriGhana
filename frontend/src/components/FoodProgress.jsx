// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const foodItems = [
//   {
//     image: "/src/assets/food1.jpg",
//     name: "Spaghetti Bolognese",
//     description:
//       "A classic Italian pasta dish with a rich and savory meat sauce.",
//   },
//   {
//     image: "/src/assets/food2.webp",
//     name: "Chicken Curry",
//     description:
//       "A flavorful and aromatic curry made with tender chicken and a blend of spices.",
//   },
//   {
//     image: "/src/assets/food3.jpg",
//     name: "Vegetable Stir-Fry",
//     description:
//       "A healthy and colorful stir-fry with fresh vegetables and a light soy sauce.",
//   },
// ];

// export default function FoodProgress() {
//   const [progress, setProgress] = useState(0);
//   const navigate = useNavigate();

//   const handleNext = () => {
//     if (progress < foodItems.length - 1) {
//       setProgress(progress + 1);
//     } else {
//       navigate("/login");
//     }
//   };

//   return (
//     <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
//       {/* Skip Button */}
//       <div className="flex justify-end">
//         <button
//           onClick={() => navigate("/login")}
//           className="text-gray-500 text-sm"
//         >
//           skip
//         </button>
//       </div>

//       {/* Progress Indicator */}
//       <div className="flex gap-2 mt-2">
//         {foodItems.map((_, index) => (
//           <div
//             key={index}
//             className={`h-1 flex-1 rounded-full ${
//               progress >= index ? "bg-yellow-400" : "bg-gray-300"
//             }`}
//           ></div>
//         ))}
//       </div>

//       {/* Food Image, Name and Description */}
//       <div className="mt-4">
//         <img
//           src={foodItems[progress].image}
//           alt={foodItems[progress].name}
//           className="w-full rounded-xl shadow-md"
//         />
//         <h3 className="mt-2 text-xl font-semibold">
//           {foodItems[progress].name}
//         </h3>
//         <p className="mt-1 text-gray-600 text-sm">
//           {foodItems[progress].description}
//         </p>
//       </div>

//       {/* Next Button */}
//       <div className="mt-4 flex justify-center">
//         <button
//           onClick={handleNext}
//           className="bg-yellow-400 text-white px-4 py-2 rounded-lg shadow-md"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }
// //
