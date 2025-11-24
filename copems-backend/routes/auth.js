const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const { verifyToken, requireEmailVerification } = require("../middleware/auth");

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

module.exports = router;
