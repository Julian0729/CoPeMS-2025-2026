import express from "express";
import OccupancyTypeController from "../controllers/OccupancyTypeController.js";

const router = express.Router();

// GET all occupancy types
router.get("/", OccupancyTypeController.getAllOccupancyTypes);

// GET occupancy type by ID
router.get("/:id", OccupancyTypeController.getOccupancyTypeById);

// POST create new occupancy type
router.post("/", OccupancyTypeController.insertOccupancyType);

// PUT update occupancy type by ID
router.put("/:id", OccupancyTypeController.updateOccupancyType);

// DELETE occupancy type by ID
router.delete("/:id", OccupancyTypeController.deleteOccupancyType);

export default router;
