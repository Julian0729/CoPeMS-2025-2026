import express from "express";
import BuildingPlansController from "../controllers/BuildingPlansController.js";
import { verifyToken, requireEmailVerification } from "../middleware/auth.js";

const router = express.Router();

// All routes require authentication
// GET all building plans (user's own records only)
router.get(
  "/",
  verifyToken,
  requireEmailVerification,
  BuildingPlansController.getAllBuildingPlans
);

// GET building plan by ID (with ownership verification)
router.get(
  "/:id",
  verifyToken,
  requireEmailVerification,
  BuildingPlansController.getBuildingPlanById
);

// GET building plans by application ID (with ownership verification)
router.get(
  "/application/:application_id",
  verifyToken,
  requireEmailVerification,
  BuildingPlansController.getBuildingPlansByApplicationId
);

// POST create new building plan
router.post(
  "/",
  verifyToken,
  requireEmailVerification,
  BuildingPlansController.insertBuildingPlan
);

// PUT update building plan by ID (with ownership verification)
router.put(
  "/:id",
  verifyToken,
  requireEmailVerification,
  BuildingPlansController.updateBuildingPlan
);

// DELETE building plan by ID (with ownership verification)
router.delete(
  "/:id",
  verifyToken,
  requireEmailVerification,
  BuildingPlansController.deleteBuildingPlan
);

export default router;
