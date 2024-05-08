import Cart from "../models/cartModel.js";

// Add item to cart
export const userCart = async (req, res) => {
  const { productId, quantity, price } = req.body;
  const { _id } = req.user;

  try {
    const newCartItem = await Cart.create({
      user: _id,
      product: productId,
      name: "Product Name", // Adjust accordingly
      price,
      quantity,
    });
    res.json(newCartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
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
