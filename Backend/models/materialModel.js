import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const materialSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true,
    },
    MaterialName: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    userContactNumber: {
        type: String,
        required: true,
    },
   
});

const Material = mongoose.model("Material", materialSchema);

export default Material
