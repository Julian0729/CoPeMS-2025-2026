import express from "express";
import BuildingOwnerController from "../controllers/BuildingOwnerController.js";

const router = express.Router();

// GET all building owners
router.get("/", BuildingOwnerController.getAllBldgOwners);

// GET building owner by ID
router.get("/:id", BuildingOwnerController.getBldgOwnerById);

// POST create new building owner
router.post("/", BuildingOwnerController.insertBldgOwner);

// PUT update building owner by ID
router.put("/:id", BuildingOwnerController.updateBldgOwner);

// DELETE building owner by ID
router.delete("/:id", BuildingOwnerController.deleteBldgOwner);

export default router;
