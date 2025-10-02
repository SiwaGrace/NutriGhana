// export const createLog = asyncHandler(async (req, res) => {
//   const { date, foods } = req.body;

//   if (!foods || foods.length === 0) {
//     res.status(400);
//     throw new Error("No foods to log");
//   }

//   // Check if a log exists for this user and date
//   let log = await Log.findOne({ userId: req.user._id, date });

//   const calculateTotals = (foods) => {
//     return foods.reduce(
//       (acc, food) => {
//         acc.calories += food.total.calories || 0;
//         acc.protein += food.total.protein || 0;
//         acc.carbs += food.total.carbs || 0;
//         acc.fat += food.total.fat || 0;
//         return acc;
//       },
//       { calories: 0, protein: 0, carbs: 0, fat: 0 }
//     );
//   };

//   if (log) {
//     // Append new foods
//     log.foods.push(...foods);
//     log.totals = calculateTotals(log.foods);
//     await log.save();
//   } else {
//     // Create a new log
//     log = await Log.create({
//       userId: req.user._id,
//       date,
//       foods,
//       totals: calculateTotals(foods),
//     });
//   }

//   res.status(201).json(log);
// });
