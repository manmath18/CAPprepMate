import express from "express";
import { login, logout, register } from "../controllers/usercontroller.js";
import { singleUpload } from "../middlewares/multer.js";
import { predictCollege } from "../controllers/collegeController.js"; // Import the new controller for college prediction

const router = express.Router();

// Existing Routes
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);

// New Route for College Prediction
router.route("/predict-college").post(predictCollege);

export default router;
