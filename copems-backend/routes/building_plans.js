import express from "express";
import BuildingPlansController from "../controllers/BuildingPlansController.js";

const router = express.Router();

// GET all building plans
router.get("/", BuildingPlansController.getAllBuildingPlans);

// GET building plan by ID
router.get("/:id", BuildingPlansController.getBuildingPlanById);

// GET building plans by application ID
router.get(
  "/application/:application_id",
  BuildingPlansController.getBuildingPlansByApplicationId
);

// POST create new building plan
router.post("/", BuildingPlansController.insertBuildingPlan);

// PUT update building plan by ID
router.put("/:id", BuildingPlansController.updateBuildingPlan);

// DELETE building plan by ID
router.delete("/:id", BuildingPlansController.deleteBuildingPlan);

export default router;
