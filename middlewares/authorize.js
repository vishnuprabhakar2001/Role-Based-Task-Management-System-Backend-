import asyncHandler from "express-async-handler";
import { constants } from "../constants.js";

export const authorize = (...allowedRoles) =>   // Here, ...allowedRoles is a REST PARAMETER, not the spread operator. Meaning: “Collect all arguments passed to this function and store them in a single array called allowedRoles.”
  asyncHandler(async (req, res, next) => {      // The three dots (...) are used to collect multiple parameters passed to a function and store them as elements in a single array.

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
