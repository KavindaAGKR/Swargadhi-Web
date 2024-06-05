import express from "express";
import * as ayurvedicProductController from "../controller/ayurvedicProductController.js";
import verifyToken from "../middleWare/verifyToken.js";

const router = express.Router();

// Create Ayurvedic Product
router.post("/", ayurvedicProductController.createAyurvedicProduct);
//router.post("/new", ayurvedicProductController.createAyurvedicProduct2);

// Get all Ayurvedic Products for a specific user
//router.get("/all/:uid", ayurvedicProductController.getAllAyurvedicProducts);

router.get("/:id/si", ayurvedicProductController.getSinhalaPart);
router.get("/:id/en", ayurvedicProductController.getEnglishPart);
router.get("/all",ayurvedicProductController.getAllAyurvedicProducts);

// Get Ayurvedic Product by ID
router.get("/:id", ayurvedicProductController.getAyurvedicProductById);

// Get Ayurvedic Products by category
router.get("/category/:category", ayurvedicProductController.getAyurvedicProductsByCategory);
router.get("/category/si/:category", ayurvedicProductController.getSinhalaAyurvedicProductsByCategory);
router.get("/category/en/:category", ayurvedicProductController.getEnglishAyurvedicProductsByCategory);
router.get('/products/sinhala/all', ayurvedicProductController.getAllSinhalaProducts);
router.get('/products/english/all', ayurvedicProductController.getAllEnglishProducts);
// Update Ayurvedic Product
router.put("/:id", ayurvedicProductController.updateAyurvedicProduct);

// Delete Ayurvedic Product
router.delete("/:id", ayurvedicProductController.deleteAyurvedicProduct);
router.get('/search', ayurvedicProductController.searchAyurvedicProducts); 

// Get Ayurvedic Products for the authenticated user
//router.get('/user/items', verifyToken, ayurvedicProductController.getUserAyurvedicProducts);

export default router;
