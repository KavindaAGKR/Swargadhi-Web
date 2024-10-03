import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import nodemailer from 'nodemailer';
import moment from 'moment';



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
        orderedby: user._id,
        deliveryAddress: {
            addressL1,
            addressL2,
            addressL3
        },
        mobileNumber: mobileNo,
        totalAmount
    });

    const savedOrder = await newOrder.save();
    await sendAdminOrderNotification(savedOrder);
    await sendOrderConfirmation(user.email, { ...savedOrder._doc, user });
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
      .populate('products.product'); 
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

      console.log(`Received request to update order status: orderId=${orderId}, status=${status}`);
      
      if (!orderId || !status) {
          return res.status(400).json({ message: 'Order ID and status are required.' });
      }

      const order = await Order.findById(orderId).populate('orderedby', 'email');;

      if (!order) {
          return res.status(404).json({ message: 'Order not found.' });
      }

      const previousStatus = order.orderStatus;
      order.orderStatus = status;
      await order.save();

      const userEmail = order.orderedby.email;
      if (!userEmail) {
          return res.status(400).json({ message: 'User email is missing or invalid.' });
      }

      await sendOrderStatusChangeEmail(order.orderedby.email, order._id, previousStatus, status);
      res.status(200).json(order);
  } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ message: 'Error updating order status', error });
  }
};


export const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    const orders = await Order.find({ orderedby: userId })
      .populate('orderedby', 'firstName lastName email' )
      .populate('products.product');
    
    if (!orders.length) {
      return res.status(200).json({ message: 'No orders found for this user.' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Error fetching user orders', error });
  }
};


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL, 
      pass: process.env.PASSWORD 
  }
});


export const sendOrderConfirmation = async (userEmail, orderDetails) => {
  const orderedItems = orderDetails.products.map(item => 
    `Name: ${item.itemName.en} (${item.itemName.si}) - Quantity: ${item.buyingCount}, Price: ${item.price}`
  ).join('\n');
  const orderDate = moment(orderDetails.createdAt).format('MMMM Do YYYY, h:mm:ss a');
  const mailOptions = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: 'Order Confirmation',
text: `Dear ${orderDetails.user.firstName} ${orderDetails.user.lastName},\n\n
Thank you for purchasing ayurvedic Products from Swargadhi.\n\n
      Your order has been placed successfully. Here are the details:\n
      Order Time: ${orderDate}\n
	Order ID: ${orderDetails._id}\n
      Total Amount: ${orderDetails.totalAmount}\n
      Ordered Items:\n${orderedItems}\n
      \n\n
You will receive your products from Swargadhi Ayurvedic Platform soon, however if not received within 5 days then please contact Swargadhi at info.swargadhi@gmail.com\n

If you have any questions related to your purchased products please contact SWARGADHI directly and we will be happy to help you.\n

We provide the Best Health Care. Your well-being is our outmost priority.\n

Kind regards,\n

Swargadhi Health Care`

  };

  try {
      await transporter.sendMail(mailOptions);
      console.log('Order confirmation email sent.');
  } catch (error) {
      console.error('Error sending order confirmation email:', error);
  }
};

const sendAdminOrderNotification = async (orderDetails) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: 'info.swargadhi@gmail.com',
      subject: 'New has been placed',
text: `New order has been placed by an user. Check it from following link\n
      https://www.swargadhi.lk/admin`
    };

    await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent.');
  } catch (error) {
    console.error('Error sending admin notification email:', error);
  }
};

export const sendOrderStatusChangeEmail = async (userEmail, orderId, previousStatus, newStatus) => {
  try {
    if (!userEmail) {
      throw new Error('User email is missing or invalid.');
    }

    const mailOptions = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: 'Order Status Update',
      text: `Dear Customer,\n\nYour order (${orderId}) status has been updated:\n\nPrevious Status: ${previousStatus}\nNew Status: ${newStatus}\n\nThank you for shopping with us!\n\nBest regards,\nYour Company`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Order status change email sent:', info);

  } catch (error) {
    console.error('Error sending order status change email:', error);
    throw error; 
  }
};
