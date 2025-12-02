import express from "express";
import ProjectDetailsController from "../controllers/ProjectDetailsController.js";

const router = express.Router();

// GET all project details
router.get("/", ProjectDetailsController.getAllProjectDetails);

// GET project details by ID
router.get("/:id", ProjectDetailsController.getProjectDetailsById);

// POST create new project details
router.post("/", ProjectDetailsController.insertProjectDetails);

// PUT update project details by ID
router.put("/:id", ProjectDetailsController.updateProjectDetails);

// DELETE project details by ID
router.delete("/:id", ProjectDetailsController.deleteProjectDetails);

export default router;
