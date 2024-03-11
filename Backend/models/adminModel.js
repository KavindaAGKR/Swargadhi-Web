import mongoose from "mongoose";
// Declare the Schema of the Mongo model
const adminSchema = new mongoose.Schema({
    firstName:{
    type:String,
    required:true,   
     },
     lastName:{
    type:String,
    required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },

});
export const Admin = mongoose.model("admin", adminSchema);

//Export the model

