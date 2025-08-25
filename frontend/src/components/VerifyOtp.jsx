import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { otp, newPassword: "newPassword" },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("OTP verified! You can now reset your password.");
        navigate("/reset-password");
      } else {
        toast.error(data.message || "Invalid OTP.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-black font-manrope">
      <h1 className="text-3xl font-bold mb-4">Verify OTP</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col items-center"
      >
        <input
          type="text"
          placeholder="Enter OTP"
          className="mb-4 w-full px-4 py-3 border rounded-lg"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={
            "bg-yellow-500 text-white py-3 rounded-lg w-full font-semibold " +
            (loading ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600")
          }
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
