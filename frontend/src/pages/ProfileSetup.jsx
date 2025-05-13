import { useState, useEffect } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function ProfileSetup() {
  const [gender, setGender] = useState("");
  const [year, setYear] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [step, setStep] = useState(1);
  const [age, setAge] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [dietaryGoal, setDietaryGoal] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [currentWeightGoal, setCurrentWeightGoal] = useState("");

  const navigate = useNavigate();

  const years = Array.from({ length: 26 }, (_, i) => 1995 + i);
  const heightOptions = [
    "4'6\"",
    "5'0\"",
    "5'4\"",
    "5'8\"",
    "6'0\"",
    "6'4\"",
    "6'8\"",
  ];
  const weightOptions = [
    "Under 100 lbs",
    "100-120 lbs",
    "121-140 lbs",
    "141-160 lbs",
    "161-180 lbs",
    "181+ lbs",
    "181-200 lbs",
    "201-220 lbs",
    "220+ lbs",
  ];
  const howActive = ["Not active", "Lightly Active", "Active", "Very Active"];
  const dietaryGoals = [
    "Weight loss",
    "Weight gain",
    "Muscle gain",
    "Maintenance",
  ];
  const currentWeightOptions = weightOptions;
  const CurrentWeightGoalOptions = weightOptions;

  useEffect(() => {
    if (step === 6) {
      const timer = setTimeout(() => {
        navigate("/ProfileHome");
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [step, navigate]);

  const resetForm = () => {
    setGender("");
    setYear("");
    setHeight("");
    setWeight("");
    setAge("");
    setActivityLevel("");
    setDietaryGoal("");
    setCurrentWeight("");
    setCurrentWeightGoal("");
    setStep(1);
  };

  const handleNext = () => {
    if (
      !gender ||
      !year ||
      (step === 2 && (!height || !weight)) ||
      (step === 3 && !activityLevel) ||
      (step === 4 && !dietaryGoal) ||
      (step === 5 && (!currentWeight || !currentWeightGoal))
    ) {
      alert("Please fill out all fields.");
      return;
    }

    if (step === 5) {
      setStep(6);
      return;
    }

    if (step < 6) {
      setStep(step + 1);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 h-screen justify-center space-y-12">
      {step === 1 && (
        <>
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Let’s set your profile!
          </h2>
          <div className="w-full mb-6">
            <p className="text-lg font-bold mb-2">Gender</p>
            <div className="flex gap-6 items-center justify-center">
              {["Male", "Female"].map((g) => (
                <button
                  key={g}
                  className={`px-14 py-6 rounded-full text-sm font-bold border transition duration-200 cursor-pointer ${
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
            <p className="text-lg font-bold mb-2">Year of Birth</p>
            <div className="scrollable-container w-full flex flex-col items-center gap-2 max-h-60 overflow-y-auto">
              {years.map((yr) => (
                <button
                  key={yr}
                  className={`w-full py-5 px-6 text-lg font-bold transition duration-200 cursor-pointer ${
                    year === String(yr)
                      ? "bg-gray-300 text-black"
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
            className="bg-yellow-500 px-12 py-6 w-full rounded-full text-lg font-semibold text-white transition duration-200 hover:bg-yellow-600 mt-6 cursor-pointer"
            onClick={handleNext}
          >
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Height and Weight
          </h2>

          <div className="w-full mb-6">
            <p className="text-lg font-bold mb-2">Height</p>
            <div className="scrollable-container w-full flex flex-col items-center gap-2 max-h-40 overflow-y-auto">
              {heightOptions.map((option) => (
                <button
                  key={option}
                  className={`w-full py-5 rounded-md text-lg font-bold transition duration-200 cursor-pointer ${
                    height === option
                      ? "bg-gray-300"
                      : "text-black hover:bg-gray-400"
                  }`}
                  onClick={() => setHeight(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full mb-6">
            <p className="text-lg font-bold mb-2">Weight</p>
            <div className="scrollable-container w-full flex flex-col items-center gap-2 max-h-40 overflow-y-auto">
              {weightOptions.map((option) => (
                <button
                  key={option}
                  className={`w-full py-5 rounded-md text-sm font-medium transition duration-200 cursor-pointer ${
                    weight === option
                      ? "bg-gray-300"
                      : "text-black hover:bg-gray-200"
                  }`}
                  onClick={() => setWeight(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between w-full mt-6">
            <button
              className="bg-yellow-500 px-12 py-6 w-full rounded-full text-lg font-semibold text-white transition duration-200 hover:bg-yellow-600 sm:w-auto cursor-pointer"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            How active are you
          </h2>

          <div className="w-full flex flex-col items-center gap-4">
            {howActive.map((preference) => (
              <button
                key={preference}
                className={`w-[284px] h-[68px] py-4 rounded-full text-lg font-bold transition bg-white justify-center items-center flex border border-gray-300 cursor-pointer${
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

          <div className="flex justify-between w-full mt-10">
            <button
              className="bg-yellow-500 px-12 py-6 w-full rounded-full text-lg font-semibold text-white transition duration-200 hover:bg-yellow-600 sm:w-auto cursor-pointer"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            What is your dietary goal?
          </h2>

          <div className="w-full flex flex-col items-center gap-4">
            {dietaryGoals.map((preference) => (
              <button
                key={preference}
                className={`w-[284px] h-[68px] py-4 rounded-full text-lg font-bold transition bg-white justify-center items-center flex border border-gray-300 cursor-pointer${
                  dietaryGoal === preference
                    ? " bg-yellow-500 text-white"
                    : " text-black"
                }`}
                onClick={() => setDietaryGoal(preference)}
              >
                {preference}
              </button>
            ))}
          </div>

          <div className="flex justify-between w-full mt-10">
            <button
              className="bg-yellow-500 px-12 py-6 w-full rounded-full text-lg font-semibold text-white transition duration-200 hover:bg-yellow-600 sm:w-auto cursor-pointer"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Current and Goal Weight
          </h2>

          <div className="w-full mb-6">
            <p className="text-lg font-bold mb-2">Current Weight</p>
            <div className="scrollable-container w-full flex flex-col items-center gap-2 max-h-40 overflow-y-auto">
              {currentWeightOptions.map((option) => (
                <button
                  key={option}
                  className={`w-full py-5 rounded-md text-sm font-medium transition duration-200 cursor-pointer${
                    currentWeight === option
                      ? " bg-gray-300"
                      : " text-black hover:bg-gray-200"
                  }`}
                  onClick={() => setCurrentWeight(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full mb-6">
            <p className="text-lg font-bold mb-2">Weight Goal</p>
            <div className="scrollable-container w-full flex flex-col items-center gap-2 max-h-40 overflow-y-auto">
              {CurrentWeightGoalOptions.map((option) => (
                <button
                  key={option}
                  className={`w-full py-5 rounded-md text-sm font-medium transition duration-200 cursor-pointer${
                    currentWeightGoal === option
                      ? " bg-gray-300"
                      : " text-black hover:bg-gray-200"
                  }`}
                  onClick={() => setCurrentWeightGoal(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <button
            className="bg-yellow-500 px-12 py-6 w-full rounded-full text-lg font-semibold text-white transition duration-200 hover:bg-yellow-600 mt-6 cursor-pointer"
            onClick={handleNext}
          >
            Submit
          </button>
        </>
      )}

      {step === 6 && (
        <>
          <IoMdCheckmarkCircle className="text-green-500 text-[180px]" />
          <h2 className="text-4xl font-medium text-center text-black">
            Profile successfully created!
          </h2>
          <p className="mt-2 text-gray-600 text-sm text-center">
            Redirecting to your dashboard in 10 seconds...
          </p>
          <button
            onClick={() => {
              resetForm();
              setStep(1);
            }}
            className="mt-6 bg-yellow-500 px-12 py-4 rounded-full text-lg font-semibold text-white hover:bg-yellow-600 cursor-pointer"
          >
            Start Over
          </button>
        </>
      )}
    </div>
  );
}
