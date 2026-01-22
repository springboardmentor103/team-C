// // controllers/authController.js

// export const registerUser = (req, res) => {
//   // TODO: Implement registration logic
// };

// export const verifyOtp = (req, res) => {
//   // TODO: Implement OTP verification
// };

// export const loginUser = (req, res) => {
//   // TODO: Implement login logic
// };




// ---------------------------------------------------------------------------------------------------

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * Generate 6-digit OTP
 */
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

/**
 * REGISTER USER
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      isVerified: false
    });

    console.log(`OTP for ${email}: ${otp}`); // TEMP

    return res.status(201).json({
      message: "Registration successful. Please verify OTP.",
      email: user.email
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * VERIFY OTP
 */
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email: email.trim() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp.trim()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();

    return res.json({ message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * LOGIN USER
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email: email.trim() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify OTP first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT_SECRET not set" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
