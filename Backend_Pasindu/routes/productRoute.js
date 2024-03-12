import express from "express";
import * as ayurvedicProductController from "../controller/ayurvedicProductController.js";
import verifyToken from "../middleWare/verifyToken.js";

const router = express.Router();

// Create Ayurvedic Product
router.post("/", ayurvedicProductController.createAyurvedicProduct);

// Get all Ayurvedic Products for a specific user
router.get("/all/:uid", ayurvedicProductController.getAllAyurvedicProducts);

router.get("/:id/si", ayurvedicProductController.getSinhalaPart);
router.get("/:id/en", ayurvedicProductController.getEnglishPart);


// Get Ayurvedic Product by ID
router.get("/:id", ayurvedicProductController.getAyurvedicProductById);

// Get Ayurvedic Products by category
router.get("/category/:category", ayurvedicProductController.getAyurvedicProductsByCategory);

// Update Ayurvedic Product
router.put("/:id", ayurvedicProductController.updateAyurvedicProduct);

// Delete Ayurvedic Product
router.delete("/:id", ayurvedicProductController.deleteAyurvedicProduct);

// Get Ayurvedic Products for the authenticated user
//router.get('/user/items', verifyToken, ayurvedicProductController.getUserAyurvedicProducts);

export default router;
