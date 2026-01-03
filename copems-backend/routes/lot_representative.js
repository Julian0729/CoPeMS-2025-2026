import express from "express";
import LotRepresentativeController from "../controllers/LotRepresentativeController.js";
import { verifyToken, requireEmailVerification } from "../middleware/auth.js";

const router = express.Router();

// Protected routes - require authentication
// GET all lot representatives (user's own records only)
router.get(
  "/",
  verifyToken,
  requireEmailVerification,
  LotRepresentativeController.getAllLotRepresentatives
);

// GET lot representative by ID (with ownership verification)
router.get(
  "/:id",
  verifyToken,
  requireEmailVerification,
  LotRepresentativeController.getLotRepresentativeById
);

// POST create new lot representative
router.post(
  "/",
  verifyToken,
  requireEmailVerification,
  LotRepresentativeController.insertLotRepresentative
);

// PUT update lot representative by ID (with ownership verification)
router.put(
  "/:id",
  verifyToken,
  requireEmailVerification,
  LotRepresentativeController.updateLotRepresentative
);

// DELETE lot representative by ID (with ownership verification)
router.delete(
  "/:id",
  verifyToken,
  requireEmailVerification,
  LotRepresentativeController.deleteLotRepresentative
);

// Helper routes - reference data (no authentication required)
// GET all provinces
router.get("/helper/provinces", LotRepresentativeController.getAllProvinces);

// GET all barangays
router.get("/helper/barangays", LotRepresentativeController.getAllBarangays);

export default router;
