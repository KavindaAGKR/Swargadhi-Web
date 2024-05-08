// orderController.js
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import {User} from "../models/userModel.js";
import Product from "../models/productModel.js";

export const createOrder = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id);
    let userCart = await Cart.findOne({ orderedby: user._id });
    let finalAmount = userCart.cartTotal;
    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "Home Delivery",
        amount: finalAmount,
        status: "Processing",
        created: Date.now(),
        currency: "Rupees",
      },
      orderedby: user._id,
    }).save();
    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});
    res.json({ message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOrders = async (req, res) => {
  const { _id } = req.user;
  try {
    const userOrders = await Order.find({ orderedby: _id })
      .populate("products.product")
      .exec();
    res.json(userOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
