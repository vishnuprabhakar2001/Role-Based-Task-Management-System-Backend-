import { protect } from "../middlewares/authMiddleware.js";
import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authControllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();


router.route("/register").post(                
    upload.fields([                // it's a middleware which I want to be run before registerUser
        {
            name: "photo",
            maxCount: 1   
        } 
    ]),
    registerUser
);


router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);


export default router;
