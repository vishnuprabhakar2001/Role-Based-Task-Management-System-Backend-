import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorize.js";
import { getAllUsers, deleteUser } from "../controllers/userController.js";

const router = express.Router();

// Get users (admin + manager)
router.get("/", protect, authorize("admin", "manager"), getAllUsers);

// Delete user (ONLY ADMIN)
router.delete("/:id", protect, authorize("admin"), deleteUser);

export default router;
