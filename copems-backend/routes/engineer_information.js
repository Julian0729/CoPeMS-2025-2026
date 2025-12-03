import express from "express";
import EngineerInformationController from "../controllers/EngineerInformationController.js";
const router = express.Router();

router.get("/", EngineerInformationController.getAllEngineerInformation);
router.get("/:id", EngineerInformationController.getEngineerInformationById);
router.post("/", EngineerInformationController.insertEngineerInformation);
router.put("/:id", EngineerInformationController.updateEngineerInformation);
router.delete("/:id", EngineerInformationController.deleteEngineerInformation);

export default router;
