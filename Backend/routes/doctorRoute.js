import express from "express";
import * as doctorController from "../controller/doctorController.js";
import verifyToken from "../middleWare/verifyToken.js";

const router = express.Router(); // Initialize the router

router.post("/add", doctorController.createAyurvedicDoctor);
router.get("/", doctorController.getAllAyurvedicDoctor);
router.get('/:id', doctorController.getAyurvedicDoctorById);
router.delete('/:id', doctorController.deleteAyurvedicDoctor);
router.get("/si/:category", doctorController.getEnglishPart);
router.get("/en/:category", doctorController.getSinhalaPart);

// Continue with the rest of your code...

export default router; // Export the router
