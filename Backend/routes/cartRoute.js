import express from 'express';
import { userCart, removeProductFromCart, updateQuantityFromCart, emptyCart, verifyToken } from '../controller/cartController.js';

const router = express.Router();

router.post('/user-cart', verifyToken, userCart);
router.delete('/remove-product/:cartItemId', verifyToken, removeProductFromCart);
router.put('/update-quantity', verifyToken, updateQuantityFromCart);
router.delete('/empty-cart', verifyToken, emptyCart);

export default router;
