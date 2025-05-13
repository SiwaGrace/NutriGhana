// src/pages/Login.js
import { SlSocialGoogle } from "react-icons/sl";
import { FaApple } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../component/firebase";
import { toast } from "react-toastify";

const authForms = {
  signUp: {
    title: "Begin your nutrition journey!",
    buttonText: "Sign up",
    alternate: {
      text: "Already have an account?",
      actionText: "Sign in here",
      actionType: "signIn",
    },
  },
  signIn: {
    title: "Continue your nutrition journey!",
    buttonText: "Sign in",
    alternate: {
      text: "Don't have an account?",
      actionText: "Sign up",
      actionType: "signUp",
    },
  },
};

const Login = () => {
  const [authType, setAuthType] = useState("signIn");
  const navigate = useNavigate();
  const current = authForms[authType];

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      toast.success(
        `Signed ${authType === "signUp" ? "up" : "in"} with Google!`
      );
      console.log("Google user:", user);

      // Redirect based on auth type
      navigate(authType === "signUp" ? "/ProfileSetup" : "/ProfileHome");
    } catch (error) {
      console.error("Google sign-in error:", error.message);

      // Improved error handling
      if (error.code === "auth/popup-closed-by-user") {
        toast.error("The popup was closed before sign-in was completed.");
      } else if (error.code === "auth/cancelled-popup-request") {
        toast.error("The sign-in popup was cancelled.");
      } else {
        toast.error(error.message || "Google sign-in failed");
      }
    }
  };

  return (
    <div className="h-screen flex justify-center items-center overflow-hidden bg-white">
      <div className="flex flex-col items-center text-center w-full sm:w-4/5 md:w-1/2 lg:w-1/3 p-6 space-y-4 font-Manrope">
        <h1 className="text-4xl font-bold">NutriGhana</h1>
        <h2 className="text-xl font-bold text-gray-800">{current.title}</h2>

        <button
          onClick={handleGoogleAuth}
          className="flex items-center justify-center w-full bg-yellow-500 text-white font-semibold py-6 rounded-full shadow-md space-x-3"
        >
          <SlSocialGoogle className="h-5 w-5" />
          <span>{current.buttonText} with Google</span>
        </button>

        <button
          disabled
          className="flex items-center justify-center w-full border border-gray-300 py-6 rounded-full shadow-md space-x-3 opacity-50 cursor-not-allowed"
        >
          <FaApple className="h-5 w-5" />
          <span>{current.buttonText} with Apple (coming soon)</span>
        </button>

        <div className="text-lg text-gray-700 mt-4">
          <p>{current.alternate.text}</p>
          <button
            onClick={() => setAuthType(current.alternate.actionType)}
            className="text-blue-600 font-medium"
          >
            {current.alternate.actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
