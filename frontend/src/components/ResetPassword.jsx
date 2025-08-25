import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);

    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { otp, newPassword },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("Password reset successfully!");
        navigate("/login");
      } else {
        toast.error(data.message || "Failed to reset password.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-black font-manrope">
      <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col items-center"
      >
        <div className="relative w-full mb-4">
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full pl-4 pr-12 py-4 border border-gray-300 rounded-2xl font-semibold focus:outline-none"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <div className="relative w-full mb-4">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            className="w-full pl-4 pr-12 py-4 border border-gray-300 rounded-2xl font-semibold focus:outline-none"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <span
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={() => setShowNewPassword((prev) => !prev)}
            tabIndex={0}
            role="button"
            aria-label={showNewPassword ? "Hide password" : "Show password"}
          >
            {showNewPassword ? (
              <FaEyeSlash className="text-xl" />
            ) : (
              <FaEye className="text-xl" />
            )}
          </span>
        </div>
        <div className="relative w-full mb-4">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full pl-4 pr-12 py-4 border border-gray-300 rounded-2xl font-semibold focus:outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            tabIndex={0}
            role="button"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
              <FaEyeSlash className="text-xl" />
            ) : (
              <FaEye className="text-xl" />
            )}
          </span>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={
            "bg-yellow-500 text-white py-3 rounded-lg w-full font-semibold " +
            (loading ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600")
          }
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
