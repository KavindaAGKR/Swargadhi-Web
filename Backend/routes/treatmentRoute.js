// treatmentRoutes.js

import express from "express";
import * as treatmentController from "../controller/treatmentController.js";

const router = express.Router(); // Initialize the router

router.post("/add", treatmentController.createAyurvedicTreatment);
router.get("/", treatmentController.getAllAyurvedicTreatments);
router.get('/:id', treatmentController.getAyurvedicTreatmentById);
router.delete('/:id', treatmentController.deleteAyurvedicTreatment);
router.get("/si/:id", treatmentController.getSinhalaPart);
router.get("/en/:id", treatmentController.getEnglishPart);

export default router; // Export the router
