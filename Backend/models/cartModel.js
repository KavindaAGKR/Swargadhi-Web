import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user:{
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    product:{
      type: mongoose.Schema.Types.ObjectId,
      require: true
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number, 
      required: true,
    },
    images:{
      type:[String]
    },
  
    },
  
  {
    timestamps: true,
  }
);


const Cart = mongoose.model("Cart", cartSchema);


export default Cart;
