import express from "express";
import * as materialCtrl from  "../controller/materialCtrl.js"

const router = express.Router();
router.post("/supplymaterial", materialCtrl.createMaterial);
router.get("/allmaterials", materialCtrl.getAllMaterials);
router.get("/:id", materialCtrl.getMaterialById);
router.put("/:id", materialCtrl.updateMaterial);
router.delete("/:id", materialCtrl.deleteMaterial);

export default router;
