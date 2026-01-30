import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

import Logo from "../assets/logoicons/nutrighanaLogo.svg";
import { AppContent } from "../context/AppContext";
import Loading from "../components/dishesComponents/Loading";

const Signup = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn } = useContext(AppContent);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    setLoading(true);

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
          name,
          email,
          password,
        });

        if (data.success) {
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
          setTimeout(() => {
            navigate("/ProfileSetup", { replace: true });
          }, 3000); // 3 seconds delay
        } else {
          toast.error(data.message);
          setLoading(false);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
          email,
          password,
        });

        if (data.success) {
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
          setTimeout(() => {
            if (!localStorage.getItem("recommendedCalories")) {
              navigate("/ProfileSetup", { replace: true });
            } else {
              navigate("/home", { replace: true });
            }
          }, 3000); // 3 seconds delay
        } else {
          toast.error(data.message);
          setLoading(false);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-black font-manrope">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-5xl font-bold mb-6 flex items-center gap-3">
            <img src={Logo} alt="NutriGhana Logo" className="h-12 w-12" />
            <span>NutriGhana</span>
          </h1>

          <div className="bg-white px-4 py-6 rounded-lg w-full max-w-md">
            <h2 className="text-3xl text-gray-700 mb-5 font-medium text-center">
              {state === "Login"
                ? "Continue your nutrition journey!"
                : "Begin your nutrition journey!"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="flex flex-col space-y-4 mb-6">
                {state === "Sign Up" && (
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <IoPerson className="text-xl" />
                    </span>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl font-semibold focus:outline-none"
                    />
                  </div>
                )}

                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <MdOutlineMail className="text-xl" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl font-semibold focus:outline-none"
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <CiLock className="text-xl" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-2xl font-semibold focus:outline-none"
                  />
                  <span
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={0}
                    role="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-xl" />
                    ) : (
                      <FaEye className="text-xl" />
                    )}
                  </span>
                </div>
              </div>

              {state === "Login" && (
                <div className="text-right mb-4">
                  <button
                    type="button"
                    onClick={() => navigate("/forgetpassword")}
                    className="text-blue-600 underline text-sm cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-5 rounded-2xl font-semibold transition cursor-pointer ${
                  loading
                    ? "bg-yellow-300 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600 text-white"
                }`}
              >
                {state === "Login" ? "Login" : "Create Account"}
              </button>
            </form>

            <p className="text-center mt-4 text-lg ">
              {state === "Login"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                type="button"
                className="text-blue-600 underline font-semibold cursor-pointer"
                onClick={() =>
                  setState(state === "Login" ? "Sign Up" : "Login")
                }
              >
                {state === "Login" ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>

          {/* Show OAuth buttons for both Sign Up and Login */}
          <div className="text-center mt-8">
            <h3 className="text-gray-600 mb-4 text-lg font-medium">
              Or continue with
            </h3>
            <div className="flex justify-center gap-6">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-yellow-500 border shadow transition font-semibold text-white hover:-translate-y-2 hover:shadow-lg duration-300"
              >
                <FcGoogle className="text-2xl" />
                <span className="text-base">Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-yellow-500 border shadow transition font-semibold text-white hover:-translate-y-2 hover:shadow-lg duration-300"
              >
                <FaFacebookF className="text-2xl text-blue-600" />
                <span className="text-base">Facebook</span>
              </button>
            </div>
          </div>

          <div className="mt-10 text-center text-gray-500">
            &copy; {new Date().getFullYear()} NutriGhana. All rights reserved.
          </div>
        </>
      )}
    </div>
  );
};

export default Signup;
