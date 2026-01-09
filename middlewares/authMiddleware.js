import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { constants } from "../constants.js";


export const protect = asyncHandler(async(req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(constants.UNAUTHORIZED );
    throw new Error("Not authorized, token missing");
  }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id).select("-password");
        if (!user) {
            res.status(constants.UNAUTHORIZED);
            throw new Error("User not found or token invalid"); 
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(constants.UNAUTHORIZED); 
      throw new Error("Not authorized, token failed");  
    }
})    