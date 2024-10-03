import mongoose from "mongoose";
const userSchema = new mongoose.Schema({

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
    profilePicture: { 
        type: String
    } ,
    mobileNumber:{
        type:String
    },
    deliveryAddress: {
        addressL1: String,
        addressL2: String,
        addressL3: String
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    otp: String,
    otpExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date
});


export const User = mongoose.model("User", userSchema);



