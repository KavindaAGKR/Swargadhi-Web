import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

export const createOrder = async (req, res) => {
  try {
    const { cartItems, paymentMethod, user, addressL1, addressL2, addressL3, mobileNo, totalAmount } = req.body;

    if (!user || !user._id) {
        return res.status(400).json({ message: 'User information is missing or invalid.' });
    }

    const newOrder = new Order({
        products: cartItems.map(item => ({
            product: item.productId, 
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
  try {
    const orders = await Order.find()
      .populate('orderedby', 'firstName lastName')
      .populate('products.product'); // Ensure product population
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ message: 'Order ID and status are required.' });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    order.orderStatus = status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status', error });
  }
};




