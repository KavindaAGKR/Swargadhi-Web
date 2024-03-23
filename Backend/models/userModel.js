import mongoose from "mongoose";
// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
   
    name:{
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
        //unique:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});
export const User = mongoose.model("User", userSchema);



