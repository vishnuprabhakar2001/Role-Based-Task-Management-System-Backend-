import asyncHandler from "express-async-handler";
import { constants } from "../constants.js";

export const authorize = (...allowedRoles) =>
  asyncHandler(async (req, res, next) => {

    if (!req.user) {
      res.status(constants.UNAUTHORIZED);
      throw new Error("User not authenticated");
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(constants.FORBIDDEN);
      throw new Error("Access denied");
    }

    next();
  });
