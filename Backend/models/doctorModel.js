import mongoose from "mongoose";

const multilingualSchema = new mongoose.Schema(
  {
    en: { type: String, required: true },
    si: { type: String, required: true }
  },
  { _id: false }
);

const ayurvedicDoctorSchema = new mongoose.Schema(
  {
    doctorID: {
      type: String,
     
    },
    name: {
      type: multilingualSchema,
     
    },
    description: {
      type: multilingualSchema,
     
    },
    time: {
      type: Number,
    },
    images: [
      
      { type: String }
    
    ]
  },
  {
    timestamps: true,
  }
);

const AyurvedicDoctor = mongoose.model("AyurvedicDoctor", ayurvedicDoctorSchema);

export default AyurvedicDoctor;
