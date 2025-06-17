import { SlSocialGoogle } from "react-icons/sl";
import { FaApple } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../components/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [authType, setAuthType] = useState("signUp");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const current = authForms[authType];

  // Redirect if already logged in (using Firebase Auth)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home", { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Function to block back navigation after login
  const blockBackNavigation = () => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.go(1);
    };
  };

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const isNewUser = result.additionalUserInfo?.isNewUser;
      toast.success(
        `Signed ${authType === "signUp" ? "up" : "in"} with Google!`
      );
      console.log("Google user:", user);
      if (isNewUser) {
        navigate("/ProfileSetup", { replace: true });
        blockBackNavigation();
      } else {
        navigate("/home", { replace: true });
        blockBackNavigation();
      }
    } catch (error) {
      console.error("Google sign-in error:", error.message);
      toast.error(error.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAppleAuth = async () => {
    const provider = new OAuthProvider("apple.com");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const isNewUser = result.additionalUserInfo?.isNewUser;
      toast.success(
        `Signed ${authType === "signUp" ? "up" : "in"} with Apple!`
      );
      console.log("Apple user:", user);
      if (isNewUser) {
        navigate("/ProfileSetup", { replace: true });
        blockBackNavigation();
      } else {
        navigate("/home", { replace: true });
        blockBackNavigation();
      }
    } catch (error) {
      console.error("Apple sign-in error:", error.message);
      toast.error(error.message || "Apple sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center overflow-hidden bg-white text-black">
      <div className="flex flex-col items-center text-center w-full sm:w-4/5 md:w-1/2 lg:w-1/3 p-6 space-y-4 font-Manrope">
        <h1 className="text-4xl font-bold">NutriGhana</h1>
        <h2 className="text-xl font-bold text-gray-800">{current.title}</h2>
        <button
          onClick={handleGoogleAuth}
          aria-label="Sign in with Google"
          className="flex items-center justify-center w-full bg-yellow-500 text-white font-semibold py-6 rounded-full shadow-md space-x-3 disabled:opacity-50 cursor-pointer "
          disabled={loading}
        >
          <SlSocialGoogle className="h-5 w-5" />
          <span>
            {loading ? "Processing..." : `${current.buttonText} with Google`}
          </span>
        </button>
        <button
          onClick={handleAppleAuth}
          aria-label="Sign in with Apple"
          className={`flex items-center justify-center w-full border border-gray-300 font-bold py-6 rounded-full shadow-md space-x-3 cursor-pointer text-black ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          <FaApple className="h-5 w-5 text-black" />
          <span>{current.buttonText} with Apple</span>
        </button>
        <div className="text-lg text-gray-700 mt-4">
          <p>{current.alternate.text}</p>
          <button
            onClick={() => setAuthType(current.alternate.actionType)}
            className="text-blue-600 font-medium cursor-pointer "
          >
            {current.alternate.actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
