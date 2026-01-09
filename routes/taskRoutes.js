import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorize.js";
import {
  createTask,
  getAllTasks,
  getMyTasks,
  updateTaskStatus,
  deleteTask,
  assignTask
} from "../controllers/taskController.js";

const router = express.Router();

// Admin & Manager
router.post("/", protect, authorize("admin", "manager"), createTask);
router.get("/", protect, authorize("admin", "manager"), getAllTasks);

// Employee
router.get("/my", protect, authorize("employee"), getMyTasks);
router.patch("/:id/status", protect, authorize("employee"), updateTaskStatus);

// Admin only
router.delete("/:id", protect, authorize("admin"), deleteTask);

// Manager only
router.patch("/:id/assign", protect, authorize("manager"), assignTask);


export default router;
