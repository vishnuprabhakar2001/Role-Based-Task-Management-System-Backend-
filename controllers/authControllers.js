import asyncHandler from "express-async-handler";
import ms from "ms";
import User from "../models/userModel.js";
import { constants } from "../constants.js";

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("All required fields must be provided");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(constants.FORBIDDEN);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role
  });

 

  
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
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

  if (!email || !password) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.isPasswordCorrect(password))) {
    res.status(constants.UNAUTHORIZED);
    throw new Error("Invalid email or password");
  }

  const token = user.generateAccessToken();

  res.status(200).cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: ms(process.env.ACCESS_TOKEN_EXPIRY)
  })
  .json({
    success: true,
    message: "Login successful",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});


