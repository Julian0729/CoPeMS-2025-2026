import express from "express";
import AuthController from "../controllers/authController.js";
import { verifyToken, requireEmailVerification } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/register", AuthController.register);
router.post("/register-no-email", AuthController.registerNoEmail);
router.post("/verify-email", AuthController.verifyEmail);
router.post("/login", AuthController.login);

// Protected routes
router.get(
  "/profile",
  verifyToken,
  requireEmailVerification,
  AuthController.getProfile
);

export default router;
