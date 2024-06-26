// orderRoutes.js
import express from "express";
import * as orderController from "../controller/orderController.js";

const router = express.Router();

router.post("/create", orderController.createOrder);
router.get("/orders", orderController.getOrders);
router.put("/orders/:id/status", orderController.updateOrderStatus); 
router.get("/orders/user/:userId", orderController.getUserOrders);


export default router;
