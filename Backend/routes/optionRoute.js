import express from 'express';
import * as adminOptionController from '../controller/optionController.js';

const router = express.Router(); 

router.post("/add", adminOptionController.createAdminOption);
router.get("/", adminOptionController.getAllAdminOptions);
router.put("/:id", adminOptionController.editAdminOption);

export default router;
