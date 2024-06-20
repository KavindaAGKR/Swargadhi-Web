import mongoose from "mongoose";

const multilingualSchema = new mongoose.Schema(
  {
    en: { type: String, required: true },
    si: { type: String, required: true }
  },
  { _id: false }
);




const orderSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AyurvedicProduct",
      },
      itemName: multilingualSchema,
      price: Number,
      buyingCount: Number
    },
  ],
  paymentMethod: {
    type: String,
    enum: ['cashOnDelivery', 'cardPayment'],
    required: true
},
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
    required:true
  },
  deliveryAddress: {
    addressL1: String,
    addressL2: String,
    addressL3: String
},
mobileNumber: {
    type: String,
    required: true
},
totalAmount: {
    type: Number,
    required: true
},
createdAt: {
    type: Date,
    default: Date.now
}
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
