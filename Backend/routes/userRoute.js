import express from "express";
import * as userController from "../controller/userController.js";

const router = express.Router();

router.post("/register", userController.createUser);
router.post("/login", userController.userLogin);
router.get('/users', userController.getAllUsers);
router.delete('/users/:id', userController.deleteUser);
router.post('/picture', userController.uploadProfilePictures);

export default router;
