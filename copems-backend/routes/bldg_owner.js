import express from "express";
import BuildingOwnerController from "../controllers/BuildingOwnerController.js";
import { verifyToken, requireEmailVerification } from "../middleware/auth.js";

const router = express.Router();

// ========== PROTECTED ROUTES (Authentication required) ==========
// All routes require valid JWT token and verified email

// GET all building owners for logged-in user
router.get(
  "/",
  verifyToken,
  requireEmailVerification,
  BuildingOwnerController.getAllBldgOwners
);

// GET building owner by ID (with ownership verification)
router.get(
  "/:id",
  verifyToken,
  requireEmailVerification,
  BuildingOwnerController.getBldgOwnerById
);

// POST create new building owner
router.post(
  "/",
  verifyToken,
  requireEmailVerification,
  BuildingOwnerController.insertBldgOwner
);

// PUT update building owner by ID (with ownership verification)
router.put(
  "/:id",
  verifyToken,
  requireEmailVerification,
  BuildingOwnerController.updateBldgOwner
);

// DELETE building owner by ID (with ownership verification)
router.delete(
  "/:id",
  verifyToken,
  requireEmailVerification,
  BuildingOwnerController.deleteBldgOwner
);

export default router;
