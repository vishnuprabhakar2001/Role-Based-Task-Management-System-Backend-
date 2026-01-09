import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorize.js";

const router = express.Router();

router.get("/employee", protect, (req, res) => {
  res.json({ message: "Employee access", user: req.user });
});

router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.json({ message: "Admin access only" });
});

export default router;
