import mongoose from "mongoose";

const multilingualSchema = new mongoose.Schema(
  {
    en: { type: String, required: true },
    si: { type: String, required: true }
  },
  { _id: false }
);

const ayurvedicTreatmentSchema = new mongoose.Schema(
  {
    treatmentName: {
      type: multilingualSchema,
     
    },
    price: {
      type: Number,
     
    },
    description: {
      type: multilingualSchema,
     
    },
    images: [
      
      { type: String }
    
    ]
  },
  {
    timestamps: true,
  }
);

const AyurvedicTreatment = mongoose.model("AyurvedicTreatment", ayurvedicTreatmentSchema);

export default AyurvedicTreatment;
