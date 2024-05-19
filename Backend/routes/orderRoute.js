// orderRoutes.js
import express from "express";
import * as orderController from "../controller/orderController.js";

const router = express.Router();

router.post("/create", orderController.createOrder);
router.get("/orders", orderController.getOrders);
router.put("/update-order/:id", orderController.updateOrderStatus);

export default router;
