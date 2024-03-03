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
      // required: true,
      // unique: true,
    },
    itemName: {
      type: multilingualSchema,
      // required: true,
    },
    price: {
      type: Number,
      // required: true,
    },
    description: {
      type: multilingualSchema,
      // required: true,
    },
    quantity: {
      type: Number,
      // required: true,
    },
    productDetails: {
      type: multilingualSchema,
      // required: true,
    },
    category: {
      type:multilingualSchema,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AyurvedicProduct = mongoose.model("AyurvedicProduct", ayurvedicProductSchema);

export default AyurvedicProduct;
