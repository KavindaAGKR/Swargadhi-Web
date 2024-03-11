import express from "express";
import * as materialCtrl from  "../controller/materialCtrl.js"

const router = express.Router();

// Create Material
router.post("/", materialCtrl.createMaterial);

// Get all Materials
router.get("/", materialCtrl.getAllMaterials);

// Get Material by ID
router.get("/:id", materialCtrl.getMaterialById);

// Update Material
router.put("/:id", materialCtrl.updateMaterial);

// Delete Material
router.delete("/:id", materialCtrl.deleteMaterial);

export default router;
