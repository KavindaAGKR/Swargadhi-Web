import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const materialSchema = new mongoose.Schema({
    givenBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    materialName: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description:{
        type : String
    },
    images: [
      
        { type: String }
      
      ]
    },
    {
      timestamps: true,
    }
   
);

const Material = mongoose.model("Material", materialSchema);

export default Material
