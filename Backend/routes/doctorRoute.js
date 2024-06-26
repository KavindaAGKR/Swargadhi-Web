import express from "express";
import * as doctorController from "../controller/doctorController.js";
import verifyToken from "../middleWare/verifyToken.js";

const router = express.Router(); 
router.post("/add", doctorController.createAyurvedicDoctor);
router.get("/", doctorController.getAllAyurvedicDoctor);
router.get('/:id', doctorController.getAyurvedicDoctorById);
router.delete('/:id', doctorController.deleteAyurvedicDoctor);
router.get("/si/:category", doctorController.getEnglishPart);
router.get("/en/:category", doctorController.getSinhalaPart);
router.put("/:id", doctorController.editDoctor);
export default router; 
