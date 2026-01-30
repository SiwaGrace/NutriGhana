// src/api/authApi.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// REGISTER
export const registerUser = async (name, email, password) => {
  try {
    const { data } = await api.post("/api/auth/register", {
      name,
      email,
      password,
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

// LOGIN
export const loginUser = async (email, password) => {
  try {
    const { data } = await api.post("/api/auth/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// LOGOUT
export const logoutUser = async () => {
  try {
    const { data } = await api.post("/api/auth/logout");
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

// CHECK AUTH
export const checkAuth = async () => {
  try {
    const { data } = await api.get("/api/auth/check-auth");
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Auth check failed");
  }
};

// SEND VERIFY OTP
export const sendVerifyOtp = async (userId) => {
  try {
    const { data } = await api.post("/api/auth/send-verify-otp", { userId });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to send OTP");
  }
};

// VERIFY EMAIL
export const verifyEmail = async (userId, otp) => {
  try {
    const { data } = await api.post("/api/auth/verify-email", {
      userId,
      otp,
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Email verification failed"
    );
  }
};

// SEND RESET OTP
export const sendResetOtp = async (email) => {
  try {
    const { data } = await api.post("/api/auth/send-reset-otp", { email });
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to send reset OTP"
    );
  }
};

// RESET PASSWORD
export const resetPassword = async (email, otp, newPassword) => {
  try {
    const { data } = await api.post("/api/auth/reset-password", {
      email,
      otp,
      newPassword,
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Password reset failed");
  }
};
