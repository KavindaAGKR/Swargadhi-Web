import express from "express";
import * as cartController from "../controller/cartController.js";

const router = express.Router();

router.post("/user-cart", cartController.userCart);
router.delete("/remove-product/:cartItemId", cartController.removeProductFromCart);
router.put("/update-quantity", cartController.updateQuantityFromCart);
router.delete("/empty-cart", cartController.emptyCart);

export default router;
