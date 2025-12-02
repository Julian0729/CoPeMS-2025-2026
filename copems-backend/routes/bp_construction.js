import express from "express";
import {
  getAllBpConstructions,
  getBpConstructionById,
  insertBpConstruction,
  updateBpConstruction,
  deleteBpConstruction,
} from "../controllers/BPConstructionController.js";

const router = express.Router();

// GET all construction records
router.get("/", getAllBpConstructions);

// GET construction record by ID
router.get("/:id", getBpConstructionById);

// POST create new construction record
router.post("/", insertBpConstruction);

// PUT update construction record by ID
router.put("/:id", updateBpConstruction);

// DELETE construction record by ID
router.delete("/:id", deleteBpConstruction);

export default router;
