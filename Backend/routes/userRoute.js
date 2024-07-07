import express from "express";
import * as userController from "../controller/userController.js";

const router = express.Router();

router.post("/register", userController.createUser);
router.post("/login", userController.userLogin);
router.post("/verify-otp", userController.verifyOtp);
router.get('/users', userController.getAllUsers);
router.delete('/users/:id', userController.deleteUser);
router.post('/picture', userController.uploadProfilePicture);
router.get('/profile/:id', userController.getUserProfile);
router.put('/update', userController.updateUser);
router.delete('/profile/picture/:userId', userController.deleteProfilePicture);
router.post('/forgotpassword', userController.forgotPassword);
router.post('/resetpassword', userController.resetPassword);

export default router;
