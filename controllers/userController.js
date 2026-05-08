import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { constants } from "../constants.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").populate({
    path: "assignedTasks",
    select: "title description deadline status createdAt",
  });

  res.status(200).json({
    success: true,
    message: "Users with assigned tasks fetched successfully",
    count: users.length,
    data: users,
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(constants.NOT_FOUND);
    throw new Error("User not found");
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
