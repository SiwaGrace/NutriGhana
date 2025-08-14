import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { toast } from "react-toastify";
import axios from "axios";

import Logo from "../assets/logo&icons/nutrighanaLogo.svg";
// import Login from "./Login"; // this is your OAuth component
import { AppContent } from "../context/AppContext";

const Signup = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn } = useContext(AppContent);

  const [formType, setFormType] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      const endpoint =
        formType === "Sign Up"
          ? `${backendUrl}/api/auth/register`
          : `${backendUrl}/api/auth/login`;

      const payload =
        formType === "Sign Up"
          ? { name, email, password }
          : { email, password };

      const { data } = await axios.post(endpoint, payload);

      if (data.success) {
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);

        if (formType === "Sign Up") {
          navigate("/ProfileSetup");
        } else {
          navigate("/home");
        }
      } else {
        toast.error(data.message || "Authentication failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-black font-manrope">
      {/* App Logo and Title */}
      <h1 className="text-5xl font-bold mb-6 flex items-center gap-3">
        <img src={Logo} alt="NutriGhana Logo" className="h-12 w-12" />
        <span>NutriGhana</span>
      </h1>

      {/* Form Card */}
      <div className="bg-white px-4 py-6 rounded-lg w-full max-w-md">
        <h2 className="text-3xl text-gray-700 mb-5 font-medium text-center">
          {formType === "Login"
            ? "Continue your nutrition journey!"
            : "Begin your nutrition journey!"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col space-y-4 mb-6">
            {/* Full Name (Sign Up only) */}
            {formType === "Sign Up" && (
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

            {/* Email */}
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

            {/* Password */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <CiLock className="text-xl" />
              </span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl font-semibold focus:outline-none"
              />
            </div>
          </div>

          {/* Forgot Password */}
          {formType === "Login" && (
            <div className="text-right mb-4">
              <button
                type="button"
                onClick={() => navigate("/forgetpassword")}
                className="text-blue-600 underline text-sm"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-4 rounded-2xl font-semibold hover:bg-yellow-600 transition"
          >
            {formType === "Login" ? "Login" : "Create Account"}
          </button>
        </form>

        {/* Toggle Form */}
        <p className="text-center mt-4 text-lg">
          {formType === "Login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            className="text-blue-600 underline font-semibold"
            onClick={() =>
              setFormType(formType === "Login" ? "Sign Up" : "Login")
            }
          >
            {formType === "Login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>

      {/* Social Login */}
      {formType === "Sign Up" && (
        <div className="text-center mt-6">
          <h3 className="text-gray-600">Or continue with</h3>
          <div className="flex justify-center gap-4 mt-4">
            {/* <Login /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
