import express from "express";
import CharacterOfOccupancyController from "../controllers/CharacterOfOccupancyController.js";

const router = express.Router();

// Base path: /api/occupancy/ (assuming your application uses this base)

// GET all Occupancy Groups (e.g., A, B, C, J-1)
// Route: /api/occupancy/groups
router.get("/groups", CharacterOfOccupancyController.getAllOccupancyGroups);

// GET a specific Occupancy Group by ID
// Route: /api/occupancy/groups/:groupId
router.get(
  "/groups/:groupId",
  CharacterOfOccupancyController.getOccupancyGroupById
);

// GET all Categories for a specific Group ID
// Route: /api/occupancy/groups/:groupId/categories
router.get(
  "/groups/:groupId/categories",
  CharacterOfOccupancyController.getCategoriesByGroupId
);

// GET the full hierarchical structure (All Groups and their Categories)
// Route: /api/occupancy/structure
router.get(
  "/structure",
  CharacterOfOccupancyController.getFullOccupancyStructure
);

// POST: Save user's selection (group and category)
// Route: /api/occupancy/selection
router.post("/selection", CharacterOfOccupancyController.saveUserSelection);

export default router;
