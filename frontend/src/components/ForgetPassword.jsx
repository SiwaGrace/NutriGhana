import React from "react";
import { MdOutlineMail } from "react-icons/md";
import { useState } from "react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4   text-black flex-col  font-manrope">
      <h1 className="text-4xl font-bold mb-4">Reset Password</h1>
      <p className="mb-8 text-gray-600 text-xl text-center">
        Please enter your email address to receive a password reset link.
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center"
      >
        <div className="relative w-full mb-4 p-2">
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
          className="bg-yellow-500 text-white py-5 rounded-2xl transition px-24 duration-300 cursor-pointer font-semibold hover:bg-yellow-600"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
