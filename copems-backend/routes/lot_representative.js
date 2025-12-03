import express from "express";
import LotRepresentativeController from "../controllers/LotRepresentativeController.js";

const router = express.Router();

// GET all lot representatives
router.get("/", LotRepresentativeController.getAllLotRepresentatives);

// GET lot representative by ID
router.get("/:id", LotRepresentativeController.getLotRepresentativeById);

// POST create new lot representative
router.post("/", LotRepresentativeController.insertLotRepresentative);

// PUT update lot representative by ID
router.put("/:id", LotRepresentativeController.updateLotRepresentative);

// DELETE lot representative by ID
router.delete("/:id", LotRepresentativeController.deleteLotRepresentative);

// Helper routes
// GET all provinces
router.get("/helper/provinces", LotRepresentativeController.getAllProvinces);

// GET all barangays
router.get("/helper/barangays", LotRepresentativeController.getAllBarangays);

export default router;
