import asyncHandler from "express-async-handler";
import ms from "ms";
import User from "../models/userModel.js";
import { constants } from "../constants.js";
import { uploadOnCloudinary } from "../middlewares/cloudinary.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(req.body);

  if (!name || !email || !password) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("All required fields must be provided");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(constants.FORBIDDEN);
    throw new Error("User already exists");
  }
  const imageBuffer = req.files?.photo?.[0]?.buffer;

  // const image = req.files?.photo[0]?.path;

  if (!imageBuffer) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("Photo is required");
  }

  // if (!image) {
  //   res.status(constants.VALIDATION_ERROR);
  //   throw new Error("Photo is required");
  // }

  const uploadResult = await uploadOnCloudinary(imageBuffer);

  // const uploadResult = await uploadOnCloudinary(image);

  if (!uploadResult) {
    res.status(constants.SERVER_ERROR);
    throw new Error("Photo upload failed");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    photo: uploadResult.secure_url,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      photo: user.photo,
    },
  });
});

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

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: ms(process.env.ACCESS_TOKEN_EXPIRY),
    })
    .json({
      success: true,
      message: "Login successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
});

export const logoutUser = asyncHandler(async (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
});
