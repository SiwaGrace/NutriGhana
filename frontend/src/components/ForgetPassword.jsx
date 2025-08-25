// import React, { useState, useContext } from "react";
import { MdOutlineMail } from "react-icons/md";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import VerifyOtp from "./VerifyOtp";

const ForgetPassword = () => {
  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(backendUrl + "/api/auth/send-reset-otp", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("OTP sent to your email!");
        navigate("/reset-password");
      } else {
        toast.error(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP send error:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-black flex-col font-manrope">
      <h1 className="text-4xl font-bold mb-4">Reset Password</h1>
      <p className="mb-8 text-gray-600 text-xl text-center">
        Please enter your email address to receive a password reset link or OTP.
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center"
      >
        <div className="relative w-full max-w-md mb-4 p-2">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <MdOutlineMail className="text-xl text-gray-500" />
          </span>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full pl-12 pr-4 py-5 border border-gray-300 rounded-2xl font-semibold focus:outline-none focus:ring-0"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={
            "bg-yellow-500 text-white py-5 rounded-2xl px-24 font-semibold transition " +
            (loading ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600")
          }
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
