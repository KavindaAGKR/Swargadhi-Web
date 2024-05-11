import Cart  from "../models/cartModel.js";
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your own secret key from environment variables
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
export const userCart = async (req, res) => {
  const { userID, cartData } = req.body;

  try {
    const cart = new Cart({
      userID: userID,
      cartItems: cartData
    });

    await cart.save();
    res.status(201).json({ message: 'Cart data saved successfully' });
  } catch (error) {
    console.error('Error saving cart data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Remove item from cart
export const removeProductFromCart = async (req, res) => {
  const { _id } = req.user;
  const { cartItemId } = req.params;

  try {
    const deleteProductFromCart = await Cart.deleteOne({
      user: _id,
      _id: cartItemId,
    });
    res.json(deleteProductFromCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update quantity in cart
export const updateQuantityFromCart = async (req, res) => {
  const { _id } = req.user;
  const { cartItemId, newQuantity } = req.body;

  try {
    const cartItem = await Cart.findOneAndUpdate(
      { user: _id, _id: cartItemId },
      { quantity: newQuantity },
      { new: true }
    );
    res.json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Empty cart
export const emptyCart = async (req, res) => {
  const { _id } = req.user;

  try {
    const deleteResult = await Cart.deleteMany({ user: _id });
    res.json(deleteResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
