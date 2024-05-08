import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      count: Number,
    },
  ],
  paymentIntent: {},
  orderStatus: {
    type: String,
    default: "Not Processed",
    enum: [
      "Not Processed",
      "Paid",
      "Processing",
      "Dispatched",
      "Cancelled",
      "Delivered",
    ],
  },
  orderedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  deliveryAddress: String,
  mobileNumber: String,
},
{
  timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
