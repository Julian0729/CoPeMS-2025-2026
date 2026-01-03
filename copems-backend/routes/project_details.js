import express from "express";
import ProjectDetailsController from "../controllers/ProjectDetailsController.js";
import { verifyToken, requireEmailVerification } from "../middleware/auth.js";

const router = express.Router();

// All routes require authentication
// GET all project details (user's own records only)
router.get(
  "/",
  verifyToken,
  requireEmailVerification,
  ProjectDetailsController.getAllProjectDetails
);

// GET project details by ID (with ownership verification)
router.get(
  "/:id",
  verifyToken,
  requireEmailVerification,
  ProjectDetailsController.getProjectDetailsById
);

// POST create new project details
router.post(
  "/",
  verifyToken,
  requireEmailVerification,
  ProjectDetailsController.insertProjectDetails
);

// PUT update project details by ID (with ownership verification)
router.put(
  "/:id",
  verifyToken,
  requireEmailVerification,
  ProjectDetailsController.updateProjectDetails
);

// DELETE project details by ID (with ownership verification)
router.delete(
  "/:id",
  verifyToken,
  requireEmailVerification,
  ProjectDetailsController.deleteProjectDetails
);

export default router;
