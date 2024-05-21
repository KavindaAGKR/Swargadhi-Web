import express from "express";
import * as treatmentController from "../controller/treatmentController.js";

const router = express.Router();

router.post("/add", treatmentController.createAyurvedicTreatment);
router.get("/", treatmentController.getAllAyurvedicTreatments);
router.get('/treatments', treatmentController.getAllEnglishTreatment);
router.get('/treatmentsSi', treatmentController.getAllSinhalaTreatment);
router.get('/:id', treatmentController.getAyurvedicTreatmentById);
router.delete('/:id', treatmentController.deleteAyurvedicTreatment);
router.get("/si/:id", treatmentController.getSinhalaPart);
router.get("/en/:id", treatmentController.getEnglishPart);
router.put("/:id", treatmentController.updateAyurvedicTreatment);

export default router;
