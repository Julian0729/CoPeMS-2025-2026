import express from "express";
import AuthController from "../controllers/authController.js";
import {
  verifyToken,
  verifyRefreshToken,
  requireEmailVerification,
} from "../middleware/auth.js";

const router = express.Router();

// ========== PUBLIC ROUTES (No authentication required) ==========

// User registration
router.post("/register", AuthController.register);
router.post("/register-no-email", AuthController.registerNoEmail);

// Email verification
router.post("/verify-email", AuthController.verifyEmail);
router.post("/resend-verification", AuthController.resendVerificationEmail);

// User login
router.post("/login", AuthController.login);

// Token management
router.post("/refresh-token", AuthController.refreshToken);
router.post("/logout", AuthController.logout);

// Password reset
router.post("/request-password-reset", AuthController.requestPasswordReset);
router.post("/reset-password", AuthController.resetPassword);

// ========== PROTECTED ROUTES (Authentication required) ==========

// Get user profile (requires valid access token and verified email)
router.get(
  "/profile",
  verifyToken,
  requireEmailVerification,
  AuthController.getProfile
);

// Change password (requires valid access token)
router.post(
  "/change-password",
  verifyToken,
  requireEmailVerification,
  AuthController.changePassword
);

// Revoke all tokens (for security purposes - requires valid access token)
router.post("/revoke-all-tokens", verifyToken, AuthController.revokeAllTokens);

export default router;
