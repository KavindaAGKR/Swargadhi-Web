import mongoose from "mongoose";

const multilingualSchema = new mongoose.Schema(
  {
    en: { type: String, required: true },
    si: { type: String, required: true }
  },
  { _id: false }
);

const ayurvedicProductSchema = new mongoose.Schema(
  {
    productItemID: {
      type: String,
     
    },
    itemName: {
      type: multilingualSchema,
     
    },
    price: {
      type: Number,
     
    },
    description: {
      type: multilingualSchema,
     
    },
    quantity: {
      type: Number,
    },
    category: {
      type:multilingualSchema,
    },
    images: [
      
      { type: String }
    
    ]
  },
  {
    timestamps: true,
  }
);

const AyurvedicProduct = mongoose.model("AyurvedicProduct", ayurvedicProductSchema);

export default AyurvedicProduct;
