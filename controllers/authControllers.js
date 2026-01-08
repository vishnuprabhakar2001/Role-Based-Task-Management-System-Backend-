import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { constants } from "../constants.js";

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // 1. Basic validation
  if (!name || !email || !password) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("All required fields must be provided");
  }

  // 2. Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(constants.FORBIDDEN);
    throw new Error("User already exists");
  }

  // 3. Create user
  const user = await User.create({
    name,
    email,
    password,
    role
  });

  // 4. Generate token
  const token = user.generateAccessToken();

  // 5. Response
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    }
  });
});


/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1. Validate input
  if (!email || !password) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("Email and password are required");
  }

  // 2. Find user and explicitly select password
  const user = await User.findOne({ email }).select("+password");

  // 3. Verify user exists and password matches
  if (!user || !(await user.isPasswordCorrect(password))) {
    res.status(constants.UNAUTHORIZED);
    throw new Error("Invalid email or password");
  }

  // 4. Generate token
  const token = user.generateAccessToken();

  // 5. Send response
  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    }
  });
});

