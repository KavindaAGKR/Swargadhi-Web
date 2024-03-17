import mongoose from "mongoose";
// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    uid:{
        type:String,
        required:true
    },
    // firstName:{
    //     type:String,
    //    // required:true,
        
        
    // },
    // lastName:{
    //     type:String,
    //   //  required:true,
    // },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    // mobile:{
    //     type:String,
    //     ///required:true,
    //    // unique:true,
    
    // },
    password:{
        type:String,
        ///required:true,
        //unique:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});
export const User = mongoose.model("User", userSchema);

//Export the model

