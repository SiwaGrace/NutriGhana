import { FcGoogle } from "react-icons/fc";
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
    title: "Create your account",
    buttonText: "Sign up",
  },
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const authType = "signUp";
  const navigate = useNavigate();
  const current = authForms[authType];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home", { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate]);

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
      toast.success("Signed up !");
      console.log("Google user:", user);
      if (isNewUser) {
        navigate("/ProfileSetup", { replace: true });
        blockBackNavigation();
      } else {
        navigate("/home", { replace: true });
        blockBackNavigation();
      }
    } catch (error) {
      console.error("Google sign-up error:", error.message);
      toast.error(error.message || "Google sign-up failed");
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
      toast.success("Signed up !");
      console.log("Apple user:", user);
      if (isNewUser) {
        navigate("/ProfileSetup", { replace: true });
        blockBackNavigation();
      } else {
        navigate("/home", { replace: true });
        blockBackNavigation();
      }
    } catch (error) {
      console.error("Apple sign-up error:", error.message);
      toast.error(error.message || "Apple sign-up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="flex flex-row gap-4 items-center justify-center text-white">
        <button
          onClick={handleGoogleAuth}
          aria-label="Sign up"
          className="bg-yellow-500 px-10 py-4 rounded-2xl transition duration-300   flex items-center justify-center  gap-4"
          disabled={loading}
        >
          <FcGoogle />
          <span>{loading ? "Processing..." : `${current.buttonText} `}</span>
        </button>

        <button
          onClick={handleAppleAuth}
          aria-label="Sign up with Apple"
          className={`bg-yellow-500 px-10 py-4 rounded-2xl transition duration-300   flex items-center justify-center gap-4 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          <FaApple className="w-5 h-5 text-black" />
          <span>{`${current.buttonText} `}</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
