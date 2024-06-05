import mongoose from "mongoose";
// Declare the Schema of the Mongo model
const profileSchema = new mongoose.Schema({
    images: [
      
        { type: String }
      
      ],
    deliveryAddress: {
        addressL1: String,
        addressL2: String,
        addressL3: String
    },
    mobileNumber: {
        type: String,
        //required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    }

});
const Profile = mongoose.model("profile", profileSchema);
export default Profile;

