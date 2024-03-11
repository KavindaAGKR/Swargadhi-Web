import express from "express";
import * as userCtrl from "../controller/authController.js";
const router = express.Router();

//router.post("/register",userCtrl.createUser);
//router.post("/login",userCtrl.login);
//router.get('/:id',userCtrl.getUserById);
//router.put('/:id',userCtrl.editUser);
//router.delete('/:id',userCtrl.deleteUser);
router.post('/firebase-auth', userCtrl.authenticateWithFirebase);
router.post('/signup', userCtrl.signUpUserWithFirebase);
router.post('/login', userCtrl.loginUserWithFirebase);
//router.post('/signup', userCtrl.signUpWithFirebase);
router.post('/logout',userCtrl.revokeAccessToken)
export default router;  