// authRoute.js
import express from "express";
import * as userCtrl from "../controller/userCtrl.js";
import verifyToken from "../middleWare/verifyToken.js";

const router = express.Router();

router.post("/register", userCtrl.createUser);
router.post("/login", userCtrl.login);
router.get('/:id', userCtrl.getUserById);
router.put('/:id', userCtrl.editUser);
router.delete('/:id', userCtrl.deleteUser);
router.post('/forgot', userCtrl.forgotPassword);
router.post('/reset/:id/:token', userCtrl.resetPassword);

export { router as default };
