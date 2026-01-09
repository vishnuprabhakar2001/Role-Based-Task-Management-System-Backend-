import asyncHandler from "express-async-handler";
import Task from "../models/taskModel.js";
import { constants } from "../constants.js";
import User from "../models/userModel.js";


export const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("Task title is required");
  }

  const task = await Task.create({
    title,
    description,
    createdBy: req.user._id
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: task
  });
});



export const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find()
    .populate("assignedTo", "name email role")
    .populate("createdBy", "name email role")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});



export const getMyTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user._id })
    .populate("createdBy", "name email role")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});



export const assignTask = asyncHandler(async (req, res) => {
  const { assignedTo } = req.body;

  if (!assignedTo) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("Employee ID is required to assign task");
  }

  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(constants.NOT_FOUND);
    throw new Error("Task not found");
  }

  if (task.assignedTo) {
    res.status(constants.FORBIDDEN);
    throw new Error("Task is already assigned");
  }

  const user = await User.findById(assignedTo);
  if (!user || user.role !== "employee") {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("Task can only be assigned to an employee");
  }

  task.assignedTo = assignedTo;
  task.status = "in-progress";
  await task.save();

  res.status(200).json({
    success: true,
    message: "Task assigned successfully",
    data: task
  });
});



export const updateTaskStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status || !["pending", "in-progress", "completed"].includes(status)) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("Invalid task status");
  }

  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(constants.NOT_FOUND);
    throw new Error("Task not found");
  }

  if (!task.assignedTo) {
    res.status(constants.FORBIDDEN);
    throw new Error("Task is not assigned to any employee");
  }

  if (task.assignedTo.toString() !== req.user._id.toString()) {
    res.status(constants.FORBIDDEN);
    throw new Error("You can update only your assigned tasks");
  }

  task.status = status;
  await task.save();

  res.status(200).json({
    success: true,
    message: "Task status updated successfully",
    data: task
  });
});

export const deleteTask = asyncHandler(async (req, res) => {

  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(constants.NOT_FOUND);
    throw new Error("Task not found");
  }

  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    data: task
  });
});
