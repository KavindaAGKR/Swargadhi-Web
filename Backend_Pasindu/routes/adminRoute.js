import express from "express";
import * as adminController from "../controller/adminController.js";
const router = express.Router();

router.post("/register", adminController.createAdmin);
router.post("/login", adminController.adminLogin);
router.get('/:id', adminController.getAdminById);
router.put('/:id', adminController.editAdmin);
router.delete('/:id', adminController.deleteAdmin);
router.post('/logout', adminController.logout);

export default router;
