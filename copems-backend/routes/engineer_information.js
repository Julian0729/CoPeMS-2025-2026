import express from "express";
import EngineerInformationController from "../controllers/EngineerInformationController.js";
import { verifyToken, requireEmailVerification } from "../middleware/auth.js";

const router = express.Router();

// All routes require authentication
// GET all engineer information (user's own records only)
router.get(
  "/",
  verifyToken,
  requireEmailVerification,
  EngineerInformationController.getAllEngineerInformation
);

// GET engineer information by ID (with ownership verification)
router.get(
  "/:id",
  verifyToken,
  requireEmailVerification,
  EngineerInformationController.getEngineerInformationById
);

// POST create new engineer information
router.post(
  "/",
  verifyToken,
  requireEmailVerification,
  EngineerInformationController.insertEngineerInformation
);

// PUT update engineer information by ID (with ownership verification)
router.put(
  "/:id",
  verifyToken,
  requireEmailVerification,
  EngineerInformationController.updateEngineerInformation
);

// DELETE engineer information by ID (with ownership verification)
router.delete(
  "/:id",
  verifyToken,
  requireEmailVerification,
  EngineerInformationController.deleteEngineerInformation
);

export default router;
