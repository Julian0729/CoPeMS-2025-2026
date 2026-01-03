import express from "express";
import {
  getAllBpConstructions,
  getBpConstructionById,
  insertBpConstruction,
  updateBpConstruction,
  deleteBpConstruction,
} from "../controllers/BPConstructionController.js";
import { verifyToken, requireEmailVerification } from "../middleware/auth.js";

const router = express.Router();

// ========== PROTECTED ROUTES (Authentication required) ==========
// All routes require valid JWT token and verified email

// GET all construction records for logged-in user
router.get("/", verifyToken, requireEmailVerification, getAllBpConstructions);

// GET construction record by ID (with ownership verification)
router.get(
  "/:id",
  verifyToken,
  requireEmailVerification,
  getBpConstructionById
);

// POST create new construction record
router.post("/", verifyToken, requireEmailVerification, insertBpConstruction);

// PUT update construction record by ID (with ownership verification)
router.put("/:id", verifyToken, requireEmailVerification, updateBpConstruction);

// DELETE construction record by ID (with ownership verification)
router.delete(
  "/:id",
  verifyToken,
  requireEmailVerification,
  deleteBpConstruction
);

export default router;
