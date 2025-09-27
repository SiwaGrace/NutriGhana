import { useState, useEffect } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "../index.css";

// Helper: Calculate BMR and calories
function calculateCalories({
  gender,
  age,
  height,
  weight,
  activityLevel,
  goal,
}) {
  // Mifflin-St Jeor Equation
  let bmr =
    gender === "Male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  // Activity multiplier
  const activityMap = {
    "Not active": 1.2,
    "Lightly Active": 1.375,
    Active: 1.55,
    "Very Active": 1.725,
  };
  let calories = bmr * (activityMap[activityLevel] || 1.2);

  // Goal adjustment
  if (goal === "Weight loss") calories -= 500;
  if (goal === "Weight gain" || goal === "Muscle gain") calories += 800;

  return Math.round(calories);
}

// Helper: Convert cm to feet and inches
function cmToFeetInches(cm) {
  const totalInches = Math.round(cm / 2.54);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return `${feet}'${inches}"`;
}

export default function ProfileSetup() {
  const [gender, setGender] = useState("");
  const [year, setYear] = useState("");
  const [height, setHeight] = useState(""); // in cm
  const [step, setStep] = useState(1);
  const [activityLevel, setActivityLevel] = useState("");
  const [dietaryGoal, setDietaryGoal] = useState("");
  const [currentWeight, setCurrentWeight] = useState(""); // in kg
  const [currentWeightGoal, setCurrentWeightGoal] = useState("");
  const [error, setError] = useState("");
  const [calories, setCalories] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // make sure you define this in your .env
  const [backendCalories, setBackendCalories] = useState(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, i) => currentYear - i);
  const heightOptions = Array.from({ length: 41 }, (_, i) => 140 + i); // 140-180cm
  const weightOptions = Array.from({ length: 91 }, (_, i) => 40 + i); // 40-130kg
  const howActive = ["Not active", "Lightly Active", "Active", "Very Active"];
  const dietaryGoals = [
    "Weight loss",
    "Weight gain",
    "Muscle gain",
    "Maintenance",
  ];

  // Auto-redirect to home after success step
  useEffect(() => {
    if (step === 6) {
      const timer = setTimeout(() => {
        navigate("/home");
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [step, navigate]);

  // Calculate calories whenever info changes
  useEffect(() => {
    if (
      gender &&
      year &&
      height &&
      activityLevel &&
      dietaryGoal &&
      currentWeight
    ) {
      const age = currentYear - Number(year);
      setCalories(
        calculateCalories({
          gender,
          age,
          height: Number(height),
          weight: Number(currentWeight),
          activityLevel,
          goal: dietaryGoal,
        })
      );
    }
  }, [gender, year, height, activityLevel, dietaryGoal, currentWeight]);

  const resetForm = () => {
    setGender("");
    setYear("");
    setHeight("");
    setActivityLevel("");
    setDietaryGoal("");
    setCurrentWeight("");
    setCurrentWeightGoal("");
    setStep(1);
    setError("");
    setCalories(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const userData = {
      gender,
      year,
      height,
      activityLevel,
      dietaryGoal,
      currentWeight,
      currentWeightGoal,
      calories,
    };

    try {
      const response = await fetch(`${backendUrl}/api/auth/create-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();

        // Always save a calories value to localStorage (backend or calculated)
        const caloriesToSave = data.recommendedCalories ?? calories;
        if (caloriesToSave) {
          setBackendCalories(data.recommendedCalories);
          localStorage.setItem("recommendedCalories", String(caloriesToSave));
        }

        setStep(6);
      } else {
        setError("Failed to submit. Try again.");
      }
    } catch {
      setError("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setError("");

    if (step === 1 && (!gender || !year)) {
      setError("Please select your gender and year of birth.");
      return;
    }
    if (step === 2 && !height) {
      setError("Please select your height.");
      return;
    }
    if (step === 3 && !activityLevel) {
      setError("Please select your activity level.");
      return;
    }
    if (step === 4 && !dietaryGoal) {
      setError("Please select your dietary goal.");
      return;
    }
    if (step === 5 && (!currentWeight || !currentWeightGoal)) {
      setError("Please select your current and goal weight.");
      return;
    }

    if (step === 5) {
      handleSubmit(); // submit on last step
    } else {
      setStep(step + 1);
    }
  };

  // Progress bar labels

  return (
    <div className="flex flex-col items-center p-6 h-screen justify-center space-y-8 bg-white text-black">
      {/* Progress Bar */}

      {error && <div className="text-red-500 font-semibold mb-2">{error}</div>}

      {/* Step 1: Gender + Year */}
      {step === 1 && (
        <>
          <h2 className="text-3xl font-[300] text-center mb-6 text-black leading-snug tracking-wide">
            Let’s set <br /> your profile!
          </h2>

          <div className="w-full mb-6">
            <p className="text-xl  font-[500]  mb-6 text-black leading-loose tracking-wide">
              Gender
            </p>
            <div className="flex gap-6 items-center justify-center">
              {["Male", "Female"].map((g) => (
                <button
                  key={g}
                  className={`px-14 py-6 rounded-full text-sm font-bold border transition duration-200 cursor-pointer tracking-wide ${
                    gender === g
                      ? "bg-yellow-500 text-white"
                      : "border-gray-300 hover:border-yellow-500"
                  }`}
                  onClick={() => setGender(g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full mb-8">
            <p className="text-lg font-[500]  mb-6 text-black leading-loose tracking-wide">
              Year of Birthday
            </p>
            <div className="scrollable-container font-light tracking-wide  w-full flex flex-col items-center gap-2 max-h-60 overflow-y-auto">
              {years.map((yr) => (
                <button
                  key={yr}
                  className={`w-full py-3 px-6 text-lg font-light tracking-wide   transition duration-200 cursor-pointer ${
                    year === String(yr)
                      ? "bg-gray-200 text-black "
                      : "text-black hover:bg-gray-400"
                  }`}
                  onClick={() => setYear(String(yr))}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>
          <button
            className="bg-yellow-500 px-12 py-6 w-full rounded-full text-lg font-semibold text-white transition duration-200 hover:bg-yellow-600 mt-6 cursor-pointer sm:w-[280px]"
            onClick={handleNext}
          >
            Next
          </button>
        </>
      )}

      {/* Step 2: Height */}
      {step === 2 && (
        <>
          <h2 className="text-3xl font-[300] text-center mb-6 text-black leading-snug tracking-wide">
            Height
          </h2>
          <div className="w-full mb-6">
            <p className="text-lg font-[500]  mb-6 text-black leading-loose tracking-wide">
              Height (ft/in)
            </p>
            <div className="scrollable-container w-full flex flex-col items-center gap-2 max-h-90 overflow-y-auto">
              {heightOptions.map((option) => (
                <button
                  key={option}
                  className={`w-full py-3 rounded-md text-lg tracking-wide  font-bold transition duration-200 cursor-pointer ${
                    height === String(option)
                      ? "bg-gray-200"
                      : "text-black hover:bg-gray-300"
                  }`}
                  onClick={() => setHeight(String(option))}
                >
                  {cmToFeetInches(option)} ({option} cm)
                </button>
              ))}
            </div>
          </div>
          <button
            className="bg-yellow-500 px-12 py-6 w-full rounded-full text-lg font-semibold text-white transition duration-200 hover:bg-yellow-600 mt-6 cursor-pointer sm:w-[280px]"
            onClick={handleNext}
          >
            Next
          </button>
        </>
      )}

      {/* Step 3: Activity */}
      {step === 3 && (
        <>
          <h2 className="text-3xl font-[300] text-center mb-24 text-black leading-snug tracking-wide">
            How active are you?
          </h2>
          <div className="w-full flex flex-col items-center gap-4">
            {howActive.map((preference) => (
              <button
                key={preference}
                className={`w-[284px] h-[68px] py-4 rounded-full text-xl font-light tracking-wide transition bg-white justify-center items-center flex border border-gray-300 cursor-pointer${
                  activityLevel === preference
                    ? " bg-yellow-500 text-white"
                    : " text-black"
                }`}
                onClick={() => setActivityLevel(preference)}
              >
                {preference}
              </button>
            ))}
          </div>
          <button
            className="bg-yellow-500 px-12 py-6 w-full rounded-full text-lg font-semibold text-white transition duration-200 hover:bg-yellow-600 mt-6 cursor-pointer sm:w-[280px]"
            onClick={handleNext}
          >
            Next
          </button>
        </>
      )}

      {/* Step 4: Dietary Goal */}
      {step === 4 && (
        <>
          <h2 className="text-3xl font-[300] text-center mb-24 text-black leading-snug tracking-wide">
            What is your dietary goal?
          </h2>
          <div className="w-full flex flex-col items-center gap-4">
            {dietaryGoals.map((preference) => (
              <button
                key={preference}
                className={`w-[284px] h-[68px] py-4 rounded-full text-xl font-light tracking-wide transition bg-white justify-center items-center flex border border-gray-300 cursor-pointer ${
                  dietaryGoal === preference
                    ? "bg-yellow-500 text-white"
                    : "text-black"
                }`}
                onClick={() => setDietaryGoal(preference)}
              >
                {preference}
              </button>
            ))}
          </div>
          <button
            className="bg-yellow-500 px-12 py-6 w-full rounded-full text-lg font-semibold text-white transition duration-200 hover:bg-yellow-600 mt-6 cursor-pointer sm:w-[280px]"
            onClick={handleNext}
          >
            Next
          </button>
        </>
      )}

      {/* Step 5: Weight */}
      {step === 5 && (
        <>
          <h2 className="text-3xl font-[300] text-center mb-6 text-black leading-snug tracking-wide">
            Current and Goal Weight
          </h2>
          <div className="w-full mb-6">
            <p className="text-lg font-[500]  mb-6 text-black leading-loose tracking-wide">
              Current Weight (kg)
            </p>
            <div className="scrollable-container w-full flex flex-col items-center gap-2 max-h-40 overflow-y-auto">
              {weightOptions.map((option) => (
                <button
                  key={option}
                  className={`w-full py-3 rounded-md text-lg  tracking-wide  font-bold transition duration-200 cursor-pointer${
                    currentWeight === String(option)
                      ? " bg-gray-300"
                      : " text-black hover:bg-gray-200"
                  }`}
                  onClick={() => setCurrentWeight(String(option))}
                >
                  {option} kg
                </button>
              ))}
            </div>
          </div>
          <div className="w-full mb-6">
            <p className="text-lg font-[500]  mb-6 text-black leading-loose tracking-wide">
              Weight Goal (kg)
            </p>
            <div className="scrollable-container w-full flex flex-col items-center gap-2 max-h-40 overflow-y-auto">
              {weightOptions.map((option) => (
                <button
                  key={option}
                  className={`w-full py-3 rounded-md text-lg  tracking-wide  font-bold transition duration-200 cursor-pointer${
                    currentWeightGoal === String(option)
                      ? " bg-gray-300"
                      : " text-black hover:bg-gray-200"
                  }`}
                  onClick={() => setCurrentWeightGoal(String(option))}
                >
                  {option} kg
                </button>
              ))}
            </div>
          </div>
          <button
            className="bg-yellow-500 px-12 py-6 w-full rounded-full text-lg font-semibold text-white transition duration-200 hover:bg-yellow-600 mt-6 cursor-pointer disabled:opacity-50"
            onClick={handleNext}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </>
      )}

      {/* Step 6: Success */}
      {step === 6 && (
        <>
          <IoMdCheckmarkCircle className="text-green-500 text-[180px]" />
          <h2 className="text-4xl font-medium text-center text-black">
            Profile successfully created!
          </h2>
          {(backendCalories ?? calories) && (
            <div className="mt-4 text-xl text-center text-gray-700">
              Your recommended daily calories:{" "}
              <span className="font-bold text-yellow-600">
                {backendCalories ?? calories} kcal
              </span>
            </div>
          )}

          <p className="mt-2 text-gray-600 text-sm text-center">
            Redirecting to your dashboard in 10 seconds...
          </p>
          <button
            onClick={resetForm}
            className="bg-yellow-500 px-12 py-6 w-full rounded-full text-lg font-semibold text-white transition duration-200 hover:bg-yellow-600 mt-6 cursor-pointer sm:w-[280px]"
          >
            Start Over
          </button>
        </>
      )}
    </div>
  );
}
