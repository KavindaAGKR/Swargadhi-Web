import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    const { cartItems, paymentMethod, user, addressL1, addressL2, addressL3, mobileNo, totalAmount } = req.body;

    if (!user || !user._id) {
        return res.status(400).json({ message: 'User information is missing or invalid.' });
    }

    const newOrder = new Order({
        products: cartItems.map(item => ({
            itemName: item.itemName,
            price: item.price,
            buyingCount: item.buyingCount
        })),
        paymentMethod,
        orderedby: user._id, // Ensure correct property name
        deliveryAddress: {
            addressL1,
            addressL2,
            addressL3
        },
        mobileNumber: mobileNo,
        totalAmount
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
} catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error });
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
