import express from "express";
import * as ayurvedicProductController from "../controller/ayurvedicProductController.js";
import verifyToken from "../middleWare/verifyToken.js";

const router = express.Router();
router.post("/", ayurvedicProductController.createAyurvedicProduct);
router.get("/:id/si", ayurvedicProductController.getSinhalaPart);
router.get("/:id/en", ayurvedicProductController.getEnglishPart);
router.get("/all",ayurvedicProductController.getAllAyurvedicProducts);
router.get("/:id", ayurvedicProductController.getAyurvedicProductById);
router.get("/category/:category", ayurvedicProductController.getAyurvedicProductsByCategory);
router.get("/category/si/:category", ayurvedicProductController.getSinhalaAyurvedicProductsByCategory);
router.get("/category/en/:category", ayurvedicProductController.getEnglishAyurvedicProductsByCategory);
router.get('/products/sinhala/all', ayurvedicProductController.getAllSinhalaProducts);
router.get('/products/english/all', ayurvedicProductController.getAllEnglishProducts);
router.put("/:id", ayurvedicProductController.updateAyurvedicProduct);
router.delete("/:id", ayurvedicProductController.deleteAyurvedicProduct);
router.get('/search', ayurvedicProductController.searchAyurvedicProducts); 

export default router;
