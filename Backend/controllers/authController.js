import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

dotenv.config();

// Helper function to create JWT
const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ===== REGISTER USER =====
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = createToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Welcome to NutriGhana",
      text: `Hello ${user.name},

Thank you for registering at NutriGhana! We're excited to have you on board.

Your account has been created with the email: ${email}

Best regards,
The NutriGhana Team`,
    });

    res.status(201).json({
      success: true,
      action: "signup",
      user: { id: user._id, name: user.name, email: user.email, token },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== LOGIN USER =====
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    const token = createToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      action: "login",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        recommendedCalories: user.recommendedCalories,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== LOGOUT USER =====
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== SEND VERIFY OTP =====
export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    if (user.isAccountVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Account already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification",
      text: `Hello ${user.name},

Please use the following OTP to verify your account: ${otp}

Best regards,
The NutriGhana Team`,
    });

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== VERIFY EMAIL =====
export const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  const userId = req.user.id; // From userAuth middleware

  if (!otp) {
    return res.status(400).json({ success: false, message: "OTP is required" });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    if (user.verifyOtpExpireAt < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Account verified successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== CHECK AUTH =====
export const isAuthenticated = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== SEND RESET OTP =====
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Hello ${user.name},

Please use the following OTP to reset your password: ${otp}

Best regards,
The NutriGhana Team`,
    });

    res
      .status(200)
      .json({ success: true, message: "OTP sent to your email successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== RESET PASSWORD =====
export const resetPassword = async (req, res) => {
  const { otp, newPassword } = req.body;
  if (!otp || !newPassword) {
    return res
      .status(400)
      .json({ success: false, message: "OTP and new password are required" });
  }

  try {
    // Find user by OTP and check expiry
    const user = await userModel.findOne({
      resetOtp: otp,
      resetOtpExpireAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== GET USER PROFILE =====
export const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== CREATE USER PROFILE =====
export const createUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // From userAuth middleware

    // Extract profile fields from request body
    const {
      gender,
      yearOfBirth,
      height,
      weight,
      activityLevel,
      dietaryGoal,
      currentWeight,
      currentWeightGoal,
      calories,
    } = req.body;

    // Update the user with profile information
    const updatedUser = await userModel
      .findByIdAndUpdate(
        userId,
        {
          gender,
          yearOfBirth,
          height,
          weight,
          activityLevel,
          dietaryGoal,
          currentWeight,
          currentWeightGoal,
          recommendedCalories: calories,
        },
        { new: true } // Return the updated document
      )
      .select("-password"); // Exclude password field

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error creating user profile:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create profile" });
  }
};
