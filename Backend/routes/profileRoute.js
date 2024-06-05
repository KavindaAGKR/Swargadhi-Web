import express from "express";
import * as profileController from "../controller/profileController.js";

const router = express.Router();

router.post('/profile', profileController.createOrUpdateProfile);


export default router;
