import express from "express";
import DraftController from "../controllers/DraftController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// Get all draft data for logged-in user
router.get("/", DraftController.getUserDraftData);

// Save drafts for each step
router.post("/building-owner", DraftController.saveBuildingOwnerDraft);
router.post("/construction", DraftController.saveConstructionDraft);
router.post("/project-details", DraftController.saveProjectDetailsDraft);
router.post(
  "/engineer-information",
  DraftController.saveEngineerInformationDraft
);

// Finalize application (generate application number)
router.post("/finalize", DraftController.finalizeApplication);

export default router;
