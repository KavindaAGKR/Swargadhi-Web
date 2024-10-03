import mongoose from 'mongoose';


const multilingualSchema = new mongoose.Schema(
  {
    en: { type: String, required: true },
    si: { type: String, required: true }
  },
  { _id: false }
);

const adminOptionSchema = new mongoose.Schema(
  {
    discount: {
      type: Number,
    },
    deliveryCharges: {
      type: Number,
    },
    email: {
      type: String,
    },
    telephoneNumber1: {
      type: Number,
    },
    telephoneNumber2: {
      type: Number,
    },
    address: {
      type: multilingualSchema,
    },
  },
  {
    timestamps: true,
  }
);

const AdminOption = mongoose.model('AdminOption', adminOptionSchema);

export default AdminOption;
