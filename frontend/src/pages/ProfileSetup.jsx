import { useState, useEffect } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import "../index.css";

export default function ProfileSetup() {
  const [gender, setGender] = useState("");
  const [year, setYear] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [step, setStep] = useState(1);
  const [age, setAge] = useState("");
  const [activityLevel, setActivityLevel] = useState(""); // For step 3
  const [dietaryGoal, setDietaryGoal] = useState(""); // For step 4
  const [cureentWeight, setcurrentWeight] = useState("");
  const [currentWeightGoal, setcurrentWeightGoal] = useState("");

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
  const currentWeightOptions = [
    "4'6\"",
    "5'0\"",
    "5'4\"",
    "5'8\"",
    "6'0\"",
    "6'4\"",
    "6'8\"",
  ];
  const CurrentWeightGoalOptions = [
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

  // Initialize the profile if it's already saved in localStorage
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (savedProfile) {
      setGender(savedProfile.gender);
      setYear(savedProfile.year);
      setHeight(savedProfile.height);
      setWeight(savedProfile.weight);
      setAge(savedProfile.age);
      setActivityLevel(savedProfile.activityLevel);
      setDietaryGoal(savedProfile.dietaryGoal);
      setcurrentWeight(savedProfile.cureentWeight);
      setcurrentWeight(savedProfile.currentWeightGoal);
    }
  }, []);

  // Function to handle saving the profile data in localStorage
  const saveProfile = () => {
    const userProfile = {
      gender,
      year,
      height,
      weight,
      age,
      activityLevel,
      dietaryGoal,
      cureentWeight,
      currentWeightGoal,
    };
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    console.log("Profile saved:", userProfile);
  };

  const handleNext = () => {
    // Check if any fields are not selected
    if (
      !gender ||
      !year ||
      (step === 2 && (!height || !weight)) ||
      (step === 3 && !activityLevel) ||
      (step === 4 && !dietaryGoal) ||
      (step === 5 && (!cureentWeight || !currentWeightGoal))
    ) {
      alert("Please fill out all fields.");
      return;
    }

    if (step === 5) {
      saveProfile();
    }

    // Ensure step progresses correctly beyond step 5
    if (step < 6) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleDelete = () => {
    localStorage.removeItem("userProfile");
    console.log("Profile deleted.");
    setGender("");
    setYear("");
    setHeight("");
    setWeight("");
    setAge("");
    setActivityLevel(""); // Reset activityLevel
    setDietaryGoal(""); // Reset dietaryGoal
    setcurrentWeight(""); // Reset currentWeight
    setcurrentWeightGoal(""); // Reset currentGoalWeight
  };

  return (
    <div className="flex flex-col items-center p-6 h-screen justify-center space-y-12">
      {step === 1 ? (
        <>
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Let’s set your profile!
          </h2>

          <div className="w-full mb-6">
            <p className="text-lg font-bold mb-2">Gender</p>
            <div className="flex gap-6 items-center justify-center">
              <button
                className={`px-14 py-6 rounded-full text-sm font-bold border transition duration-200 ${
                  gender === "Male"
                    ? "bg-yellow-500 text-white"
                    : "border-gray-300"
                } hover:border-yellow-500`}
                onClick={() => setGender("Male")}
              >
                Male
              </button>
              <button
                className={`px-14 py-6 rounded-full text-sm font-bold border transition duration-200 ${
                  gender === "Female"
                    ? "bg-yellow-500 text-white"
                    : "border-gray-300"
                } hover:border-yellow-500`}
                onClick={() => setGender("Female")}
              >
                Female
              </button>
            </div>
          </div>

          <div className="w-full mb-8">
            <p className="text-lg font-bold mb-2">Year of Birth</p>
            <div className="scrollable-container w-full flex flex-col items-center gap-2 max-h-60 overflow-y-auto">
              {years.map((yr) => (
                <button
                  key={yr}
                  className={`w-full py-5 px-6 text-lg font-bold transition duration-200 ${
                    year === yr ? "bg-gray-300" : "text-black hover:bg-gray-200"
                  }`}
                  onClick={() => setYear(yr)}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          <button
            className="bg-yellow-500 px-12 py-6 w-full rounded-full text-lg font-semibold text-white transition duration-200 hover:bg-yellow-600 mt-6"
            onClick={handleNext}
          >
            Next
          </button>
        </>
      ) : step === 2 ? (
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
                  className={`w-full py-5 rounded-md text-lg font-bold transition duration-200 ${
                    height === option
                      ? "bg-gray-300"
                      : "text-black hover:bg-gray-200"
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
                  className={`w-full py-5 rounded-md text-sm font-medium transition duration-200 ${
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
              className="bg-yellow-500 px-12 py-6 w-full rounded-full text-lg font-semibold text-white transition duration-200 hover:bg-yellow-600 sm:w-auto"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </>
      ) : step === 3 ? (
        <>
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            How active are you
          </h2>

          <div className="w-full flex flex-col items-center gap-4">
            {howActive.map((preference) => (
              <button
                key={preference}
                className={`w-[284px] h-[68px] py-4 rounded-full text-lg font-bold transition bg-white justify-center items-center flex border border-gray-300 ${
                  activityLevel === preference
                    ? "bg-yellow-500 text-white"
                    : "text-black"
                } `}
                onClick={() => setActivityLevel(preference)} // Set activityLevel
              >
                {preference}
              </button>
            ))}
          </div>

          <div className="flex justify-between w-full mt-10">
            <button
              className="bg-yellow-500 px-12 py-6 w-full rounded-full text-lg font-semibold text-white transition duration-200 hover:bg-yellow-600 sm:w-auto"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </>
      ) : step === 4 ? (
        <>
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 ">
            What is your dietary goal ?
          </h2>

          <div className="w-full flex flex-col items-center gap-4">
            {dietaryGoals.map((preference) => (
              <button
                key={preference}
                className={`w-[284px] h-[68px] py-4 rounded-full text-lg font-bold transition bg-white justify-center items-center flex border border-gray-300 ${
                  dietaryGoal === preference
                    ? "bg-yellow-500 text-white"
                    : "text-black"
                } `}
                onClick={() => setDietaryGoal(preference)} // Set dietaryGoal
              >
                {preference}
              </button>
            ))}
          </div>

          <div className="flex justify-between w-full mt-10">
            <button
              className="bg-yellow-500 px-12 py-6 w-full rounded-full text-lg font-semibold text-white transition duration-200 hover:bg-yellow-600 sm:w-auto"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </>
      ) : step === 5 ? (
        <>
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Let us know your current goal!
          </h2>

          <div className="w-full mb-6">
            <p className="text-lg font-bold mb-2">Current weight</p>
            <div className="scrollable-container w-full flex flex-col items-center gap-2 max-h-40 overflow-y-auto">
              {currentWeightOptions.map((option) => (
                <button
                  key={option}
                  className={`w-full py-5 rounded-md text-lg font-bold transition duration-200 ${
                    cureentWeight === option
                      ? "bg-gray-300"
                      : "text-black hover:bg-gray-200"
                  }`}
                  onClick={() => setcurrentWeight(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full mb-6">
            <p className="text-lg font-bold mb-2">Weight goal</p>
            <div className="scrollable-container w-full flex flex-col items-center gap-2 max-h-40 overflow-y-auto">
              {CurrentWeightGoalOptions.map((option) => (
                <button
                  key={option}
                  className={`w-full py-5 rounded-md text-sm font-medium transition duration-200 ${
                    currentWeightGoal === option
                      ? "bg-gray-300"
                      : "text-black hover:bg-gray-200"
                  }`}
                  onClick={() => setcurrentWeightGoal(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between w-full mt-6">
            <button
              className="bg-yellow-500 px-12 py-6 w-full rounded-full text-lg font-semibold text-white transition duration-200 hover:bg-yellow-600 sm:w-auto"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <>
          <IoMdCheckmarkCircle className="text-green-500 text-[180px]" />

          <h2 className="text-4xl font-medium text-center flex justify-center text-black break-words">
            Profile successfully created !
          </h2>
          {/* <button onClick={handleDelete} className=" border">
            delate
          </button> */}
        </>
      )}
    </div>
  );
}
